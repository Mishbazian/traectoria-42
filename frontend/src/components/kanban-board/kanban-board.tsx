import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';

export function KanbanBoard<T extends { id: string }>({
	columns,
	children,
}: KanbanBoardProps<T>) {
	return (
		<ScrollArea className='w-screen max-h-dvh'>
			<ul className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
				{columns.map((column, index) => (
					<li key={column.id}>{children(column, index)}</li>
				))}
			</ul>
			<ScrollBar orientation='horizontal' />
		</ScrollArea>
	);
}
