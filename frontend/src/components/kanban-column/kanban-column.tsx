import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';

export function KanbanColumn<T extends { id: string }>({
	id,
	title,
	cards,
	children,
	index,
}: KanbanColumnProps<T>) {
	const { ref } = useSortable({
		id,
		index,
		type: 'column',
		collisionPriority: CollisionPriority.Low,
		accept: ['card', 'column'],
	});

	return (
		<div ref={ref} className='border-2'>
			<h2>{title}</h2>
			<ScrollArea className='h-screen'>
				<ul className='flex flex-col gap-2 p-2'>
					{cards.map((card, index) => (
						<li key={card.id}>{children(card, index)}</li>
					))}
				</ul>
				<ScrollBar />
			</ScrollArea>
		</div>
	);
}
