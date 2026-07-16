import type { UseSortableInput } from '@dnd-kit/react/sortable';
import { CollisionPriority } from '@dnd-kit/abstract';
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers';

export const BOARD_TYPE = 'board' as const;
export const COLUMN_TYPE = 'column' as const;
export const CARD_TYPE = 'card' as const;

export type SortablePreset = Omit<Partial<UseSortableInput>, 'id' | 'index' | 'group'>;

export const boardConfig: SortablePreset = {
  type: BOARD_TYPE,
  accept: [BOARD_TYPE],
  collisionPriority: CollisionPriority.Lowest,
} as const;

export const columnConfig: SortablePreset = {
  type: COLUMN_TYPE,
  accept: [CARD_TYPE, COLUMN_TYPE],
  modifiers: [RestrictToHorizontalAxis],
} as const;

export const cardConfig: SortablePreset = {
  type: CARD_TYPE,
  accept: [CARD_TYPE],
} as const;
