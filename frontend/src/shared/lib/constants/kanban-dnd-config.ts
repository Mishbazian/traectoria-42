import type { UseSortableInput } from '@dnd-kit/react/sortable';
import { CollisionPriority } from '@dnd-kit/abstract';
import {
	RestrictToHorizontalAxis,
	RestrictToVerticalAxis,
} from '@dnd-kit/abstract/modifiers';
import type { UseDraggableInput, UseDroppableInput } from '@dnd-kit/react';

export const BOARD_TYPE: string = 'board' as const;
export const COLUMN_TYPE: string = 'column' as const;
export const ROW_TYPE: string = 'row' as const;
export const CELL_TYPE: string = 'cell' as const;
export const CARD_TYPE: string = 'card' as const;

export type SortablePreset = Omit<
	Partial<UseSortableInput>,
	'id' | 'index' | 'group'
>;

export type DroppablePreset = Omit<Partial<UseDroppableInput>, 'id'>;

export type DraggablePreset = Omit<Partial<UseDraggableInput>, 'id'>;

export const boardConfig: SortablePreset = {
	type: BOARD_TYPE,
	accept: [BOARD_TYPE],
	collisionPriority: CollisionPriority.Lowest,
} as const;

export const columnConfig: SortablePreset = {
	type: COLUMN_TYPE,
	accept: [COLUMN_TYPE],
	modifiers: [RestrictToHorizontalAxis],
} as const;

export const rowConfig: SortablePreset = {
	type: ROW_TYPE,
	accept: [ROW_TYPE],
	modifiers: [RestrictToVerticalAxis],
} as const;

export const cardConfig: SortablePreset = {
	type: CARD_TYPE,
	accept: [CARD_TYPE],
} as const;

export const cardDragConfig: DraggablePreset = {
	type: CARD_TYPE,
};

export const cellConfig: DroppablePreset = {
	type: CELL_TYPE,
	accept: [CARD_TYPE],
	collisionPriority: CollisionPriority.Low,
};
