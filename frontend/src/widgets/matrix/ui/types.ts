import type { IBoardStore } from '@entities';

export interface BoardPanelProps {
	store: IBoardStore;
}

export type DraggableProps = {
	isDragging?: boolean;
};
export type SortableProps = DraggableProps & {
	handleRef?: (element: Element | null) => void;
};
