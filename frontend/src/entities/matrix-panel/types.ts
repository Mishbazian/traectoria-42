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
	readonly id: string;
	readonly axisId: string;
	update: (updated: Partial<TPointData>) => void;
}

// === Axis ===

export interface IAxis {
	id: string;
	name: string;
	defaultPoint: IAxisPoint['id'];
	points: IAxisPoint[];
	deletePoint: (id: string) => void;
}

// === Content — семантическая сущность карточки ===

/**
 * Содержимое карточки — «что это».
 * Для задачи: заголовок, описание, автор, ответственный, дедлайн и т.д.
 * Можно расширить: BugContent, FeatureContent и т.п.
 */
export type TTaskContent = {
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

// === Board-level contract (позиционирование, без типа контента) ===

/**
 * Контракт карточки на доске.
 * Определяет board-уровень: id, привязка к доске, координаты в матрице.
 */
export interface IBoardCard {
	readonly id: string;
	boardId: string;
	features: Record<string, string>;
}

/**
 * Полная карточка: board-контракт + семантическое содержимое.
 * Для задачи: IBoardCard & TTaskContent.
 */
export type ICard = IBoardCard &
	TTaskContent & {
		update: (updates: Partial<IBoardCard>) => void;
	};

// === Board ===

export interface IBoard {
	id: string;
	title: string;
	cards: ICard[];
	axes: IAxis[];
	updateTitle: (title: string) => void;
	delete: () => void;
	getCardsByFeatures: (...props: string[]) => ICard[];
}

// === Store ===

export interface IBoardStore {
	boards: IBoard[];
	cards: ICard[];
	isLoading: boolean;
	boardsMap: Record<string, IBoard>;
	cardsMap: Map<string, ICard>;
	moveCard: (cardId: string, toBoardId: string, features: Record<string, string>) => void;
}

// === Cards Source ===

/**
 * Источник карточек для Board.
 * Делает cards вычисляемыми через filter по boardId.
 */
export interface ICardsSource {
	cards: ICard[];
}
