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

export type TAxis = 'x' | 'y' | 'board';

export interface IAxisPoint {
	id: string;
	title: string;
}

export type TCoords = {
	[x in TAxis]: IAxisPoint['id'];
};

export interface ICell extends TCoords {
	id: string;
	data: TTask[];
}

export type TBoardAxis = {
	[key in Exclude<TAxis, 'board'>]: IAxisPoint[];
};

export interface IBoard extends TBoardAxis, IAxisPoint {}

export interface IBoardStore {
	boards: IBoard[];
	isLoading: boolean;
}
