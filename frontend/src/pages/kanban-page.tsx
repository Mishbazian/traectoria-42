import { KanbanBoard } from '@/components/kanban-board';
import {
	boardIdsAtom,
	boardsAsyncAtom,
} from '@/state/board-store';
import { useAtomValue, useSetAtom } from 'jotai';

import React, { Suspense, useEffect } from 'react';
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
			{data.map((board) => (
				<React.Fragment key={board.id}>
					<h2>{board.title}</h2>
					<KanbanBoard {...board} />
				</React.Fragment>
			))}
		</div>
	);
};
