import React from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';

type KanbanColumnInnerProps = KanbanColumnProps & {
	title: string;
	boardId: string;
	children: React.ReactNode;
};

/** Внутренний компонент без observer — useSortable изолирован от MobX */
const KanbanColumnInner = ({
	id,
	index,
	title,
	boardId,
	children,
}: KanbanColumnInnerProps) => {
	const { ref} = useSortable({
		id,
		index,
		type: 'column',
		accept: ['card', 'column'],
		modifiers: [RestrictToHorizontalAxis],
		group: boardId,
	});

	return (
		<section className='border-2' ref={ref}>
			<h2>{title}</h2>
			<ScrollArea className=''>
				<div className='flex flex-col gap-2 p-2'>{children}</div>
				<ScrollBar />
			</ScrollArea>
		</section>
	);
};

/** Внешний observer-компонент — читает данные из MobX и передает их во внутренний компонент */
export const KanbanColumn = observer(
	({ id, index, children }: KanbanColumnProps) => {
		const column = boardStore.columnsMap[id];

		return (
			<KanbanColumnInner
				id={id}
				index={index}
				title={column.title}
				boardId={column.boardId}>
				{children}
			</KanbanColumnInner>
		);
	}
);
