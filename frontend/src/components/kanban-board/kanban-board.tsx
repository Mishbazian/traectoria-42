import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { KanbanColumn } from '../kanban-column';
import { KanbanCard } from '../kanban-card';
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import type { Card } from '@/state/types';
import { useMemo, useState } from 'react';

export function KanbanBoard({ columns }: KanbanBoardProps) {
	const initialColumnState = useMemo(() => {
		const cols: Record<string, Card[]> = {};
		for (const col of columns) {
			cols[col.id] = [...col.cards];
		}
		return cols;
	}, [columns]);
	const [columnsState, setColumnsState] =
		useState<Record<string, Card[]>>(initialColumnState);

	return (
		<>
			<DragDropProvider
				onDragOver={(event) => {
					setColumnsState((prev) => move(prev, event));
				}}>
				<ScrollArea className='w-screen max-h-dvh'>
					<ul className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
						{columns.map(({ id, title }) => (
							<li key={id}>
								<h2>{title}</h2>
								<KanbanColumn id={id} cards={columnsState[id]}>
									{(card, index) => (
										<KanbanCard
											id={card.id}
											title={card.title}
											description={card.description}
											authorName={card.author.name ?? ''}
											authorAvatar={card.author.avatar ?? ''}
											onDetailClick={() => {}}
											index={index}
											columnId={id}
										/>
									)}
								</KanbanColumn>
							</li>
						))}
					</ul>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</DragDropProvider>
		</>
	);
}
