import type { Ref } from 'react';

export interface KanbanBoardProps {
	id: string;
	ref?: Ref<HTMLElement> | undefined;
	handleRef?: Ref<HTMLElement> | undefined;
	children: React.ReactNode;
}
