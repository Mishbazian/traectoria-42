import type { HTMLAttributes, ReactNode } from 'react';

export interface BoardCellProps extends HTMLAttributes<HTMLDivElement> {
	isDropTarget?: boolean;
	children?: ReactNode;
}
