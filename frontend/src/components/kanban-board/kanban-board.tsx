import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { KanbanBoardHeader } from '../kanban-board-header';
import type { FC } from 'react';
import { Grip } from 'lucide-react';

export const KanbanBoard: FC<KanbanBoardProps> = ({ id, index, children }) => {
	const { ref, handleRef } = useSortable({
		id,
		index,
		type: 'board',
		collisionPriority: CollisionPriority.Lowest,
		accept: 'board',
	});

	return (
		<section ref={ref}>
			<div className='flex gap-1'>
				<Grip ref={handleRef}/>
				<KanbanBoardHeader id={id} />
			</div>
			<ScrollArea className='w-full overflow-y-hidden'>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/4)))]'>
					{children}
				</div>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
		</section>
	);
};
