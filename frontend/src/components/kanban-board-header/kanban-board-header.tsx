import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import type { KanbanBoardHeaderProps } from './types';


export const KanbanBoardHeader = observer(({ id }: KanbanBoardHeaderProps) => {
	const board = boardStore.boardsMap[id];
	return (
		<div className='flex justify-between w-full'>
			<h2>{board.title}</h2>
		</div>
	);
});
