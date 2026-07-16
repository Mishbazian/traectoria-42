import type { Ref } from 'react';
import type { UseSortableInput } from '@dnd-kit/react/sortable';

export interface KanbanBoardProps extends Partial<UseSortableInput> {
  id: string;
  ref?: Ref<HTMLElement> | undefined;
  handleRef?: Ref<HTMLElement> | undefined;
  children: React.ReactNode;
}
