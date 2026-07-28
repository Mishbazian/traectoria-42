import { useDroppable } from '@dnd-kit/react';
import type { MatrixCellProps } from '../model/types';
import type { FC } from 'react';
import { cn } from '@lib';

export const MatrixCell: FC<MatrixCellProps> = ({ id, children }) => {
	const { isDropTarget, ref } = useDroppable({ id });
	return (
		<div
			ref={ref}
			className={cn('flex flex-col gap-2 p-2', isDropTarget && 'ring-primary')}>
			{children}
		</div>
	);
};
