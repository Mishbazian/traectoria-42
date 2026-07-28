export type BoardsDataDTO = {
	boards: {
		id: string;
		title: string;
		columns: {
			id: string;
			title: string;
			boardId: string;
			position: number;
			cards: {
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
				createdAt?: string;
				updatedAt?: string;
			}[];
		}[];
	}[];
};

export type BoardDTO = {
	id: string;
	title: string;
	columns: string[];
};

export type BoardsDTO = BoardDTO[];

export type ColumnDTO = {
	id: string;
	title: string;
	cards: string[];
	boardId: string;
};
export type ColumnsDTO = ColumnDTO[];
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

export type CardsDTO = CardDTO[];

// Типы для матричной доски
export type TAxis = {
	id: string;
	title: string;
};

export type TColDTO = TAxis;
export type TRowDTO = TAxis;

export type CellDTO = {
	board: string;
	col: TColDTO['id'];
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
