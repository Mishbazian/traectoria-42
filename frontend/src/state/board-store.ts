import { makeAutoObservable, runInAction } from 'mobx';
import { fetchBoards } from '@/api';
import type { Board, Card, Column } from '@/state/types';

export class BoardStore {
	boards: Board[] = [];
	columns: Record<string, Column> = {};
	cards: Record<string, Card> = {};

	constructor() {
		makeAutoObservable(this);
	}

	// === Загрузка данных начальная ===
	async fetchBoardsData(boardIds?: string[]) {
		const data = await fetchBoards(boardIds);
		runInAction(() => {
			this.boards = data.boards;

			this.columns = data.columns.reduce(
				(acc, col) => ((acc[col.id] = col), acc),
				{} as Record<string, Column>
			);
			this.cards = data.cards.reduce(
				(acc, card) => ((acc[card.id] = card), acc),
				{} as Record<string, Card>
			);
		});
	}

	// === Геттеры (computed) ===
	get orderedBoards() {
		return this.boards;
	}

	get columnsByBoard() {
		return Object.values(this.columns).reduce(
			(acc, col) => {
				(acc[col.boardId] ??= []).push(col);
				return acc;
			},
			{} as Record<string, Column[]>
		);
	}

	get cardsByColumns() {
		return Object.fromEntries(
			Object.entries(this.columns).map(([id, column]) => [
				id,
				column.cards.map((c) => this.cards[c]),
			])
		);
	}

	moveBoard(boardId: string, newPos: number) {
		const oldIndex = this.boards.findIndex((b) => b.id === boardId);
		if (oldIndex === -1) return;
		const moved = this.boards.splice(oldIndex, 1)[0];
		this.boards.splice(newPos, 0, moved);
	}

	moveColumn(columnId: string, newPos: number) {
		const column = this.columns[columnId];
		if (!column) return;

		const board = this.boards.find((b) => b.id === column.boardId);
		if (!board) return;

		const oldIndex = board.columns.findIndex((id) => id === columnId);
		if (oldIndex === -1) return;

		const moved = board.columns.splice(oldIndex, 1)[0];
		board.columns.splice(newPos, 0, moved);
	}

	moveCard(
		cardId: string,
		fromColumnId: string,
		toColumnId: string,
		newPos: number
	) {
		const fromCol = this.columns[fromColumnId];
		const toCol = this.columns[toColumnId];
		if (!fromCol || !toCol) return;
		const oldIndex = fromCol.cards.findIndex((id) => id === cardId);
		if (oldIndex === -1) return;
		fromCol.cards.splice(oldIndex, 1)[0];
		toCol.cards.splice(newPos, 0, cardId);
	}
}

export const boardStore = new BoardStore();