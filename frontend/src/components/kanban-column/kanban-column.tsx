import { useDroppable } from '@dnd-kit/react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';

export function KanbanColumn<T extends { id: string }>({
	id,
	cards,
	children,
}: KanbanColumnProps<T>) {
	const { isDropTarget, ref } = useDroppable({
		id,
		type: 'column',
		accept: 'card',
		collisionPriority: CollisionPriority.Low,
	});
	const style = isDropTarget ? { background: '#00000030' } : undefined;
	return (
		<ScrollArea className='h-screen' ref={ref} style={style}>
			<ul className='flex flex-col gap-2 p-2'>
				{cards.map((card, index) => (
					<li key={card.id}>{children(card, index)}</li>
				))}
			</ul>
			<ScrollBar />
		</ScrollArea>
	);
}
