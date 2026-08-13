import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from './block-header';
import { GrabbingGrip } from '@ui';
import type { KanbanAxisProps } from './types';

export const KanbanAxis = observer(
	forwardRef<HTMLDivElement, KanbanAxisProps>(
		({ item, children, className, handleRef, isDragging = false }, ref) => {
			return (
				<div ref={ref} className={className}>
					<BlockHeader
						block={item}
						headerTextTag='p'
						editable
						prepend={
							handleRef && (
								<GrabbingGrip
									ref={handleRef}
									isGrabbing={isDragging}
									variant='vertical'
								/>
							)
						}
					/>
					{children}
				</div>
			);
		}
	)
);
