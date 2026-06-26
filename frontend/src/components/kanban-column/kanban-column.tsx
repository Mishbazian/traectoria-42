import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';

export function KanbanColumn<T extends { id: string }>({
	title,
	headingLevel = 'h2',
	cards,
	children,
}: KanbanColumnProps<T>) {
	const HeadingTag = headingLevel;
	return (
		<div className='flex flex-col gap-2'>
			<HeadingTag className='font-medium text-lg'>{title}</HeadingTag>
			<ScrollArea className='h-screen'>
				<ul className='flex flex-col gap-2 p-1'>
					{cards.map((card, index) => (
						<li key={card.id}>{children(card, index)}</li>
					))}
				</ul>
				<ScrollBar />
			</ScrollArea>
		</div>
	);
}
