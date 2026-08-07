import {  useCallback, type FC } from 'react';
import type { KanbanCardProps } from './types';
import { observer } from 'mobx-react-lite';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui';
import { cn } from '@lib';
import { useSortable } from '@dnd-kit/react/sortable';
import { cardConfig } from '@/shared';

export const KanbanCard: FC<KanbanCardProps> = observer(
	({ card, index, cellId, onCardClick, className, info, footer, action }) => {
		const { isDropTarget, isDragging, ref } = useSortable({
			id: card.id,
            index,
			group: cellId,
			...cardConfig,
			
		});
		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onCardClick?.();
				}
			},
			[onCardClick]
		);

		const handleCardClick = useCallback(() => {
			if (isDragging) return;
			onCardClick?.();
		}, [onCardClick, isDragging]);

		return (
			<Card
				ref={ref}
				className={cn(
					'group hover:ring-ring/30 dark:hover:ring-ring/50 cursor-pointer transition-all duration-200 hover:shadow-md hover:ring-1 dark:hover:shadow-lg dark:hover:ring-1',
					isDropTarget && 'ring-primary',
					className
				)}
				role='button'
				tabIndex={0}
				onKeyDown={handleKeyDown}
				onClick={handleCardClick}
				aria-label={`Открыть карточку: ${card.title}`}>
				<CardHeader>
					<CardTitle>{card.title}</CardTitle>
					{card.description && (
						<CardDescription>{card.description}</CardDescription>
					)}
					{action && <CardAction></CardAction>}
				</CardHeader>
				{info && <CardContent>{info}</CardContent>}
				{footer && <CardFooter>{footer}</CardFooter>}
			</Card>
		);
	}
);
