import { type FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RotateCwSquare } from 'lucide-react';
import { cn } from '@lib';
import { GrabbingGrip, Toggle } from '@ui';
import { BlockHeader } from './block-header';
import type { KanbanBoardProps } from './types';
import { useSortable } from '@dnd-kit/react/sortable';
import { BlockList } from './block-list';
import { BOARD_TYPE } from '@shared';

export const KanbanBoard: FC<KanbanBoardProps> = observer(
	({ board, index, className, colWidthPx }) => {
		const { ref, isDragging, handleRef } = useSortable({
			id: board.id,
			type: BOARD_TYPE,
			index,
			accept: BOARD_TYPE,
		});

		const [columns, rows] = board.axes;
		const handleRotate = () => board.reverseAxes();

		return (
			<section
				ref={ref}
				className={cn('ring-foreground/50 grid gap-1 p-2 grid-rows-[max-content]', className)}
				style={{
					gridColumn: `auto / span ${columns.points.length + 1}`,
					gridTemplateColumns: `repeat(${columns.points.length + 1},${colWidthPx}px)`,
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
						<Toggle onClick={handleRotate}>
							<RotateCwSquare />
						</Toggle>
					}
				/>
				<div className='col-span-full grid grid-cols-subgrid'>
					<div></div>
					<BlockList
						state={columns}
						className='col-[2/-1] grid grid-cols-subgrid'
					/>
				</div>
				<BlockList
					variant='rows'
					state={rows}
					className='col-span-full grid grid-cols-subgrid'
					withCells
				/>
			</section>
		);
	}
);
