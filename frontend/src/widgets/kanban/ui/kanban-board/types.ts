import type { Ref } from 'react';
import type { UseSortableInput } from '@dnd-kit/react/sortable';
import type { ClassNameValue } from 'tailwind-merge';

export interface KanbanBoardProps extends Partial<UseSortableInput> {
	id: string;
	handleRef?: Ref<HTMLElement> | undefined;
	isDragging?: boolean;
	children: React.ReactNode;
	className?: ClassNameValue;
}
