import { ScrollArea, ScrollBar } from '../../../shared/ui/scroll-area';
import type { KanbanColumnProps } from './types';
import { boardStore } from '@/state/board-store';
import { observer } from 'mobx-react-lite';
import { EditableTextBlock } from '@ui';
import { GrabbingGrip } from '../../../shared/ui/grabbing-grip';
import { Button } from '../../../shared/ui/button';
import { EllipsisVertical, PencilIcon, Plus, TrashIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../../shared/ui/dropdown-menu';
import { useState } from 'react';
import { DeleteConfirmModal } from '../../../shared/ui/delete-confirm-modal';

export const KanbanColumn = observer(
	({ id, ref, handleRef, children, isDragging = false }: KanbanColumnProps) => {
		const [isEdit, setIsEdit] = useState<boolean>(false);
		const [isTryToDelete, setIsTryToDelete] = useState<boolean>(false);

		const column = boardStore.columnsMap[id];
		if (!column) return null;

		const handleHeaderUpdate = async (newTitle: string) => {
			await boardStore.updateColumn(id, { ...column, title: newTitle });
		};

		const handleDeleteColumn = async () => {
			try {
				await boardStore.deleteColumn(id);
			} finally {
				setIsTryToDelete(false);
			}
		};

		const isDeleteAvailible: boolean = column.cards.length === 0;

		const handleAddCard = () => {}; //@todo
		return (
			<>
				<section className='w-sm rounded-xl border' ref={ref}>
					<EditableTextBlock
						as='h3'
						className='group/column_header relative border'
						item={column}
						prepend={
							<GrabbingGrip
								ref={handleRef}
								isGrabbing={isDragging}
								size={16}
								className=''
							/>
						}
						onSave={handleHeaderUpdate}
						cancelByOutsideClick
						isEdit={isEdit}
						append={
							<DropdownMenu>
								<DropdownMenuTrigger>
									<EllipsisVertical
										size={16}
										className='text-gray-400 hover:text-gray-700 dark:text-gray-500'
									/>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-fit' align='end'>
									<DropdownMenuItem onClick={() => setIsEdit(true)}>
										<PencilIcon />
										Редактировать
									</DropdownMenuItem>

									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem
											variant='destructive'
											onClick={() => setIsTryToDelete(true)}
											disabled={!isDeleteAvailible}>
											<TrashIcon />
											Удалить
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						}
					/>
					<Button
						variant='secondary'
						size='icon-lg'
						onClick={handleAddCard}
						className='bg-background/50 hover:bg-primary/10 hover:text-primary w-full'>
						<Plus />
					</Button>
					<ScrollArea className=''>
						<div className='flex flex-col gap-2 p-2'>{children}</div>
						<ScrollBar />
					</ScrollArea>
				</section>
				<DeleteConfirmModal
					title='Удалить колонку?'
					description={
						<>
							Вы действительно хотите удалить колонку{' '}
							<span className='text-accent-foreground'>{column.title}</span>?
							<br /> Это действие необратимо!
						</>
					}
					isOpen={isTryToDelete}
					onClose={() => setIsTryToDelete(false)}
					onSubmit={handleDeleteColumn}
				/>
			</>
		);
	}
);
