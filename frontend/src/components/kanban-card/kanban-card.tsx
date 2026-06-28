import { HatGlasses } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import type { KanbanCardProps } from './types';
import { useSortable } from '@dnd-kit/react/sortable';

export function KanbanCard({
	id,
	title,
	description,
	authorName,
	authorAvatar,
	onDetailClick,
	column,
	index,
}: KanbanCardProps) {
	const { ref, isDragging } = useSortable({
		id,
		index,
		type: 'item',
		accept: 'item',
		group: column,
	});
	return (
		<Card ref={ref} data-dragging={isDragging}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription className='line-clamp-2'>
					{description}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='flex gap-1 items-center justify-end'>
					{authorName}{' '}
					<Avatar className='size-6'>
						<AvatarImage src={authorAvatar} />
						<AvatarFallback>
							<HatGlasses />
						</AvatarFallback>
					</Avatar>
				</div>
			</CardContent>
			<CardFooter>
				<Button className='w-full' onClick={onDetailClick}>
					Подробнее
				</Button>
			</CardFooter>
		</Card>
	);
}
