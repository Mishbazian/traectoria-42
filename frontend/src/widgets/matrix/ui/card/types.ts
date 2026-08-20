import type { ICard } from '@/entities';
import type { ReactNode } from 'react';
import type { DraggableProps } from '../types';

export type KanbanCardProps = {
	card: ICard;
	onCardClick: () => void;
	className?: string;
	action?: ReactNode;
	info?: ReactNode;
	footer?: ReactNode;
} & DraggableProps;
