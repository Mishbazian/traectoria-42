// === Primitives ===

export type TUser = {
	id: string;
	name: string;
	avatar?: string;
};

// === Point ===

export type TPointData = {
	title: string;
	color?: string;};


export interface IAxisPoint extends TPointData{
	id: string;
  cells: ICell[];
	delete: () => void;
	update: (updated: Partial<TPointData>) => void;
	
}

// === Axis ===

export type TAxisName = 'x' | 'y';

export type TBoardAxes = {
	[K in TAxisName]: IAxis;
};

export interface IAxis {
	id: string;
	type: TAxisName;
	points: IAxisPoint[];
	addPoint: (title: string) => void;
	deletePoint: (id: string) => void;
}

// === Cell ===

export interface ICell {
	id: string;
	x: string;
	y: string;
	board: string;
	data: TTask[];
	addCellData: (data: TTask[]) => void;
	removeCard: (cardId: string, from?: number) => TTask | null;
	addCard: (card: TTask, pos?: number) => void;
}

// === Task ===

export type TTask = {
	id: string;
	title: string;
	description?: string;
	author: TUser;
	assignee?: TUser;
	dueDate?: string;
	tags?: string[];
	createdAt: string;
	updatedAt: string;
};

// === Board ===

export interface IBoard {
	id: string;
	title: string;
	axes: IAxis[];
	cells: ICell[];
	axesMap: TBoardAxes;
	reverseAxes: () => void;
	updateTitle: (title: string) => void;
}

// === Store ===

export interface IBoardStore {
	boards: IBoard[];
	isLoading: boolean;
	cells: ICell[];
	axes: IAxis[];
	cellsCardsMap: Record<string, TTask[]>;
	moveCard: (
		cardId: string,
		fromCell: string,
		fromPos: number,
		toCell: string,
		toPos?: number
	) => boolean;
	deleteBoard: (boardId: string) => void;
}
