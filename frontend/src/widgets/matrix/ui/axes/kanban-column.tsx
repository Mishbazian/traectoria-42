import { forwardRef } from 'react';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from '../header/block-header';
import { GrabbingGrip } from '@ui';
import type { KanbanAxisPointProps } from './types';
import { cn } from '@lib';

export const KanbanColumn = observer(
	forwardRef<HTMLDivElement, KanbanAxisPointProps>(
		(
			{
				item,
				className,
				children,
				handleRef,
				isDragging = false,
			},
			ref
		) => {
			return (
				<div ref={ref} className={cn('flex flex-col', className)}>
					<BlockHeader
						block={item}
						headerTextTag='p'
						editable
						className={'col-span-full h-min'}
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
