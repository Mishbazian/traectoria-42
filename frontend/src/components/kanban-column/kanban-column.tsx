import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers';


export function KanbanColumn<T extends { id: string }>({
	id,
	title,
	cards,
	children,
	index,
	boardId,
}: KanbanColumnProps<T>) {
	const { ref } = useSortable({
		id,
		index,
		type: `column_${boardId}`,
		collisionPriority: CollisionPriority.Low,
		accept: ['card', `column_${boardId}`],
		modifiers: [RestrictToHorizontalAxis],
		group: boardId,
	});

	return (
		<section ref={ref} className='border-2'>
			<h2>{title}</h2>
			<ScrollArea className=''>
				<ul className='flex flex-col gap-2 p-2'>
					{cards.map((card, index) => (
						<li key={card.id}>{children(card, index)}</li>
					))}
				</ul>
				<ScrollBar />
			</ScrollArea>
		</section>
	);
}
