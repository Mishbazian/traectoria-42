import { makeAutoObservable, runInAction } from 'mobx';
import type { ICell, IBoard, IBoardStore, IAxis, ICard } from './types';
import { fetchMatrixBoard } from '@api';
import { Board } from './board';
import { Card } from './card';

export class MatrixBoardStore implements IBoardStore {
	boards: IBoard[] = [];
	cards: ICard[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
		this._init();
	}

	private _init = async () => {
		runInAction(() => {
			this.isLoading = true;
		});
		const loaded = await fetchMatrixBoard();
		runInAction(() => {
			this.isLoading = false;
			loaded.forEach((board) => {
				this.boards.push(
					new Board(board, () => {
						this.deleteBoard(board.id);
					})
				);
				board.cards.forEach((card) => {
					this.cards.push(new Card({ ...card, boardId: board.id }));
				});
			});
		});
	};
	get boardsMap() {
		return new Map(this.boards.map((board) => [board.id, board]));
	}

	deleteBoard(boardId: string) {
		this.boards = this.boards.filter((b) => b.id !== boardId);
	}

	get cells(): ICell[] {
		return this.boards.flatMap(({ cells }) => cells);
	}

	get cellsMap(): Map<ICell['id'], ICell> {
		return new Map(this.cells.map((cell): [string, ICell] => [cell.id, cell]));
	}

	get cardsMap(): Map<ICard['id'], ICard> {
		return new Map(this.cards.map((card) => [card.id, card]));
	}

	get cellCardsMap(): Map<ICell['id'], ICard[]> {
		const map = new Map<ICell['id'], ICard[]>();
		for (const cell of this.cells) {
			const cardsInCell: ICard[] = [];
			for (const card of this.cards) {
				const cardCoords = Object.values(card.coordinates);
				if (cardCoords.includes(cell.x) && cardCoords.includes(cell.y)) {
					cardsInCell.push(card);
				}
			}
			map.set(cell.id, cardsInCell);
		}

		return map;
	}

	get axes(): IAxis[] {
		return this.boards.flatMap(({ axes }) => axes);
	}
	getAxisByPoint(id: string) {
		return this.axes.find((axis) =>
			axis.points.some((point) => point.id === id)
		);
	}

	moveCard(cardId: ICard['id'], toCell: ICell['id']) {
		const to = this.cellsMap.get(toCell);
		if (!to) return;

		const axisX = this.getAxisByPoint(to.x);
		const axisY = this.getAxisByPoint(to.y);
		if (!axisX || !axisY) return;

		const newCoords: Record<string, string> = {
			[axisX.id]: to.x,
			[axisY.id]: to.y,
		};

		const card = this.cardsMap.get(cardId);
		if (!card) return;

		if (card.boardId === to.boardId) {
			Object.assign(card.coordinates, newCoords);
		} else {
			const targetBoard = this.boardsMap.get(to.boardId);
			if (!targetBoard) return;
			card.boardId = to.boardId;
			card.coordinates = Object.assign(
				{ ...targetBoard.defaultCoordinates },
				newCoords
			);
		}
	}
}
