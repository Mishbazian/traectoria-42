import type { ICell } from '@entities';
import { cellConfig, cn } from '@lib';
import { KanbanCard } from './kanban-card';
import { useDroppable } from '@dnd-kit/react';
import { observer } from 'mobx-react-lite';
import type { FC, HTMLAttributes, ReactNode } from 'react';
import { matrixBoardStore as store } from '@/entities';

export interface BoardCellProps extends HTMLAttributes<HTMLDivElement> {
	cell: ICell;
	children?: ReactNode;
}
export const BoardCell: FC<BoardCellProps> = observer(
	({ cell, children, className, ...props }) => {
		const { isDropTarget, ref } = useDroppable({
			id: cell.id,
			...cellConfig,
		});

		return (
			<div
				ref={ref}
				className={cn(
					'flex h-full flex-col gap-2 p-2',
					isDropTarget && 'bg-primary/30'
				)}
				{...props}>
				{store.cellCardsMap.get(cell.id)?.map((card, index) => (
					<KanbanCard
						card={card}
						index={index}
						cellId={cell.id}
						onCardClick={() => {}}
						key={card.id}
					/>
				))}
			</div>
		);
	}
);
