// frontend/src/entities/matrix-panel/matrix.ts
import { makeAutoObservable, runInAction } from 'mobx';
import type {
	IAxisPoint,
	ICell,
	IBoard,
	TTask,
	TUser,
	IBoardStore,
} from './types';
import { fetchMatrixBoardMock } from '../../shared/api/mocks/board-mock';
import { nanoid } from 'nanoid';
import type { MatrixBoardDTO } from '@/shared/api/types';

export class MatrixBoardStore implements IBoardStore {
	boards: IBoard[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
		this._init();
	}

	// === Инициализация ===
	private _init = async () => {
		runInAction(() => {
			this.isLoading = true;
		});
		const loaded = await fetchMatrixBoardMock();
		console.log('loaded');
		runInAction(() => {
			this.isLoading = false;
			loaded.forEach((boardDto) => {
				const board = new Board(boardDto);
				this.boards.push(board);
			});
		});
	};
}

export class Board implements IBoard {
	readonly id: string = '';
	title: string = '';
	x: IAxisPoint[] = [];
	y: IAxisPoint[] = [];
	cells: ICell[] = [];
	constructor(board: MatrixBoardDTO) {
		makeAutoObservable(this);
		this.id = board.id;
		this.title = board.title;
		this.x = board.columns.map(({ id, title }) => new AxisPoint(id, title));
		this.y = board.rows.map(({ id, title }) => new AxisPoint(id, title));
		this.initNewCells(
			board.columns.map((c) => c.id),
			board.rows.map((r) => r.id)
		);
		board.cells.forEach((cell) => {
			this.cellsCoordsMap[cell.col][cell.row].data.push(...cell.data);
		});
	}
	initNewCells(xList: IAxisPoint['id'][], yList: IAxisPoint['id'][]) {
		xList.forEach((x) => {
			yList.forEach((y) => {
				const cell = new Cell(x, y, this.id);
				this.cells.push(cell);
			});
		});
	}
	get cellsCoordsMap() {
		return this.cells.reduce(
			(acc, cell) => {
				if (!acc[cell.x]) acc[cell.x] = {};
				acc[cell.x][cell.y] = cell;
				return acc;
			},
			{} as Record<string, Record<string, Cell>>
		);
	}
	get cellsMap() {
		return this.cells.reduce(
			(acc, cell) => {
				acc[cell.id] = cell;
				return acc;
			},
			{} as Record<string, ICell>
		);
	}
}

export class AxisPoint implements IAxisPoint {
	constructor(
		readonly id: string,
		public title: string
	) {
		makeAutoObservable(this);
	}
}

export class Cell implements ICell {
	readonly id: string;
	constructor(
		readonly x: string,
		readonly y: string,
		readonly board: string,
		public data: TTask[] = []
	) {
		makeAutoObservable(this);
		this.id = nanoid();
	}
}

export class Task implements TTask {
	constructor(
		readonly id: string,
		readonly createdAt: string,
		public title: string,
		public author: TUser,
		public updatedAt: string,
		public assignee?: TUser,
		public dueDate?: string,
		public tags?: string[],
		public description?: string
	) {}
}
