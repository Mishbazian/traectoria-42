import { makeAutoObservable, runInAction } from 'mobx';
import { fetchBoards } from '@api';
import type { Board, Card, Column } from './types';
import { setLocalStorage } from '@lib';
import { nanoid } from 'nanoid';
import { MOCK_API_BOARD_STORAGE_KEY } from '@shared';

export class BoardStore {
	boards: Board[] = [];
	columns: Column[] = [];
	cards: Card[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	// === Загрузка данных начальная ===
	async fetchBoardsData(boardIds?: string[]) {
		runInAction(() => {
			this.isLoading = true;
		});
		const data = await fetchBoards(boardIds);
		runInAction(() => {
			this.boards = data.boards;
			this.columns = data.columns;
			this.cards = data.cards;
			this.isLoading = false;
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
		// важен именно порядок колонок в board
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

	private async setStateToLS() {
		setLocalStorage(MOCK_API_BOARD_STORAGE_KEY, {
			boards: this.boards,
			columns: this.columns,
			cards: this.cards,
		});
	}

	async moveItem(props: {
		type: string;
		id: string;
		toIndex: number;
		fromGroup: string;
		toGroup?: string;
	}) {
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
		await this.setStateToLS();
		return true;
	}

	async updateBoard(boardId: string, updates: Partial<Board>) {
		runInAction(() => {
			const board = this.boardsMap[boardId];
			if (!board) return;

			Object.assign(board, updates);
		});
		await this.setStateToLS();
		return true;
	}
	async updateColumn(columnId: string, updates: Partial<Column>) {
		runInAction(() => {
			const column = this.columnsMap[columnId];
			if (!column) return;
			Object.assign(column, updates);
		});
		await this.setStateToLS();
		return true;
	}

	async addColumn(boardId: string) {
		runInAction(() => {
			const id = nanoid();
			const title = 'Новая колонка';
			const cards = [] as string[];

			this.boardsMap[boardId].columns.push(id);
			this.columns.push({
				id,
				title,
				cards,
				boardId,
			});
		});
		this.setStateToLS();
	}
	async deleteColumn(id: string) {
		runInAction(() => {
			const column = this.columnsMap[id];
			const colIndex = this.columns.findIndex((c) => c.id === id);

			if (colIndex < 0 || this.columnsMap[id].cards.length) return;
			//2 Удалить колонку из глобального массива columns
			this.columns.splice(colIndex, 1);
			// 1. Удалить ID колонки из массива columns доски
			const boardIndex = this.boards.findIndex((b) => b.id === column.boardId);
			if (boardIndex !== -1) {
				const board = this.boards[boardIndex];
				board.columns = board.columns.filter((colId) => colId !== id);
			}
		});

		// 3. Сохранить в localStorage
		await this.setStateToLS();
	}
}

export const boardStore = new BoardStore();
