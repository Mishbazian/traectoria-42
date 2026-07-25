import { useState, useCallback } from 'react';
import type {
	DragStartEvent,
	DragOverEvent,
	DragEndEvent,
} from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';

type DragOpsProps = {
	id: string;
	type: string;
	fromGroup: string;
	toGroup?: string;
	toIndex: number;
};

type DragStartState = Omit<DragOpsProps, 'toGroup' | 'toIndex'> | null;

type TUseKanbanDragProps = {
	cardsByColumns: Record<string, string[]>;
	moveItem: (props: DragOpsProps) => boolean | Promise<boolean>;
};

export function useKanbanDrag({
	cardsByColumns,
	moveItem,
}: TUseKanbanDragProps) {
	const [cardsOrder, setCardsOrder] =
		useState<Record<string, string[]>>(cardsByColumns);

	const [dragStart, setDragStart] = useState<DragStartState>(null);

	const handleMove = useCallback(
		async (props: DragOpsProps) => {
			const success = await moveItem({
				type: props.type,
				id: props.id,
				fromGroup: props.fromGroup,
				toIndex: props.toIndex,
				toGroup: props.toGroup,
			});

			if (!success) {
				setCardsOrder(cardsByColumns);
			}
		},
		[cardsByColumns, moveItem]
	);

	const onDragStart = useCallback((event: DragStartEvent) => {
		const { source } = event.operation;
		if (isSortable(source) && source.type && source.initialGroup) {
			const { id, type, initialGroup } = source;
			setDragStart({
				id: id.toString(),
				type: type.toString(),
				fromGroup: initialGroup.toString(),
			});
		}
	}, []);

	const onDragOver = useCallback((event: DragOverEvent) => {
		const { source } = event.operation;
		if (source && source.type === 'card') {
			setCardsOrder((items) => move(items, event));
		}
	}, []);

	const onDragEnd = useCallback(
		async (event: DragEndEvent) => {
			const { source } = event.operation;

			if (
				!event.canceled &&
				isSortable(source) &&
				dragStart &&
				dragStart.id === source.id.toString()
			) {
				const { group, index } = source;
				await handleMove({
					...dragStart,
					toIndex: index,
					toGroup: group?.toString(),
				});
			}
		},
		[dragStart, handleMove]
	);

	return {
		cardsOrder,
		dragHandlers: {
			onDragStart,
			onDragOver,
			onDragEnd,
		},
	};
}
