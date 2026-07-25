import { Spinner } from '@ui';
import { boardStore } from '@entities';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { KanbanContent } from '@widgets';



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
