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

export type TCol = {
	id: string;
	title?: string;
};

export type TRow = {
	id: string;
	title?: string;
};

export type TCell = {
	board: string;
	col: string;
	row: string;
	data: TTask[];
};

export type TBoard = {
	id: string;
	title: string;
	columns: TCol[];
	rows: TRow[];
};
