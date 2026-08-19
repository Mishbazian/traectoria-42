import type { IAxis } from "@/entities";
import type { ClassAttributes, HTMLAttributes } from "react";

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
