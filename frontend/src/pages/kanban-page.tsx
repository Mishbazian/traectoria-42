import { KanbanContent } from '@/components/kanban-content/kanban-content';
import { Spinner } from '@/shared/ui/spinner';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const KanbanPage = observer(() => {
	useEffect(() => {
		boardStore.fetchBoardsData();
	}, []);

	const isLoading = boardStore.isLoading;
	return (
		<>
			{isLoading ? (
				<div className='flex h-screen items-center justify-center'>
					<Spinner className='size-8' />
				</div>
			) : (
				<KanbanContent />
			)}
		</>
	);
});
