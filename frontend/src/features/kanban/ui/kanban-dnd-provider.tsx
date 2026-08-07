import {
	DragDropProvider,
	type DragEndEvent,
	type DragOverEvent,
} from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { useCallback, type ReactNode } from 'react';

export const KanbanDndProvider = ({
	children,
	moveCard,
	cardType,
	cellType,
}: {
	children: ReactNode;
	moveCard: (
		cardId: string,
		fromCell: string,
		fromPos: number,
		toCell: string,
		toPos?: number
	) => boolean;
	cardType: string;
	cellType: string;
}) => {
	const handleDragOver = useCallback(
		(event: DragOverEvent) => {
			const { source } = event.operation;
			if (source?.type === cardType) event.preventDefault();
		},
		[cardType]
	);
	const handleDragEnd = useCallback(
		async (event: DragEndEvent) => {
			if (event.canceled) return;
			const { source, target } = event.operation;
			if (
				source?.type === cardType &&
				isSortable(source) &&
				source.initialGroup &&
				target
			) {
				const isCardTarget = target.type === cardType && isSortable(target);
				const isCellTarget = target.type === cellType;

				if (!isCardTarget && !isCellTarget) {
					return;
				}
				const cardId = source.id.toString();
				const fromCell = source.initialGroup.toString();
				const fromPos = source.initialIndex;

				let toCell;
				let toPos: number | undefined;

				if (isCardTarget && target.group) {
					toCell = target.group.toString();
					toPos =
						(target.group === fromCell && target.index === fromPos - 1) ||
						target.index === fromPos + 1
							? target.index
							: target.index + 1;
				}

				if (isCellTarget) {
					toCell = target.id.toString();
				}

				if (toCell !== undefined)
					moveCard(cardId, fromCell, fromPos, toCell, toPos);
			}
		},
		[moveCard, cardType, cellType]
	);
	return (
		<DragDropProvider onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
			{children}
		</DragDropProvider>
	);
};
