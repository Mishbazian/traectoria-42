import { KanbanBoard } from '@/components/kanban-board';
import { KanbanCard } from '@/components/kanban-card';
import { KanbanColumn } from '@/components/kanban-column';
import { boardIdsAtom, boardsAsyncAtom } from '@/state/board-store';
import { useAtomValue, useSetAtom } from 'jotai';
import type { Board } from '@/state/types';

import { Suspense, useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';

const BOARD_ID = 'taskboard1';

export const KanbanPage = () => {
	const setBoardIds = useSetAtom(boardIdsAtom);

	useEffect(() => {
		setBoardIds([BOARD_ID]);
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

	return (
		<div>
			{(data as Board[]).map((board) => (
				<>
					<h2 key={board.id}>{board.title}</h2>
					<KanbanBoard columns={board.columns}>
						{(column) => (
							<KanbanColumn cards={column.cards} title={column.title}>
								{(card) => (
									<KanbanCard
										title={card.title}
										description={card.description}
										authorName={card.author.name}
										authorAvatar={card.author.avatar}
										onDetailClick={() => {}}
									/>
								)}
							</KanbanColumn>
						)}
					</KanbanBoard>
				</>
			))}
		</div>
	);
};
