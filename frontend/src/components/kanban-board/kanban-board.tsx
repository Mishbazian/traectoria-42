import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';

export function KanbanBoard({
	id,
	index,
	children,
	header,
}: KanbanBoardProps) {
	const { ref } = useSortable({
		id,
		index,
		type: 'board',
		collisionPriority: CollisionPriority.Low,
		accept: [`column_${id}`, 'board'],
	});

	return (
		<section ref={ref}>
			{header && <div className='flex justify-between'>{header}</div>}
			<ScrollArea className='w-full'>
				<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/4)))]'>
					{children}
				</div>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
		</section>
	);
}
