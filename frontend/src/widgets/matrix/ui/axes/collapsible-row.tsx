import { forwardRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { BlockHeader } from '../header/block-header';
import { Button, CollapsibleContent, Collapsible } from '@ui';
import type { KanbanAxisPointProps } from './types';
import { cn } from '@lib';
import { SquareMinus, SquarePlus } from 'lucide-react';

export const CollapsibleKanbanRow = observer(
	forwardRef<HTMLDivElement, KanbanAxisPointProps>(
		({ item, children, className, }, ref) => {
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
							
							'text-cyan-500'
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
							'col-start-2 -col-end-1',
							'grid grid-cols-subgrid'
						)}>
						{children}
					</CollapsibleContent>
				</Collapsible>
			);
		}
	)
);
