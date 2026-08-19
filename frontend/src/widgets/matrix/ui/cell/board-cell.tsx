import { cn } from '@lib';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import type { BoardCellProps } from './types';

export const BoardCell = observer(
	forwardRef<HTMLDivElement, BoardCellProps>(
		({ children, className, isDropTarget, ...props }, ref) => {
			return (
				<div
					ref={ref}
					className={cn(
						'flex flex-col gap-2 rounded-lg p-2',
						isDropTarget && 'bg-primary/20 border-primary border border-dashed',
						className
					)}
					{...props}>
					{children}
				</div>
			);
		}
	)
);
