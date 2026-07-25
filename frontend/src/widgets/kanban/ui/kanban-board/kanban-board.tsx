import type { KanbanBoardProps } from './types';
import { forwardRef, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Plus } from 'lucide-react';
import { boardStore } from '@entities';
import { cn } from '@lib';
import { EditableTextBlock, GrabbingGrip, ScrollArea, ScrollBar } from '@ui';

export const KanbanBoard: FC<KanbanBoardProps> = observer(
	forwardRef<HTMLDivElement, KanbanBoardProps>(
		({ id, children, handleRef, isDragging = false, className }, ref) => {
			const board = boardStore.boardsMap[id];

			const handleHeaderUpdate = async (newTitle: string) => {
				await boardStore.updateBoard(id, { ...board, title: newTitle });
			};

			const handleAddColumn = async () => {
				await boardStore.addColumn(id);
			};

			return (
				<section
					ref={ref}
					className={cn(
						'ring-foreground/10 bg-background flex max-w-max flex-col rounded-lg ring-1',
						className
					)}>
					<EditableTextBlock
						as='h2'
						prepend={<GrabbingGrip ref={handleRef} isGrabbing={isDragging} />}
						item={boardStore.boardsMap[id]}
						onSave={handleHeaderUpdate}
						cancelByOutsideClick
					/>
					<ScrollArea className='*:data-[slot=scroll-area-viewport]:scroll-fade-x relative'>
						<div className='bg-background flex min-w-max flex-row items-stretch gap-1'>
							{children}
							<button
								type='button'
								onClick={handleAddColumn}
								className='hover:border-primary hover:bg-primary/5 dark:not-hover:text-muted hover:text-primary flex items-center justify-center rounded-lg border-2 border-dashed p-2 transition-all duration-200'>
								<Plus className='h-6 w-6' />
							</button>
						</div>
						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				</section>
			);
		}
	)
);
