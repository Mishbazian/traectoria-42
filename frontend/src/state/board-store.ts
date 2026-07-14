import { makeAutoObservable, runInAction } from 'mobx';
import { fetchBoards } from '@/api';
import type { Board, Card, Column } from '@/state/types';
import { updateKanbanItemPos } from '@/api/mocks/board-mock';

export class BoardStore {
	boards: Board[] = [];
	columns: Column[] = [];
	cards: Card[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	// === Загрузка данных начальная ===
	async fetchBoardsData(boardIds?: string[]) {
		const data = await fetchBoards(boardIds);
		runInAction(() => {
			this.boards = data.boards;
			this.columns = data.columns;
			this.cards = data.cards;
		});
	}

	// === Геттеры (computed) ===
	get boardsMap() {
		return this.boards.reduce(
			(acc, board) => ((acc[board.id] = board), acc),
			{} as Record<string, Board>
		);
	}

	get columnsMap() {
		return this.columns.reduce(
			(acc, col) => ((acc[col.id] = col), acc),
			{} as Record<string, Column>
		);
	}

	get cardsMap() {
		return this.cards.reduce(
			(acc, card) => ((acc[card.id] = card), acc),
			{} as Record<string, Card>
		);
	}

	get columnsByBoard() {
		return this.boards.reduce(
			(acc, board) => {
				acc[board.id] = [...board.columns];
				return acc;
			},
			{} as Record<string, Column['id'][]>
		);
	}

	get cardsByColumns() {
		return this.columns.reduce(
			(acc, column) => {
				acc[column.id] = [...column.cards];
				return acc;
			},
			{} as Record<string, Card['id'][]>
		);
	}

	async moveItem(props: {
		type: string;
		id: string;
		toIndex: number;
		fromGroup?: string;
		toGroup?: string;
	}) {
		const success = await updateKanbanItemPos({ ...props });
		if (!success) return;
		runInAction(() => {
			// --- Обработка доски ---
			if (props.type === 'board') {
				const oldIndex = this.boards.findIndex((b) => b.id === props.id);
				if (oldIndex === -1) return null; // Доска не найдена — выходим
				const [moved] = this.boards.splice(oldIndex, 1);
				this.boards.splice(props.toIndex, 0, moved);
			}

			// --- Обработка колонки ---
			if (props.type === 'column') {
				const column = this.columns.find((c) => c.id === props.id);
				if (!column || !column.boardId) return null; // Колонка не найдена или не привязана к доске

				const board = this.boards.find((b) => b.id === column.boardId);
				if (!board || !Array.isArray(board.columns)) return null; // Доска не найдена или нет колонок

				const oldIndex = board.columns.findIndex((colId) => colId === props.id);
				if (oldIndex === -1) return null; // ID колонки не найден в списке доски

				const [moved] = board.columns.splice(oldIndex, 1);
				board.columns.splice(props.toIndex, 0, moved);
			}

			// --- Обработка карточки ---
			if (props.type === 'card') {
				if (!props.fromGroup) return null; // Обязательно нужен fromGroup

				const fromColumn = this.columns.find((c) => c.id === props.fromGroup);
				if (!fromColumn) return null; // Из какую колонку перемещать? — не найдена

				const toColumnId =
					props.fromGroup === props.toGroup ? props.fromGroup : props.toGroup!;
				const toColumn = this.columns.find((c) => c.id === toColumnId);
				if (!toColumn) return null; // Куда перемещать? — не найдена

				// Ищем карточку в исходной колонке
				const oldIndex = fromColumn.cards?.findIndex(
					(cardId) => cardId === props.id
				);
				if (oldIndex === undefined || oldIndex === -1) {
					return null; // Карточка не найдена в исходной колонке
				}

				// Удаляем из старой позиции и вставляем в новую
				const [moved] = fromColumn.cards.splice(oldIndex, 1);
				toColumn.cards.splice(props.toIndex, 0, moved);
			}
		});
		return true;
	}
}

export const boardStore = new BoardStore();
