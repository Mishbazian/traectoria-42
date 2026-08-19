import type { IAxisPoint } from '@/entities';
import type { ReactNode } from 'react';
import type { SortableProps } from '../types';

export type KanbanAxisPointProps = {
	item: IAxisPoint;
	children?: ReactNode;
	className?: string;
} & SortableProps;
