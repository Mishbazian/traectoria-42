// DTO-типы для матричной доски

/** Точка оси */
export type TAxisPointDTO = {
	id: string;
	title: string;
};

/** Ось — один идентификатор + отображаемое имя + свои точки */
export type TAxisDTO = {
	id: string;
	name: string;
	points: TAxisPointDTO[];
};

export type CardDTO = {
	/** Маппинг axisId → pointId */
	features: Record<string, string>;
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
export type MatrixBoardDTO = {
	id: string;
	title: string;
	/** Массив осей (1-N), каждая несёт свои точки */
	axes: TAxisDTO[];
	cards: CardDTO[];
};
