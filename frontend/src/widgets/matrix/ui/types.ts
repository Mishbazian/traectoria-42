import type { HTMLAttributes, ReactNode } from 'react';
import type { IAxis, IAxisPoint, IBoard, IBoardStore } from '@entities';

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
	block: IAxisPoint | (IBoard & { update?: (data: Partial<BlockData>) => void; delete?: () => void });
	headerTextTag: TextTag;
	editable: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
}

export interface KanbanBoardProps {
	id: string;
	className?: string;
	board: IBoard;
	index: number;
	colWidthPx: number;
}

export interface BlockListProps {
	state: IAxis;
	className?: string;
	withCells?: boolean;
	variant?: 'cols' | 'rows'
}

export interface CellsListProps {
	point: IAxisPoint;
	className?: string;
}

export interface BlockPointProps {
	point: IAxisPoint;
	type: string;
	index: number;
	children?: ReactNode;
	className?: string;
}

type TCardItem = {
	id: string
	title: string;
	description?: string;
};

export interface KanbanCardProps {
	card: TCardItem;
	index: number;
	cellId: string;
	onCardClick: () => void;
	className?: string;
	action?: ReactNode;
	info?: ReactNode;
	footer?: ReactNode;
}
