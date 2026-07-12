import React, { memo } from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { boardStore } from '@/state/board-store';

type KanbanBoardInnerProps = KanbanBoardProps & {
	title: string;
	children: React.ReactNode;
};

/** Внутренний компонент без observer — useSortable изолирован от MobX */
const KanbanBoardInner = memo(
	({ id, index, title, children }: KanbanBoardInnerProps) => {
		const { ref } = useSortable({
			id,
			index,
			type: 'board',
			collisionPriority: CollisionPriority.Lowest,
			accept: 'board',
		});

		return (
			<section ref={ref}>
				<div className='flex justify-between'>
					<h2>{title}</h2>
				</div>
				<ScrollArea className='w-full'>
					<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,calc(100%/4)))]'>
						{children}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</section>
		);
	}
);

/** Внешний компонент с локальными состояниями */
export const KanbanBoard = React.memo(
	({ id, index, children }: KanbanBoardProps) => {
		const { title } = React.useMemo(() => {
			const board = boardStore.boards.find((b) => b.id === id);
			return { title: board?.title ?? 'Untitled' };
		}, [id]);
		return (
			<KanbanBoardInner id={id} index={index} title={title}>
				{children}
			</KanbanBoardInner>
		);
	}
);
