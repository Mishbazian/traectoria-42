import type { HTMLAttributes, ReactNode } from 'react';

export type BoardCellProps = HTMLAttributes<HTMLDivElement> & {
	isDropTarget?: boolean;
	children?: ReactNode;
}
