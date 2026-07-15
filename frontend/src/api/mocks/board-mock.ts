import { getFromLocalStorage, setLocalStorage } from '@/lib/helpers';
import MOCK_BOARDS from '../fixtures/boards.json';
import type { BoardsDTO, CardsDTO, ColumnsDTO } from '../types';

export const API_STORAGE_KEY = 'boards_api';
type StorageData = {
	boards: BoardsDTO;
	columns: ColumnsDTO;
	cards: CardsDTO;
};
// Имитация задержки сети
export async function fetchBoardMock(ids?: string[]): Promise<StorageData> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	let data = getFromLocalStorage<StorageData>(API_STORAGE_KEY);
	if (!data) {
		data = {
			boards: MOCK_BOARDS.boards.map((b) => ({
				...b,
				columns: b.columns?.map((c) => c.id),
			})),
			columns: MOCK_BOARDS.boards.flatMap((b) =>
				b.columns.map((c) => ({
					...c,
					cards: c.cards.map((card) => card.id),
				}))
			),
			cards: MOCK_BOARDS.boards.flatMap((b) =>
				b.columns.flatMap((col) => col.cards)
			),
		};
		setLocalStorage(API_STORAGE_KEY, data);
	}
	if (ids) {
		const boards = data.boards.filter((b) => ids.includes(b.id));
		const columns = data.columns.filter((c) => ids.includes(c.boardId));

		const cardIdsInColumns = new Set(columns.flatMap((col) => col.cards));
		const cards = data.cards.filter((card) => cardIdsInColumns.has(card.id));
		return { boards, columns, cards };
	}
	return data;
}

export async function updateKanbanItemPos({
	type,
	id,
	toIndex,
	fromGroup,
	toGroup,
}: {
	type: string;
	id: string;
	toIndex: number;
	fromGroup?: string;
	toGroup?: string;
}) {
	const data = getFromLocalStorage<StorageData>(API_STORAGE_KEY);
	let result = null;
	if (!data) return null;

	// --- Обработка доски ---
	if (type === 'board') {
		const oldIndex = data.boards.findIndex((b) => b.id === id);
		if (oldIndex === -1) return null; // Доска не найдена — выходим
		const [moved] = data.boards.splice(oldIndex, 1);
		data.boards.splice(toIndex, 0, moved);
		result = { boards: data.boards };
	}

	// --- Обработка колонки ---
	if (type === 'column') {
		const column = data.columns.find((c) => c.id === id);
		if (!column || !column.boardId) return null; // Колонка не найдена или не привязана к доске

		const board = data.boards.find((b) => b.id === column.boardId);
		if (!board || !Array.isArray(board.columns)) return null; // Доска не найдена или нет колонок

		const oldIndex = board.columns.findIndex((colId) => colId === id);
		if (oldIndex === -1) return null; // ID колонки не найден в списке доски

		const [moved] = board.columns.splice(oldIndex, 1);
		board.columns.splice(toIndex, 0, moved);
		result = { boards: data.boards };
	}

	// --- Обработка карточки ---
	if (type === 'card') {
		if (!fromGroup) return null; // Обязательно нужен fromGroup

		const fromColumn = data.columns.find((c) => c.id === fromGroup);
		if (!fromColumn) return null; // Из какую колонку перемещать? — не найдена

		const toColumnId = fromGroup === toGroup ? fromGroup : toGroup!;
		const toColumn = data.columns.find((c) => c.id === toColumnId);
		if (!toColumn) return null; // Куда перемещать? — не найдена

		// Ищем карточку в исходной колонке
		const oldIndex = fromColumn.cards?.findIndex((cardId) => cardId === id);
		if (oldIndex === undefined || oldIndex === -1) {
			return null; // Карточка не найдена в исходной колонке
		}

		// Удаляем из старой позиции и вставляем в новую
		const [moved] = fromColumn.cards.splice(oldIndex, 1);
		toColumn.cards.splice(toIndex, 0, moved);

		const columns =
			fromGroup === toGroup ? [fromColumn] : [fromColumn, toColumn];

		result = { columns };
	}
	setLocalStorage(API_STORAGE_KEY, data);
	await new Promise((resolve) => setTimeout(resolve, 300));

	return true;
}
