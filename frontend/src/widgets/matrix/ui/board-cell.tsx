import { cn } from '@lib';
import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import type { BoardCellProps } from './types';

export const BoardCell = observer(
	forwardRef<HTMLDivElement, BoardCellProps>(
		({ cell, children, className, isDropTarget, ...props }, ref) => {
			return (
				<div
					ref={ref}
					className={cn(
						'flex h-full flex-col gap-2 rounded-lg p-2',
						isDropTarget && 'bg-primary/20 border-primary border border-dashed'
					)}
					{...props}>
					{children}
				</div>
			);
		}
	)
);
