export type User = {
	id: string;
	name: string;
	avatar?: string;
};

export type Card = {
	id: string;
	title: string;
	description?: string;
	author: User;
	assignee?: User;
	dueDate?: string;
	tags?: string[];
	createdAt?: string;
	updatedAt?: string;
};

export type Column = {
	id: string;
	title: string;
	boardId: string;
	cards: Card['id'][];
};

export type Board = {
	id: string;
	title: string;
	createdAt?: string;
	updatedAt?: string;
	columns: Column['id'][];
};
