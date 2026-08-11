import {
	DragDropProvider,
	type DragEndEvent,
} from '@dnd-kit/react';

import { useCallback, type ReactNode } from 'react';

export const KanbanDndProvider = ({
	children,
	moveCard,
	cardType,
	cellType,
}: {
	children: ReactNode;
	moveCard: (cardId: string, toCell: string) => void;
	cardType: string;
	cellType: string;
}) => {
	const handleDragEnd = useCallback(
		async (event: DragEndEvent) => {
			if (event.canceled) return;
			const { source, target } = event.operation;

			if (source?.type === cardType && target?.type === cellType) {
				const cardId = source.id.toString();
				const toCell = target.id.toString();
				moveCard(cardId, toCell);
			}
		},
		[moveCard, cardType, cellType]
	);
	return (
		<DragDropProvider onDragEnd={handleDragEnd}>{children}</DragDropProvider>
	);
};
