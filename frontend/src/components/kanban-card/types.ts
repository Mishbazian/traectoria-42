import type { Ref } from 'react';
import type { UseSortableInput } from '@dnd-kit/react/sortable';

export interface KanbanCardProps extends Partial<UseSortableInput> {
  id: string;
  onDetailClick: () => void;
  ref?: Ref<HTMLDivElement> | undefined;
}
