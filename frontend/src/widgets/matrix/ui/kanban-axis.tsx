import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from './block-header';
import { GrabbingGrip } from '@ui';
import type { KanbanAxisProps } from './types';
import { cn } from '@lib';

export const KanbanAxis = observer(
	forwardRef<HTMLDivElement, KanbanAxisProps>(
		({ item, children, className, mode='column', handleRef, isDragging = false }, ref) => {
			return (
				<div ref={ref} className={className}>
					<BlockHeader
						block={item}
						headerTextTag='p'
						editable
						className={cn(mode ==='column' && 'col-span-full')}
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
