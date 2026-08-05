import { Trash2, Trash2Icon } from 'lucide-react';
import {
    Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui';
import type { FC, SubmitEvent } from 'react';
import type { DeleteBlockControlProps } from './types';

export const DeleteBlockControl: FC<DeleteBlockControlProps> = ({
	isOpen,
	onOpenChange,
	onSubmit,
	disabled = false,
	blockTitle,
}) => {
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		onSubmit();
	};
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button
					variant={'destructive'}
					size={'icon'}
					title='Удалить'
					disabled={disabled}>
					<Trash2 />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader className='flex flex-col items-center'>
						<div className='bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive w-fit rounded-lg p-2'>
							<Trash2Icon size={24} />
						</div>
						<DialogTitle>{'Подтвердите удаление'}</DialogTitle>
						<DialogDescription>
							<>
								Вы действительно хотите удалить&nbsp;
								<span className='text-accent-foreground'>{blockTitle}</span>
								?
								<br /> Это действие необратимо!
							</>
						</DialogDescription>
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
