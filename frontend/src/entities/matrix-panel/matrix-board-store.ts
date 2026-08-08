import { makeAutoObservable, runInAction } from 'mobx';
import type { ICell, IBoard, TTask, IBoardStore, IAxis } from './types';
import { fetchMatrixBoardMock } from '../../shared/api/mocks/board-mock';
import { Board } from './board';

export class MatrixBoardStore implements IBoardStore {
	boards: IBoard[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
		this._init();
	}

	private _init = async () => {
		runInAction(() => {
			this.isLoading = true;
		});
		const loaded = await fetchMatrixBoardMock();
		runInAction(() => {
			this.isLoading = false;
			this.boards = loaded.map(
				(dto) =>
					new Board(dto, () => {
						this.boards = this.boards.filter((b) => b.id !== dto.id);
					})
			);
		});
	};

	get cells(): ICell[] {
		return this.boards.flatMap(({ cells }) => cells);
	}

	get axes(): IAxis[] {
		return this.boards.flatMap(({ axes }) => axes);
	}

	get cellsCardsMap(): Record<string, TTask[]> {
		return this.cells.reduce(
			(acc, { id, data }) => {
				acc[id] = data;
				return acc;
			},
			{} as Record<string, TTask[]>
		);
	}
	private get cellsMap() {
		return this.cells.reduce(
			(acc, cell) => {
				acc[cell.id] = cell;
				return acc;
			},
			{} as Record<string, ICell>
		);
	}

	moveCard(
		cardId: string,
		fromCell: string,
		fromPos: number,
		toCell: string,
		toPos?: number
	) {
		const from = this.cellsMap[fromCell];
		const to = this.cellsMap[toCell];
		if (!from || !to) return false;
		const moved = from.removeCard(cardId, fromPos);
		if (moved) {
			to.addCard(moved, toPos);
			return true;
		}
		return false;
	}
}
