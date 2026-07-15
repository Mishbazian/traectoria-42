import type { ElementType } from 'react';

// frontend/src/components/editable-header/types.ts
export interface EditableTextBlockProps {
	as?: ElementType; // e.g., 'h1', 'h2', 'p', 'span'
	item: {
		title: string;
	};
	prepend?: React.ReactNode;
	onSubmit: (newTitle: string) => void;
	onCancel?: () => void;
	cancelByOutsideClick?: boolean;
}
