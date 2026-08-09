import type { FC } from 'react';
import type { BlockPointProps } from './types';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from './block-header';
import {
	COLUMN_TYPE,
	columnConfig,
	GrabbingGrip,
	ROW_TYPE,
	rowConfig,
} from '@shared';
import { useSortable } from '@dnd-kit/react/sortable';

export const BlockPoint: FC<BlockPointProps> = observer(
	({ point, type, index, children, className }) => {
		const dndConfig =
			type === COLUMN_TYPE ? columnConfig : type === ROW_TYPE ? rowConfig : {};
		const { ref, isDragging, handleRef } = useSortable({
			id: point.id,
			index,
			...dndConfig
		});
		return (
			<div ref={ref} className={className}>
				<BlockHeader
					block={point}
					headerTextTag='p'
					editable
					prepend={
						<GrabbingGrip
							ref={handleRef}
							isGrabbing={isDragging}
							variant='vertical'
						/>
					}
				/>
				{children}
			</div>
		);
	}
);
