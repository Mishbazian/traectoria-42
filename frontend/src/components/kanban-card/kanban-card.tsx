import { type FC } from 'react';
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

import { observer } from 'mobx-react-lite';
import { boardStore } from '@/state/board-store';

export const KanbanCard: FC<KanbanCardProps> = observer(
	({ id, onDetailClick, ref }) => {
		const card = boardStore.cardsMap[id];

		return (
			<Card ref={ref}>
				<CardHeader>
					<CardTitle>{card.title}</CardTitle>
					<CardDescription className='line-clamp-2'>
						{card.description}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex gap-1 items-center justify-end'>
						{card.author.name}{' '}
						<Avatar className='size-6'>
							<AvatarImage src={card.author.avatar} />
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
