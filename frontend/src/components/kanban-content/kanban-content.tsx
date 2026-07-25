import { observer } from 'mobx-react-lite';
import { KanbanBoard } from '../kanban-board';
import { KanbanColumn } from '../kanban-column';
import { KanbanCard } from '../kanban-card';
import { DragDropProvider } from '@dnd-kit/react';
import { boardStore } from '@/state/board-store';
import { withSortable } from '@/shared/hocs/with-sortable-hoc';
import { useKanbanDrag } from '@/shared/hooks/use-kanban-drag';
import {
	boardConfig,
	columnConfig,
	cardConfig,
} from '@/shared/config/kanban-dnd-config';
import { TaskKanbanCardInfo } from '../task-kanban-card-info';

const SortableBoard = withSortable(KanbanBoard);
const SortableColumn = withSortable(KanbanColumn);
const SortableCard = withSortable(KanbanCard);

export const KanbanContent = observer(() => {
	const { cardsOrder, dragHandlers } = useKanbanDrag({
		cardsByColumns: boardStore.cardsByColumns,
		moveItem: boardStore.moveItem,
	});

	const handleClickDetails = () => console.log('клик детали карточки'); //@TODO

	return (
		<DragDropProvider {...dragHandlers}>
			<div className='flex flex-col gap-2 p-4'>
				{boardStore.boards.map((board, boardIndex) => (
					<SortableBoard
						key={board.id}
						id={board.id}
						index={boardIndex}
						{...boardConfig}>
						{board.columns.map((columnId, colIndex) => (
							<SortableColumn
								key={columnId}
								id={columnId}
								index={colIndex}
								group={board.id}
								{...columnConfig}>
								{cardsOrder[columnId]?.map((cardId, cardIndex) => (
									<SortableCard
										id={cardId}
										key={cardId}
										card={boardStore.cardsMap[cardId]}
										onCardClick={handleClickDetails}
										index={cardIndex}
										group={columnId}
										info={
											<TaskKanbanCardInfo info={boardStore.cardsMap[cardId]} />
										}
										{...cardConfig}
									/>
								))}
							</SortableColumn>
						))}
					</SortableBoard>
				))}
			</div>
		</DragDropProvider>
	);
});
