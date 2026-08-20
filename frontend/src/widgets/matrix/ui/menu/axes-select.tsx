import { Toggle } from '@ui';
import { RotateCwSquare, X } from 'lucide-react';
import { SelectAndEraser } from './select-and-eraser';
import { cn } from '@/shared';
import type { AxesSelectProps } from './types';
import { forwardRef } from 'react';

export const AxesSelect = forwardRef<HTMLDivElement, AxesSelectProps>(
	(
		{ axes, columnsValue, rowsValue, onSwapAxes, onSetAxes, className },
		ref
	) => {
		const axesOptions = axes.map((axis) => ({
			value: axis.id,
			label: axis.name,
		}));

		const handleColumnChange = (value: string | undefined) => {
			onSetAxes({ columns: value });
		};

		const handleRowChange = (value: string | undefined) => {
			onSetAxes({ rows: value });
		};

		return (
			<div
				ref={ref}
				className={cn(
					'flex flex-wrap items-center justify-center gap-1',
					className
				)}>
				<SelectAndEraser
					value={columnsValue}
					items={axesOptions}
					onValueChange={handleColumnChange}
					onErase={() => onSetAxes({ columns: undefined })}
					placeholder='Выберите колонку'
					className='min-w-50'
				/>
				<X size={12} />
				<SelectAndEraser
					value={rowsValue}
					items={axesOptions}
					onValueChange={handleRowChange}
					onErase={() => onSetAxes({ rows: undefined })}
					placeholder='Выберите ряд'
					className='min-w-45'
				/>{' '}
				<Toggle
					onClick={onSwapAxes}
					aria-label='Поменять оси местами'
					disabled={!columnsValue && !rowsValue}>
					<RotateCwSquare className='size-4' />
				</Toggle>
			</div>
		);
	}
);
