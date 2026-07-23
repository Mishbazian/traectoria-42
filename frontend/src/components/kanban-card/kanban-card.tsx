import { forwardRef, useCallback } from 'react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card';
import type { KanbanCardProps } from './types';

import { observer } from 'mobx-react-lite';

import { cn } from '@/lib/utils';

export const KanbanCard = observer(
	forwardRef<HTMLDivElement, KanbanCardProps>(
		(
			{
				card,
				onCardClick,
				className,
				isDragging = false,
				info,
				footer,
				action,
			},
			ref
		) => {
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
						'group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary',
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
	)
);
