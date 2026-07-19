import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { EditableTextBlock } from '../ui/editable-text-block';
import { type FC } from 'react';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import { GrabbingGrip } from '../ui/grabbing-grip';
import { cn } from '@/lib/utils';

export const KanbanBoard: FC<KanbanBoardProps> = observer(
	({ id, children, ref, handleRef, isDragging = false, className }) => {
		const board = boardStore.boardsMap[id];

		const handleHeaderUpdate = async (newTitle: string) => {
			await boardStore.updateBoard(id, { ...board, title: newTitle });
		};

		return (
			<section
				ref={ref}
				className={cn(
					'flex flex-col rounded-lg ring-1 ring-foreground/10',
					className
				)}>
				<EditableTextBlock
					as='h2'
					prepend={<GrabbingGrip ref={handleRef} isGrabbing={isDragging} />}
					item={boardStore.boardsMap[id]}
					onSubmit={handleHeaderUpdate}
					cancelByOutsideClick
				/>
				<ScrollArea className='w-full'>
					<div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-flow-col'>
						{children}
					</div>
					<ScrollBar orientation='horizontal' />
				</ScrollArea>
			</section>
		);
	}
);
