// === Primitives ===

export type TUser = {
	id: string;
	name: string;
	avatar?: string;
};

// === Point ===

export type TPointData = {
	title: string;
	color?: string;
};

export interface IAxisPoint extends TPointData {
	id: string;
	cells: ICell[];
	update: (updated: Partial<TPointData>) => void;
}

// === Axis ===

/** Уникальный идентификатор оси */
export type TAxisId = string;

export type TBoardAxes = Record<TAxisId, IAxis>;

export interface IAxis {
	id: string;
	/** Отображаемое имя оси */
	name: string;
	defaultPoint: IAxisPoint['id'];
	points: IAxisPoint[];
	//addPoint: (title: string, pointId?: string) => void;
	deletePoint: (id: string) => void;
}

// === Cell ===

/** Маппинг: axisId → pointId для каждой выбранной оси */
export type TCellCoordinates = Record<string, string>;

export interface ICell {
	readonly id: string;
	readonly boardId: string;
	readonly x: string;
	readonly y: string;
}

// === Task ===

export interface TTask {
	id: string;
	title: string;
	description?: string;
	author: TUser;
	assignee?: TUser;
	dueDate?: string;
	tags?: string[];
	createdAt: string;
	updatedAt: string;
}

export interface ICard extends TTask {
	boardId: string;
	coordinates: Record<IAxis['id'], IAxisPoint['id']>;
}

// === Board ===

export interface IBoard {
	id: string;
	title: string;
	axes: IAxis[];
	/** Ячейки для текущей выбранной пары осей */
	cells: ICell[];
	axesMap: TBoardAxes;
	/** Выбранные оси для отображения матрицы (nullable — нет выбора) */
	xAxis: string;
	yAxis: string;
	defaultCoordinates: Record<string, string>;

	/** Получить оси для отображения */
	displayAxes: IAxis[];
	/** Выбрать оси x и y для отображения; генерирует ячейки */
	setAxes: (setted: { xAxis?: string; yAxis?: string }) => void;
	reverseAxes: () => void;
	updateTitle: (title: string) => void;
	delete: () => void;
}

// === Store ===

export interface IBoardStore {
	boards: IBoard[];
	isLoading: boolean;
	cells: ICell[];
	axes: IAxis[];
	cards: ICard[];
	moveCard: (cardId: ICard['id'], toCell: ICell['id']) => void;
}
