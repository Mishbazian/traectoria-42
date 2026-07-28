// frontend/src/entities/matrix-panel/matrix.ts
import { makeAutoObservable } from 'mobx';
import type { TBoard, TCell, TTask } from './types';
import { fetchMatrixBoardMock } from '../../shared/api/mocks/board-mock';

// === Утилита: генерация ID ячейки ===
export const getCellId = (
	boardId: string,
	colId: string,
	rowId: string
): string => `${boardId}-${colId}-${rowId}`;

export const createCell = (
	boardId: string,
	colId: string,
	rowId: string,
	data: string[] = []
) => {
	return {
		id: `${boardId}-${colId}-${rowId}`,
		board: boardId,
		col: colId,
		row: rowId,
		data,
	};
};


export class MatrixBoardStore {

	boards: TBoard[] = [];
	cells: TCell[] = [];

	constructor() {
		makeAutoObservable(this);
		this._init();
	}

	// === Инициализация ===
	private _init = async () => {
		const loaded = await fetchMatrixBoardMock();
		loaded.forEach((b) => {
			const board: TBoard = {
				id: b.id,
				title: b.title,
				rows: b.rows,
				columns: b.columns,
			};
			this.boards.push(board);
			this.cells.push(...b.cells);
		});
	};

	get cellsDataMap() {
		return this.cells.reduce((acc, cell) => {
			acc.set(getCellId(cell.board, cell.col, cell.row), cell.data);
			return acc;
		}, new Map<string, TTask[]>());
	}
}

export const matrixBoardStore = new MatrixBoardStore();
