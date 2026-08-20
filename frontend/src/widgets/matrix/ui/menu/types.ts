import type { IAxis } from '@/entities';
import type { ClassAttributes, HTMLAttributes } from 'react';

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
type TSelectItem = {
	value: string;
	label: string;
};
export type SelectAndEraserProps = ClassAttributes<HTMLDivElement> &
	HTMLAttributes<HTMLDivElement> & {
		items: TSelectItem[];
		placeholder?: string;
		value: string;
		onValueChange: (value: string) => void;
		onErase: () => void;
	};

export type AxesSelectProps = {
	axes: IAxis[];
	columnsValue: string;
	rowsValue: string;
	onSwapAxes: () => void;
	onSetAxes: (ids: { columns?: string; rows?: string }) => void;
	className: string;
};
