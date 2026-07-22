import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { KanbanBoard } from '../kanban-board';
import { KanbanColumn } from '../kanban-column';
import { KanbanCard } from '../kanban-card';
import { DragDropProvider } from '@dnd-kit/react';
import { boardStore } from '@/state/board-store';
import { withSortable } from '@/hocs/with-sortable-hoc';
import { useKanbanDrag } from '@/hooks/use-kanban-drag';
import {
	boardConfig,
	columnConfig,
	cardConfig,
} from '@/config/kanban-dnd-config';
import { Spinner } from '../ui/spinner';
import { TaskKanbanCardInfo } from '../task-kanban-card-info';

const SortableBoard = withSortable(KanbanBoard);
const SortableColumn = withSortable(KanbanColumn);
const SortableCard = withSortable(KanbanCard);

export const KanbanContent = observer(() => {
	useEffect(() => {
		boardStore.fetchBoardsData();
	}, []);

	const { isLoading, boards, columnsByBoard, cardsByColumns, cardsMap } =
		boardStore;
	const { boardsOrder, columnsOrder, cardsOrder, dragHandlers } = useKanbanDrag(
		boards ?? [],
		columnsByBoard ?? {},
		cardsByColumns ?? {}
	);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Spinner className='size-8' />
			</div>
		);
	}

	const handleClickDetails = () => console.log('клик детали карточки'); //@TODO

	return (
		<DragDropProvider {...dragHandlers}>
			<div className='p-4 flex flex-col gap-2'>
				{boardsOrder.map((board, boardIndex) => (
					<SortableBoard
						key={board.id}
						id={board.id}
						index={boardIndex}
						{...boardConfig}>
						{columnsOrder[board.id]?.map((columnId, colIndex) => (
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
										card={cardsMap[cardId]}
										onCardClick={handleClickDetails}
										index={cardIndex}
										group={columnId}
										info={<TaskKanbanCardInfo info={cardsMap[cardId]} />}
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
