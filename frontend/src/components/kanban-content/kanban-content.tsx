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

const SortableBoard = withSortable(KanbanBoard);
const SortableColumn = withSortable(KanbanColumn);
const SortableCard = withSortable(KanbanCard);

export const KanbanContent = observer(() => {
	useEffect(() => {
		boardStore.fetchBoardsData();
	}, []);

	const { isLoading, boards, columnsByBoard, cardsByColumns } = boardStore;
	const { boardsOrder, columnsOrder, cardsOrder, dragHandlers } = useKanbanDrag(
		boards ?? [],
		columnsByBoard ?? {},
		cardsByColumns ?? {}
	);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<Spinner  className='size-8'/>
			</div>
		);
	}

	return (
		<DragDropProvider {...dragHandlers}>
			<div className='p-4'>
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
										key={cardId}
										id={cardId}
										onDetailClick={() => {}}
										index={cardIndex}
										group={columnId}
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
