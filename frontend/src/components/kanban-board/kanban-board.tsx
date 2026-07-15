import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { EditableTextBlock } from '../editable-text-block';
import { type FC } from 'react';
import { Grip } from 'lucide-react';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';

export const KanbanBoard: FC<KanbanBoardProps> = observer(
	({ id, index, children }) => {
		const { ref, handleRef } = useSortable({
			id,
			index,
			type: 'board',
			collisionPriority: CollisionPriority.Lowest,
			accept: 'board',
		});

		const board = boardStore.boardsMap[id];

		const handleHeaderUpdate = async (newTitle: string) => {
			await boardStore.updateBoard(id, { ...board, title: newTitle });
		};

		return (
			<section ref={ref}>
				<EditableTextBlock
					item={boardStore.boardsMap[id]}
					prepend={<Grip ref={handleRef} />}
					onSubmit={handleHeaderUpdate}
				/>

				<ScrollArea className='w-full overflow-y-hidden'>
					<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/4)))]'>
						{children}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</section>
		);
	}
);
