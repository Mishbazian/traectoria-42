import { cn } from '@lib';
import { Pen } from 'lucide-react';
import { forwardRef } from 'react';
import { Button } from '@ui';
import type { TextBlockBodyProps } from './types';

export const TextBlockBody = forwardRef<HTMLDivElement, TextBlockBodyProps>(
	(
		{ as: Tag = 'h2', blockTitle, className, editable = false, ...props },
		ref
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					'min-w-0',
					editable &&
						'group/editor hover:bg-accent flex items-center transition-colors',
					className
				)}
				{...props}>
				<Tag
					className={cn(
						'flex-1 truncate',
						'text-sm font-medium',
						'm-0 p-0 leading-normal text-inherit'
					)}
					tabIndex={0}
					title={editable ? 'Нажмите, чтобы отредактировать' : undefined}>
					{blockTitle}
				</Tag>

				{editable && (
					<Button
						variant='ghost'
						size='icon'
						className={cn(
							'ml-auto h-full shrink-0 opacity-0 transition-opacity group-hover/editor:opacity-100 focus:opacity-100'
						)}
						title='Редактировать'
						aria-label='Редактировать заголовок'>
						<Pen className='text-muted-foreground' />
					</Button>
				)}
			</div>
		);
	}
);
