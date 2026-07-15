import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import { GripVertical } from 'lucide-react';
import { EditableTextBlock } from '../editable-text-block';

/** Внутренний компонент без observer — useSortable изолирован от MobX */
export const KanbanColumn = observer(
	({ id, ref, handleRef, children }: KanbanColumnProps) => {
		const column = boardStore.columnsMap[id];

		const handleHeaderUpdate = async (newTitle: string) => {
			await boardStore.updateColumn(id, { ...column, title: newTitle });
		};

		return (
			<section className='border-2' ref={ref}>
				<EditableTextBlock
					item={column}
					prepend={
						<span ref={handleRef}>
							<GripVertical />
						</span>
					}
					onSubmit={handleHeaderUpdate}
					cancelByOutsideClick
				/>
				<ScrollArea className=''>
					<div className='flex flex-col gap-2 p-2'>{children}</div>
					<ScrollBar />
				</ScrollArea>
			</section>
		);
	}
);
