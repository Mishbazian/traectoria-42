import type { FC } from 'react';
import type { BlockPointProps } from './types';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from './block-header';
import { GrabbingGrip } from '@/shared';
import { useSortable } from '@dnd-kit/react/sortable';

export const BlockPoint: FC<BlockPointProps> = observer(
	({ point, index, children, className }) => {
		const { ref, isDragging, handleRef } = useSortable({
			id: point.id,
			index,
			group: point.axis,
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
