import type { UseSortableInput } from '@dnd-kit/react/sortable';
import type { ReactNode } from 'react';

type TCardItem = {
	title: string;
	description?: string;
};

export interface KanbanCardProps extends Partial<UseSortableInput> {
	card: TCardItem;
	onCardClick: () => void;
	className?: string;
	isDragging?: boolean;
	action?: ReactNode;
	info?: ReactNode;
	footer?: ReactNode;
}
