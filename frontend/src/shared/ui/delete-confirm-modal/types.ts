import type { ReactNode } from 'react';

export interface DeleteConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title: string;
	description: string | ReactNode;
}
