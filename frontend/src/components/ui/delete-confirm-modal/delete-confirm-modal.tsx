import { Trash2Icon } from 'lucide-react';
import { Button } from '../button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../dialog';
import type { FC, SubmitEvent } from 'react';
import type { DeleteConfirmModalProps } from './types';

export const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	description,
}) => {
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		console.log('submit');
		onSubmit();
	};
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader className='flex flex-col items-center'>
						<div className='w-fit p-2 rounded-lg bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
							<Trash2Icon size={24} />
						</div>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Отмена</Button>
						</DialogClose>
						<Button variant='destructive' type='submit'>
							Удалить
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
