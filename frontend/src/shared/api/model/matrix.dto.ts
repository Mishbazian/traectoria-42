// DTO-типы для матричной доски

export type TAxisDTO = {
	id: string;
	title: string;
};

export type TColDTO = TAxisDTO;
export type TRowDTO = TAxisDTO;

export type CellDTO = {
	board: string;
	column: TColDTO['id'];
	row: TRowDTO['id'];
	data: CardDTO[];
};


export type MatrixBoardDTO = {
	id: string;
	title: string;
	columns: TColDTO[];
	rows: TRowDTO[];
	cells: CellDTO[];
};

export type CardDTO = {
	id: string;
	title: string;
	description?: string;
	author: {
		id: string;
		name: string;
		avatar?: string;
	};
	assignee?: {
		id: string;
		name: string;
		avatar?: string;
	};
	dueDate?: string;
	tags?: string[];
	createdAt: string;
	updatedAt: string;
};
