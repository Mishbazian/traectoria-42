import { useState, forwardRef } from 'react';
import { Button } from '../button';
import { Pen } from 'lucide-react';

import type { EditableTextBlockProps } from './types';
import { InlineEditor } from '../../inline-editor';

export const EditableTextBlock = forwardRef<
	HTMLDivElement,
	EditableTextBlockProps
>(
	(
		{
			as: Tag = 'h2',
			item,
			prepend,
			append,
			onSubmit,
			onCancel,
			cancelByOutsideClick = false,
			...props
		},
		ref
	) => {
		const [isEditing, setIsEditing] = useState(false);

		const handleSave = (newTitle: string) => {
			onSubmit?.(newTitle);
			setIsEditing(false);
		};

		const handleClose = () => {
			onCancel?.();
			setIsEditing(false);
		};

		return (
			<div className='flex items-center gap-2 p-2 rounded w-full' ref={ref} {...props}>
				{!isEditing ? (
					<>
						{prepend && <>{prepend}</>}
						<div className='flex group/editor items-center h-full hover:bg-accent transition-colors rounded'>
							<Tag
								className='truncate px-2'
								tabIndex={0}
								onClick={() => setIsEditing(true)}
								title='Нажмите, чтобы отредактировать'>
								{item.title}
							</Tag>
							<Button
								variant='ghost'
								size='icon'
								onClick={() => {
									setIsEditing(true);
								}}
								className='h-full opacity-0 group-hover/editor:opacity-100 focus:opacity-100 transition-opacity'
								title='Редактировать'
								aria-label='Редактировать заголовок'>
								<Pen className='text-muted-foreground' />
							</Button>
						</div>
						{append && <>{append}</>}
					</>
				) : (
					<InlineEditor
						value={item.title}
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
