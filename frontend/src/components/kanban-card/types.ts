import type { Ref } from 'react';

export interface KanbanCardProps {
	id: string;
	onDetailClick: () => void;
	ref?: Ref<HTMLDivElement> | undefined;
}
