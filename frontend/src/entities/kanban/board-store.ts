import { makeAutoObservable, runInAction } from 'mobx';
import { fetchBoards } from '@api';
import type { Board, Card, Column } from './types';
import { setLocalStorage } from '@lib';
import { nanoid } from 'nanoid';
import { MOCK_API_BOARD_STORAGE_KEY } from '@lib';

export class BoardStore {
	boards: Board[] = [];
	columns: Column[] = [];
	cards: Card[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	async fetchBoardsData(boardIds?: string[]) {
		runInAction(() => {
			this.isLoading = true;
		});
		const data = await fetchBoards(boardIds);
		runInAction(() => {
			this.boards = data.boards as Board[];
			this.columns = data.columns as Column[];
			this.cards = data.cards as Card[];
			this.isLoading = false;
		});
	}

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

	async setStateToLS() {
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
			if (props.type === 'board') {
				const oldIndex = this.boards.findIndex((b) => b.id === props.id);
				if (oldIndex === -1) return;
				const [moved] = this.boards.splice(oldIndex, 1);
				this.boards.splice(props.toIndex, 0, moved);
			}
			if (props.type === 'column') {
				const column = this.columns.find((c) => c.id === props.id);
				if (!column || !column.boardId) return;
				const board = this.boards.find((b) => b.id === column.boardId);
				if (!board) return;
				const oldIndex = board.columns.findIndex((colId) => colId === props.id);
				if (oldIndex === -1) return;
				const [moved] = board.columns.splice(oldIndex, 1);
				board.columns.splice(props.toIndex, 0, moved);
			}
			if (props.type === 'card') {
				if (!props.fromGroup) return;
				const fromColumn = this.columns.find((c) => c.id === props.fromGroup);
				if (!fromColumn) return;
				const toColumnId = props.toGroup || props.fromGroup;
				const toColumn = this.columns.find((c) => c.id === toColumnId);
				if (!toColumn) return;
				const oldIndex = fromColumn.cards.findIndex(
					(cardId) => cardId === props.id
				);
				if (oldIndex === -1) return;
				const [moved] = fromColumn.cards.splice(oldIndex, 1);
				toColumn.cards.splice(props.toIndex, 0, moved);
			}
		});
		const result = true;
		await this.setStateToLS();
		return result;
	}

	async updateBoard(boardId: string, updates: Partial<Board>) {
		runInAction(() => {
			const board = this.boardsMap[boardId];
			if (!board) return;
			Object.assign(board, updates);
		});
		await this.setStateToLS();
	}

	async updateColumn(columnId: string, updates: Partial<Column>) {
		runInAction(() => {
			const column = this.columnsMap[columnId];
			if (!column) return;
			Object.assign(column, updates);
		});
		await this.setStateToLS();
	}

	async addColumn(boardId: string) {
		runInAction(() => {
			const id = nanoid();
			const title = 'Новая колонка';
			this.boardsMap[boardId].columns.push(id);
			this.columns.push({
				id,
				title,
				cards: [],
				boardId,
			});
		});
	}

	async deleteColumn(id: string) {
		runInAction(() => {
			const column = this.columnsMap[id];
			const colIndex = this.columns.findIndex((c) => c.id === id);
			if (colIndex < 0 || column.cards.length) return;
			this.columns.splice(colIndex, 1);
			const boardIndex = this.boards.findIndex((b) => b.id === column.boardId);
			if (boardIndex !== -1) {
				const board = this.boards[boardIndex];
				board.columns = board.columns.filter((colId) => colId !== id);
			}
		});
		await this.setStateToLS();
	}
}

export const boardStore = new BoardStore();
