import { useCallback, type FC } from 'react';
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
import { cardDragConfig, cn } from '@lib';
import { useDraggable } from '@dnd-kit/react';

export const KanbanCard: FC<KanbanCardProps> = observer(
	({ card, onCardClick, className, info, footer, action }) => {
		const { isDragging, ref } = useDraggable({
			id: card.id,
			...cardDragConfig,
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
