import { useState, forwardRef, useEffect } from 'react';
import { Button } from '../button';
import { Pen } from 'lucide-react';

import type { EditableTextBlockProps } from './types';
import { InlineEditor } from '../inline-editor';
import { cn } from '@lib';

export const EditableTextBlock = forwardRef<
	HTMLDivElement,
	EditableTextBlockProps
>(
	(
		{
			as: Tag = 'h2',
			title,
			prepend,
			append,
			onSave,
			onCancel,
			isEdit: isEditProp,
			cancelByOutsideClick = false,
			className,
			...props
		},
		ref
	) => {
		const [isEditing, setIsEditing] = useState(false);

		const handleSave = (newTitle: string) => {
			onSave?.(newTitle);
			setIsEditing(false);
		};

		const handleClose = () => {
			onCancel?.();
			setIsEditing(false);
		};

		useEffect(() => {
			if (isEditProp !== undefined) {
				setIsEditing(isEditProp);
			}
		}, [isEditProp]);

		return (
			<div
				className={cn('flex w-full items-center gap-2 rounded p-2', className)}
				ref={ref}
				{...props}>
				{!isEditing ? (
					<>
						{prepend && <>{prepend}</>}
						<div className='group/editor hover:bg-accent flex h-full items-center rounded transition-colors'>
							<Tag
								className='truncate px-2'
								tabIndex={0}
								onClick={() => setIsEditing(true)}
								title='Нажмите, чтобы отредактировать'>
								{title}
							</Tag>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => {
									setIsEditing(true);
								}}
								className='h-full opacity-0 transition-opacity group-hover/editor:opacity-100 focus:opacity-100'
								title='Редактировать'
								aria-label='Редактировать заголовок'>
								<Pen className='text-muted-foreground' />
							</Button>
						</div>
						{append && (
							<div className='flex w-full justify-end gap-1'>{append}</div>
						)}
					</>
				) : (
					<InlineEditor
						value={title ?? ''}
						onSubmit={handleSave}
						onCancel={handleClose}
						placeholder='Введите заголовок'
						closeOnOutsideClick={cancelByOutsideClick}
					/>
				)}
			</div>
		);
	}
);
