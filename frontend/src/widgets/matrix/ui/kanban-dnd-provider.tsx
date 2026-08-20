import type { IBoardStore } from '@/entities';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { observer } from 'mobx-react-lite';
import { useCallback, type ReactNode } from 'react';

export const KanbanDndProvider = observer(
	({
		children,
		store,
		cardType,
		cellType,
	}: {
		children: ReactNode;
		store: IBoardStore;
		cardType: string;
		cellType: string;
	}) => {
		const handleDragEnd = useCallback(
			async (event: DragEndEvent) => {
				if (event.canceled) return;
				const { source, target } = event.operation;

				if (source?.type === cardType && target?.type === cellType) {
					const cardId = source.id.toString();
					const card = store.cardsMap.get(cardId);
					if (!card) return;

					const cellData = target.data;
					if (!Object.hasOwn(cellData, 'boardId')) return;

					const targetBoardId = cellData.boardId;
					const targetFeatures = cellData.features;

					// Если карточка перемещается на другую доску — используем moveCard
					if (card.boardId !== targetBoardId) {
						store.moveCard(cardId, targetBoardId, targetFeatures);
					}
					// Если та же доска — обновляем только features (координаты в матрице)
					else {
						card.update({ features: targetFeatures });
					}
				}
			},
			[cardType, cellType, store]
		);

		return (
			<DragDropProvider onDragEnd={handleDragEnd}>
				{children}
			</DragDropProvider>
		);
	}
);
