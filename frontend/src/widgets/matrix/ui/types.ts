import type { HTMLAttributes, ReactNode } from 'react';
import type {
	IAxis,
	IAxisPoint,
	IBoard,
	IBoardStore,
	ICard,
	ICell,
} from '@entities';

export interface BoardPanelProps {
	store: IBoardStore;
}

export type BlockType = 'board' | 'column' | 'row' | 'cell' | 'card';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type BlockData = {
	id: string;
	bgColor?: string;
	title: string;
};

export interface TextBlockBodyProps extends HTMLAttributes<HTMLDivElement> {
	as?: TextTag;
	blockTitle: string;
	editable?: boolean;
}

export interface DeleteBlockControlProps {
	isOpen?: boolean;
	onOpenChange?: () => void;
	onSubmit: () => void;
	blockTitle: string;
	disabled?: boolean;
}

export interface BlockHeaderMenuProps {
	onDelete?: () => void;
	onEdit?: () => void;
	onPaint?: () => void;
	blockTitle: string;
}

export interface BlockHeaderProps extends HTMLAttributes<HTMLDivElement> {
	onUpdate?: (updated: Partial<BlockData>) => void;
	onDelete?: () => void;
	block:
		| IAxisPoint
		| (IBoard & {
				update?: (data: Partial<BlockData>) => void;
				delete?: () => void;
		  });
	headerTextTag: TextTag;
	editable: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
}

export interface BlockListProps {
	state: IAxis;
	className?: string;
	withCells?: boolean;
	variant?: 'cols' | 'rows';
}

export interface BlockPointProps {
	point: IAxisPoint;
	type: string;
	index: number;
	children?: ReactNode;
	className?: string;
	noHeader?: boolean;
	mode?: 'column' | 'tableRow';
}

export type DraggableProps = {
	isDragging?: boolean;
};
export type SortableProps = DraggableProps & {
	handleRef?: (element: Element | null) => void;
};

export type KanbanAxisProps = {
	item: IAxisPoint;
	children?: ReactNode;
	className?: string;
} & SortableProps;

export type KanbanBoardProps = {
	className?: string;
	board: IBoard;
	index: number;
	colWidthPx: number;
	getCellContent: (cellId: string) => ReactNode;
} & SortableProps;

export interface BoardCellProps extends HTMLAttributes<HTMLDivElement> {
	cell: ICell;
	isDropTarget?: boolean;
	children?: ReactNode;
}
export type KanbanCardProps = {
	card: ICard;
	onCardClick: () => void;
	className?: string;
	action?: ReactNode;
	info?: ReactNode;
	footer?: ReactNode;
} & DraggableProps;
