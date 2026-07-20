import type { Ref } from 'react';
import type { UseSortableInput } from '@dnd-kit/react/sortable';

export interface KanbanColumnProps extends Partial<UseSortableInput> {
  id: string;
  children: React.ReactNode;
  ref?: Ref<HTMLElement> | undefined;
  handleRef?: Ref<HTMLElement> | undefined;
  isDragging?: boolean;
}
