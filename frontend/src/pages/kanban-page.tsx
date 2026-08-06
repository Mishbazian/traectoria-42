import { Spinner, Toggle } from '@ui';
import { observer } from 'mobx-react-lite';
import { BoardsPanel } from '@/widgets/matrix/ui/boards-panel';
import { MatrixBoardStore } from '@/entities/matrix-panel';

const store = new MatrixBoardStore();

export const KanbanPage = observer(() => {
	return (
		<>
			{store.isLoading ? (
				<div className='flex h-screen items-center justify-center'>
					<Spinner className='size-8' />
				</div>
			) : (
				<BoardsPanel store={store} />
			)}
		</>
	);
});
