import type { HTMLAttributes } from 'react';

export interface EditableTextBlockProps extends HTMLAttributes<HTMLDivElement> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	item: {
		title: string;
	};
	prepend?: React.ReactNode;
	append?: React.ReactNode;
	onSave: (newTitle: string) => void;
	onCancel?: () => void;
	cancelByOutsideClick?: boolean;
}
