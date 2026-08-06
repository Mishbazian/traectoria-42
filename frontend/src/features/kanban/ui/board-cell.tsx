import type { ICell } from '@/entities';
import { CARD_TYPE, cn } from '@/shared';
import { KanbanCard } from '@/widgets/kanban/ui/kanban-card';
import { useDroppable } from '@dnd-kit/react';
import { observer } from 'mobx-react-lite';
import type { FC, HTMLAttributes, ReactNode } from 'react';

export interface BoardCellProps extends HTMLAttributes<HTMLDivElement> {
	cell: ICell;
	children?: ReactNode;
}
export const BoardCell: FC<BoardCellProps> = observer(
	({ cell, children, className, ...props }) => {
		const { isDropTarget, ref } = useDroppable({
			id: cell.id,
			accept: CARD_TYPE,
		});
		return (
			<div
				ref={ref}
				className={cn(
					'flex flex-col gap-2 p-2',
					isDropTarget && 'ring-primary'
				)}
				{...props}>
				{cell.data.map((task) => (
					<KanbanCard card={task} onCardClick={() => {}} key={task.id} />
				))}
			</div>
		);
	}
);
