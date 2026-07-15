import type { Ref } from 'react';

export interface KanbanColumnProps {
	id: string;
	children: React.ReactNode;
	ref?: Ref<HTMLElement> | undefined;
	handleRef?: Ref<HTMLElement> | undefined;
}
