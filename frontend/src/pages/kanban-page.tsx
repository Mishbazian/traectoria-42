import { Spinner, Toggle } from '@ui';
import { observer } from 'mobx-react-lite';
import { BoardsPanel } from '@/widgets/matrix/ui/boards-panel';
import { boardStore } from '@/entities/matrix-panel';

export const KanbanPage = observer(() => {
	return (
		<>
			{boardStore.isLoading ? (
				<div className='flex h-screen items-center justify-center'>
					<Spinner className='size-8' />
				</div>
			) : (
				<BoardsPanel store={boardStore} />
			)}
		</>
	);
});
