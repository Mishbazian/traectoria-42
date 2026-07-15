// frontend/src/components/editable-header/editable-header.tsx
import { useState, type FC } from 'react';
import { Button } from '../ui/button';
import { Pen } from 'lucide-react';

import type { EditableTextBlockProps } from './types';
import { InlineEditor } from '../inline-editor';

export const EditableTextBlock: FC<EditableTextBlockProps> = ({
	as: Tag = 'h2',
	item,
	prepend,
	onSubmit,
	onCancel,
	cancelByOutsideClick = false,
}) => {
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
		<div className='flex items-center gap-2 p-1 rounded'>
			{!isEditing ? (
				<>
					{prepend && <>{prepend}</>}
					<div className='flex gap-2 group items-center h-full hover:bg-accent transition-colors rounded'>
						<Tag
							className='font-medium text-base truncate text-foreground flex-1'
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
							className='h-5 w-5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity'
							title='Редактировать'
							aria-label='Редактировать заголовок'>
							<Pen size={14} />
						</Button>
					</div>
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
};
