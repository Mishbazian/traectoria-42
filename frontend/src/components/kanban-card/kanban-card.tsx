import { memo } from 'react';
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
import { observer } from 'mobx-react-lite';
import { boardStore } from '@/state/board-store';
import type { User } from '@/state/types';

type KanbanCardInnerProps = KanbanCardProps & {
	title: string;
	description?: string;
	author: User;
};

/** Внутренний компонент без observer — useSortable изолирован от MobX */
const KanbanCardInner = memo(
	({
		id,
		onDetailClick,
		columnId,
		index,
		title,
		description,
		author,
	}: KanbanCardInnerProps) => {
		const { ref, isDragging } = useSortable({
			id,
			index,
			type: 'card',
			accept: 'card',
			group: columnId,
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
						{author.name}{' '}
						<Avatar className='size-6'>
							<AvatarImage src={author.avatar} />
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
);

/** Внешний observer-компонент — читает данные из MobX и передает их во внутренний компонент */
export const KanbanCard = observer((props: KanbanCardProps) => {
	const card = boardStore.cardsMap[props.id];

	return (
		<KanbanCardInner
			{...props}
			title={card.title}
			description={card.description}
			author={card.author}
		/>
	);
});
