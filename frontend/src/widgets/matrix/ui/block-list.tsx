import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import type { BlockListProps } from './types';
import { cn, COLUMN_TYPE, ROW_TYPE } from '@shared';
import { BlockPoint } from './block-point';
import { PointCellsList } from './point-cells-list';

export const BlockList: FC<BlockListProps> = observer(
	({ state, className, withCells, variant = 'cols' }) => {
		return (
			<div className={cn('', className)}>
				{state.points.map((point, index) => (
					<BlockPoint
						point={point}
						type={variant === 'cols' ? COLUMN_TYPE : ROW_TYPE}
						index={index}
						key={point.id}
						className={cn(
							variant === 'rows' &&
								'col-span-full grid grid-cols-subgrid items-start'
						)}>
						{withCells && <PointCellsList point={point} />}
					</BlockPoint>
				))}
			</div>
		);
	}
);
