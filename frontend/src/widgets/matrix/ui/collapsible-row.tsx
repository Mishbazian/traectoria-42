import { forwardRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from './block-header';
import { Button, CollapsibleContent, Collapsible } from '@ui';
import type { KanbanAxisProps } from './types';
import { cn } from '@lib';
import { SquareMinus, SquarePlus } from 'lucide-react';

export const CollapsibleKanbanRow = observer(
	forwardRef<HTMLDivElement, KanbanAxisProps>(
		(
			{ item, children, className, mode = 'column' },
			ref
		) => {
			const [isOpen, setIsOpen] = useState(false);

			return (
				<Collapsible
					ref={ref}
					className={cn(
						'bg-background rounded-lg ring ring-blue-200/30',
						className
					)}
					open={isOpen}>
					<BlockHeader
						block={item}
						headerTextTag='p'
						editable
						className={cn(
							mode === 'column' || !isOpen ? 'col-span-full' : '',
							'text-primary'
						)}
						prepend={
							<Button
								variant='ghost'
								className='text-current hover:text-current'
								size={'icon-lg'}
								onClick={() => setIsOpen((prev) => !prev)}>
								{isOpen ? <SquareMinus /> : <SquarePlus />}
							</Button>
						}
					/>

					<CollapsibleContent
						className={cn(
							mode === 'column' ? 'col-span-full' : 'col-start-2 -col-end-1',
							'grid grid-cols-subgrid'
						)}>
{children}
					</CollapsibleContent>
				</Collapsible>
			);
		}
	)
);
