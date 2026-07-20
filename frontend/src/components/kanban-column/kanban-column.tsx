import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import { EditableTextBlock } from '../ui/editable-text-block';
import { GrabbingGrip } from '../ui/grabbing-grip';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export const KanbanColumn = observer(
	({ id, ref, handleRef, children, isDragging = false }: KanbanColumnProps) => {
		const column = boardStore.columnsMap[id];

		const handleHeaderUpdate = async (newTitle: string) => {
			await boardStore.updateColumn(id, { ...column, title: newTitle });
		};
		const handleAddCard = () => {}; //@todo

		return (
			<section className='border w-sm rounded-xl' ref={ref}>
				<EditableTextBlock
					as='h3'
					className='border relative group/column_header'
					item={column}
					append={
						<GrabbingGrip
							ref={handleRef}
							isGrabbing={isDragging}
							className='w-full flex justify-end'
						/>
					}
					onSave={handleHeaderUpdate}
					cancelByOutsideClick
				/>
				<Button
					variant='secondary'
					size='icon-lg'
					onClick={handleAddCard}
					className='w-full bg-background/50 hover:bg-primary/10 hover:text-primary'>
					<Plus />
				</Button>
				<ScrollArea className=''>
					<div className='flex flex-col gap-2 p-2'>{children}</div>
					<ScrollBar />
				</ScrollArea>
			</section>
		);
	}
);
