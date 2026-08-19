import type { IAxisPoint, IBoard } from '@/entities';
import type { HTMLAttributes, ReactNode } from 'react';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TextBlockBodyProps extends HTMLAttributes<HTMLDivElement> {
	as?: TextTag;
	blockTitle: string;
	editable?: boolean;
}

export type BlockData = {
	id: string;
	bgColor?: string;
	title: string;
};
export interface BlockHeaderProps extends HTMLAttributes<HTMLDivElement> {
	onUpdate?: (updated: Partial<BlockData>) => void;
	onDelete?: () => void;
	block:
		| IAxisPoint
		| (IBoard & {
				update?: (data: Partial<BlockData>) => void;
				delete?: () => void;
		  });
	headerTextTag: TextTag;
	editable: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
	actions?: ReactNode;
}
