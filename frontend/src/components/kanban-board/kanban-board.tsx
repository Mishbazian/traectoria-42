import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanBoardProps } from './types';
import { EditableTextBlock } from '../ui/editable-text-block';
import { forwardRef, useEffect, useRef, type FC } from 'react';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import { GrabbingGrip } from '../ui/grabbing-grip';
import { cn } from '@/lib/utils';

export const KanbanBoard: FC<KanbanBoardProps> = observer(
	forwardRef<HTMLDivElement, KanbanBoardProps>(
		({ id, children, handleRef, isDragging = false, className }, ref) => {
			const board = boardStore.boardsMap[id];

			const handleHeaderUpdate = async (newTitle: string) => {
				await boardStore.updateBoard(id, { ...board, title: newTitle });
			};

			const scrollArearef = useRef<HTMLDivElement | null>(null);

			useEffect(() => {
				if (scrollArearef.current) {
					const scrollViewport = scrollArearef.current.querySelector(
						'[data-slot="scroll-area-viewport"]'
					);
					scrollViewport?.classList.add('scroll-fade-x');
				}
			}, []);

			return (
				<section
					ref={ref}
					className={cn(
						'flex flex-col rounded-lg ring-1 ring-foreground/10 bg-background max-w-max',
						className
					)}>
					<EditableTextBlock
						as='h2'
						prepend={<GrabbingGrip ref={handleRef} isGrabbing={isDragging} />}
						item={boardStore.boardsMap[id]}
						onSave={handleHeaderUpdate}
						cancelByOutsideClick
					/>
					<ScrollArea className='relative bg-olive-300' ref={scrollArearef}>
						<div className='flex flex-row gap-1 min-w-max items-stretch bg-background'>
							{children}
						</div>
						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				</section>
			);
		}
	)
);
