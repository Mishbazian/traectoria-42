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

	const [columnOrder, setColumnOrder] = useState(() =>
		Object.keys(columnsState)
	);

	return (
		<>
			<DragDropProvider
				onDragOver={(event) => {
					const { source, target } = event.operation;

					if (source?.type === 'column') return;

					setColumnsState((items) => move(items, event));
				}}
				onDragEnd={(event) => {
					const { source, target } = event.operation;

					if (event.canceled || source?.type !== 'column') return;

					setColumnOrder((columns) => move(columns, event));
				}}>
				<ScrollArea className='w-screen max-h-dvh'>
					<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'>
						{columnOrder.map((id, index) => {
							const col = columns?.find((col) => col.id === id);
							return (
								<KanbanColumn
									key={id}
									id={id}
									title={col?.title ?? ''}
									cards={columnsState[id]}
									index={index}>
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
							);
						})}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</DragDropProvider>
		</>
	);
}
