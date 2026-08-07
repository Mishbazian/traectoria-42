import { makeAutoObservable, runInAction } from 'mobx';
import type {
	IAxisPoint,
	ICell,
	IBoard,
	TTask,
	TUser,
	IBoardStore,
	IAxis,
	TAxisName,
	TBoardAxes,
	TAxisPointData,
} from './types';
import { fetchMatrixBoardMock } from '../../shared/api/mocks/board-mock';
import { nanoid } from 'nanoid';
import type { MatrixBoardDTO, TAxisDTO } from '@/shared/api/types';

export class MatrixBoardStore implements IBoardStore {
	boards: IBoard[] = [];
	isLoading: boolean = false;
	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
		this._init();
	}

	// === Инициализация ===
	private _init = async () => {
		runInAction(() => {
			this.isLoading = true;
		});
		const loaded = await fetchMatrixBoardMock();
		runInAction(() => {
			this.isLoading = false;
			loaded.forEach((boardDto) => {
				const board = new Board(boardDto, this.deleteBoard(boardDto.id));
				this.boards.push(board);
			});
		});
	};

	get cells(): ICell[] {
		return this.boards.flatMap(({ cells }) => cells);
	}
	get axes(): IAxis[] {
		return this.boards.flatMap(({ axes }) => axes);
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

	get cellsCardsMap(): Record<string, TTask[]> {
		return this.cells.reduce(
			(acc, { id, data }) => {
				acc[id] = data;
				return acc;
			},
			{} as Record<string, TTask[]>
		);
	}

	private deleteBoard(id: string) {
		return () => {
			console.log('delete ', id);
		};
	}

	moveCard(
		cardId: string,
		fromCell: string,
		fromPos: number,
		toCell: string,
		toPos?: number
	) {
		const moved = this.cellsMap[fromCell].removeCard(cardId, fromPos);
		if (moved) {
			this.cellsMap[toCell].addCard(moved, toPos);
			return true;
		}
		return false;
	}
}

export class Board implements IBoard {
	readonly id: string;
	readonly axis = 'board' as const;
	title: string;
	axes: IAxis[] = [];
	cells: ICell[] = [];
	constructor(
		board: MatrixBoardDTO,
		private onDelete: () => void
	) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = board.id;
		this.title = board.title;
		this.initAxis('x', board.columns);
		this.initAxis('y', board.rows);
		board.cells.forEach(({ col, row, data }) => {
			this.cellsCoordsMap[col][row].data.push(...data);
		});
	}

	private initAxis(name: Exclude<TAxisName, 'board'>, points?: TAxisDTO[]) {
		const axis = new BoardAxis(
			name,
			points ?? [],
			this.onInitNewAxisPoint(name),
			this.onRemoveAxisPoint(name),
			this.getCellsByAxisPoint(name)
		);
		this.axes.push(axis);
	}

	private getCellsByAxisPoint(axis: TAxisName) {
		return (id: string) => this.cells.filter((cell) => cell[axis] === id);
	}

	private onInitNewAxisPoint(axis: TAxisName) {
		return (newPointId: string) => {
			for (const name of Object.keys(this.axesMap)) {
				if (name !== axis) {
					this.axesMap[name as keyof TBoardAxes].points.forEach((el) => {
						const cell = Object.assign(
							{
								x: '',
								y: '',
								data: [],
								board: this.id,
							},
							{ [axis]: newPointId, [name]: el.id }
						);
						this.cells.push(new Cell(cell));
					});
				}
			}
		};
	}

	private onRemoveAxisPoint(axis: TAxisName) {
		return (id: string) => {
			this.cells = this.cells.filter((cell) => cell[axis] !== id);
		};
	}

	get axesMap() {
		return this.axes.reduce(
			(acc, axis) => {
				acc[axis.type] = axis;
				return acc;
			},
			{} as Record<string, IAxis>
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
	get cellsCoordsMap() {
		return this.cells.reduce(
			(acc, cell) => {
				if (!acc[cell.x]) acc[cell.x] = {};
				acc[cell.x][cell.y] = cell;
				return acc;
			},
			{} as Record<string, Record<string, ICell>>
		);
	}
	reverseAxes() {
		this.axes.reverse();
	}
	update(updated: Partial<TAxisPointData>) {
		Object.assign(this, updated);
	}

	delete() {
		this.onDelete();
	}
}

export class BoardAxis implements IAxis {
	id: string;
	points: IAxisPoint[] = [];
	constructor(
		public type: TAxisName,
		axisPoints: TAxisDTO[] = [],
		protected onAddPoint: (newPointId: string) => void,
		protected onDeletePoint: (pointId: string) => void,
		private getAxisPointCells: (pointId: string) => ICell[]
	) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = nanoid();
		axisPoints?.forEach(({ id, title }) => this.addPoint(title, id));
	}

	private getPointCells = (id: string) => {
		return () => this.getAxisPointCells(id);
	};

	addPoint(title: string, pointId?: string) {
		const id = pointId ?? nanoid();
		this.points.push(
			new AxisPoint(
				id,
				this.id,
				title,
				this.deletePoint,
				this.getPointCells(id)
			)
		);
		this.onAddPoint(id);
	}
	deletePoint = (id: string) => {
		this.points = this.points.filter((p) => p.id !== id);
		this.onDeletePoint(id);
		console.log('delete', id);
	};
}

export class AxisPoint implements IAxisPoint {
	constructor(
		readonly id: string,
		readonly axis: string,
		public title: string,
		private onDelete: (id: string) => void,
		private getCells: () => ICell[],
		public color?: string
	) {
		makeAutoObservable(this, {}, { autoBind: true });
	}
	get cells() {
		return this.getCells();
	}
	update(updated: Partial<TAxisPointData>) {
		Object.assign(this, updated);
	}
	delete() {
		this.onDelete(this.id);
	}
}

type CellProps = {
	x: string;
	y: string;
	board: string;
	data: TTask[];
};

export class Cell implements ICell {
	readonly id: string;
	readonly x: string;
	readonly y: string;
	readonly board: string;
	public data: TTask[];
	constructor({ x, y, board, data = [] }: CellProps) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = nanoid();
		this.x = x;
		this.y = y;
		this.board = board;
		this.data = data;
	}

	addCellData(data: TTask[]) {
		this.data.push(...data);
	}
	removeCard(cardId: string, from?: number): TTask | null {
		console.log('from ', from);
		const index =
			from !== undefined
				? from
				: this.data.findIndex((val) => val.id === cardId);
		if (index === -1) return null;
		return this.data.splice(index, 1)[0];
	}
	addCard(card: TTask, pos?: number) {
		console.log('add to pos', pos);
		if (pos === undefined) {
			this.data.push(card);
		} else {
			this.data.splice(pos, 0, card);
		}
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
