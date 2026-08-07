export type TUser = {
	id: string;
	name: string;
	avatar?: string;
};

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

export type TAxisName = 'x' | 'y' | 'board';

export interface IAxis {
	type: TAxisName;
	points: IAxisPoint[];
	addPoint: (title: string) => void;
	deletePoint: (id: string) => void;
}
export type TAxisPointData = {
	title: string;
	color?: string;
};

export interface IAxisPoint extends TAxisPointData {
	id: string;
	axis?: string;
	delete: () => void;
	update: (updated: Partial<TAxisPointData>) => void;
	cells: ICell[];
}

export type TCoords = {
	[x in TAxisName]: IAxisPoint['id'];
};

export interface ICell extends TCoords {
	id: string;
	data: TTask[];
	addCellData: (data: TTask[]) => void;
	removeCard: (cardId: string, from?: number) => TTask | null;
	addCard: (card: TTask, pos?: number) => void;
}

export type TBoardAxes = {
	[key in Exclude<TAxisName, 'board'>]: IAxis;
};

export interface IBoard extends Omit<IAxisPoint, 'axis'> {
	axes: IAxis[];
	cells: ICell[];
	reverseAxes: () => void;
	cellsCoordsMap: Record<string, Record<string, ICell>>;
	axesMap: Record<string, IAxis>;
}

export interface IBoardStore {
	boards: IBoard[];
	isLoading: boolean;
	cellsCardsMap: Record<string, TTask[]>;
	moveCard: (
		cardId: string,
		fromCell: string,
		fromPos: number,
		toCell: string,
		toPos?: number
	) => boolean;
}
