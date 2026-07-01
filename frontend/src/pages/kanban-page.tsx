import { KanbanBoard } from '@/components/kanban-board';
import { boardIdsAtom, boardsAsyncAtom } from '@/state/board-store';
import { useAtom, useAtomValue } from 'jotai';
import { Suspense, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import type { Card, Column } from '@/state/types';
import { DragDropProvider } from '@dnd-kit/react';
import { KanbanColumn } from '@/components/kanban-column';
import { KanbanCard } from '@/components/kanban-card';
import { move } from '@dnd-kit/helpers';
import {
	kanbanBoardsAtom,
	kanbanColumnsStateAtom,
	kanbanColumnOrderAtom,
} from '@/state/kanban-store';

const BOARD_ID = ['taskboard1', 'taskboard2'];

export const KanbanPage = () => {
	const setBoardIds = useAtom(boardIdsAtom)[1];

	useEffect(() => {
		setBoardIds(BOARD_ID);
	}, [setBoardIds]);

	return (
		<Suspense
			fallback={
				<div className='flex justify-center items-center h-dvh'>
					<Spinner className={'size-10'} />
				</div>
			}>
			<KanbanContent />
		</Suspense>
	);
};

const KanbanContent = () => {
	const data = useAtomValue(boardsAsyncAtom);

	const [boards, setBoards] = useAtom(kanbanBoardsAtom);
	const [columnsState, setColumnsState] = useAtom(kanbanColumnsStateAtom);
	const [columnOrder, setColumnOrder] = useAtom(kanbanColumnOrderAtom);

	// Загрузка данных из API напрямую в localStorage
	useEffect(() => {
		if (data.length > 0) {
			// Загружаем только если localStorage еще не содержит данные
			const savedBoards = localStorage.getItem('kanban-boards');
			if (!savedBoards) {
				setBoards(data);

				// Инициализация columnsState и columnOrder из данных API
				const cols: Record<string, Card[]> = {};
				const columnOrderData: Record<string, Column[]> = {};
				for (const board of data) {
					columnOrderData[board.id] = [...board.columns];
					for (const col of board.columns) {
						cols[col.id] = [...col.cards];
					}
				}
				setColumnsState(cols);
				setColumnOrder(columnOrderData);
			}
		}
	}, [data, setBoards, setColumnsState, setColumnOrder]);

	return (
		<DragDropProvider
			onDragOver={(event) => {
				const { source } = event.operation;

				if (source?.type !== 'card') return;

				setColumnsState((items) => move(items, event));
			}}
			onDragEnd={(event) => {
				const { source } = event.operation;

				if (event.canceled) {
					return;
				} else if (source?.type === 'board') {
					setBoards((boards) => move(boards, event));
				} else if (/^column_/.test(String(source?.type))) {
					setColumnOrder((columns) => move(columns, event));
				} else return;
			}}>
			<div className='p-4'>
				{boards.map((board, index) => (
					<KanbanBoard
						id={board.id}
						index={index}
						title={board.title}
						key={board.id}>
						{columnOrder[board.id]?.map((col, index) => {
							return (
								<KanbanColumn
									key={col.id}
									id={col.id}
									title={col?.title ?? ''}
									cards={columnsState[col.id] || []}
									index={index}
									boardId={board.id}>
									{(card, index) => (
										<KanbanCard
											id={card.id}
											title={card.title}
											description={card.description}
											authorName={card.author.name ?? ''}
											authorAvatar={card.author.avatar ?? ''}
											onDetailClick={() => {}}
											index={index}
											columnId={col.id}
										/>
									)}
								</KanbanColumn>
							);
						})}
					</KanbanBoard>
				))}
			</div>
		</DragDropProvider>
	);
};
