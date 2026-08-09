// DTO-типы для классической канбан-доски

export type BoardDTO = {
	id: string;
	title: string;
	columns: string[];
	createdAt?: string;
	updatedAt?: string;
};

export type CardDTO = {
	id: string;
	title: string;
	description?: string;
	position?: number;
	columnId?: string;
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
};

export type ColumnDTO = {
	id: string;
	title: string;
	boardId: string;
	position: number;
	cards: CardDTO['id'][];
};

export type BoardsDTO = BoardDTO[];
export type CardsDTO = CardDTO[];
export type ColumnsDTO = ColumnDTO[];
