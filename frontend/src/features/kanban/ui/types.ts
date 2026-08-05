import type { HTMLAttributes, ReactNode } from 'react';
import type { BlockData } from '../model/types';

export type BlockType = 'board' | 'column' | 'row' | 'cell' | 'card';

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export interface TextBlockBodyProps extends HTMLAttributes<HTMLDivElement> {
	as?: TextTag;
	blockTitle: string;
	editable?: boolean;
}

export interface DeleteBlockControlProps {
	isOpen?: boolean;
	onOpenChange?: () => void;
	onSubmit: () => void;
	blockTitle: string;
	disabled?: boolean;
}

export interface BlockHeaderMenuProps {
	onDelete?: () => void;
	onEdit?: () => void;
	onPaint?: () => void;
	blockTitle: string;
}

export interface BlockHeaderProps extends HTMLAttributes<HTMLDivElement> {
	onUpdate?: (updated: Partial<BlockData>) => void;
	onDelete?: () => void;
	block: BlockData;
	headerTextTag: TextTag;
	editable: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
}
