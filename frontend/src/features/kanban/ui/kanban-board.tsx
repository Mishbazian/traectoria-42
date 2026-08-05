import { forwardRef, useState, type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Plus, RotateCwSquare } from 'lucide-react';
import { cn } from '@lib';
import { GrabbingGrip, Toggle } from '@ui';
import { BlockHeader } from '@/features/kanban/ui/block-header';
import type { KanbanBoardProps } from './types';
import { useSortable } from '@dnd-kit/react/sortable';

export const KanbanBoard: FC<KanbanBoardProps> = observer(
	forwardRef<HTMLDivElement, KanbanBoardProps>(
		({ board, index, children, className, colWidthPx }, ref) => {
			const { isDragging, handleRef } = useSortable({
				id: board.id,
				index,
			});

			const [isRotated, setIsRotated] = useState<boolean>(false);
			const [_, columns] = isRotated ? [board.y, board.x] : [board.x, board.y];
			return (
				<section
					ref={ref}
					className={cn('ring-foreground/50 grid gap-1', className)}
					style={{
						gridColumn: `auto / span ${columns.length}`,
						gridTemplateColumns: `repeat(${columns.length},${colWidthPx}px)`,
					}}>
					<BlockHeader
						block={board}
						headerTextTag='h2'
						className='col-span-full ring-1'
						onUpdate={() => {}}
						editable
						prepend={
							<GrabbingGrip
								ref={handleRef}
								isGrabbing={isDragging}
								variant='vertical'
							/>
						}
						append={
							<Toggle onClick={() => setIsRotated((prev) => !prev)}>
								<RotateCwSquare />
							</Toggle>
						}
					/>
					{children}
					<button
						type='button'
						onClick={() => {}}
						className='hover:border-primary hover:bg-primary/5 dark:not-hover:text-muted hover:text-primary flex items-center justify-center rounded-lg border-2 border-dashed p-2 transition-all duration-200'>
						<Plus className='h-6 w-6' />
					</button>
				</section>
			);
		}
	)
);
