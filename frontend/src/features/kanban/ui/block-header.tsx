import { useState, forwardRef } from 'react';
import { InlineEditor } from '@ui';
import { cn } from '@/shared/lib';
import { BlockHeaderMenu } from './block-header-menu';
import type { BlockHeaderProps } from './types';
import type { BlockData } from '../model/types';
import { TextBlockBody } from './text-block-body';


export const BlockHeader = forwardRef<HTMLDivElement, BlockHeaderProps>(
	(
		{
			headerTextTag,
			block,
			editable = false,
			onUpdate,
			onDelete,
			className,
			prepend,
			append,
			...props
		},
		ref
	) => {
		const [isEditing, setIsEditing] = useState(false);

		const handleUpdate = (updated: Partial<BlockData>) => {
			onUpdate?.(updated);
			setIsEditing(false);
		};

		const handleClose = () => {
			setIsEditing(false);
		};

		const handleDelete = () => {
			onDelete?.();
		};

		return (
			<div
				className={cn('flex w-full items-center gap-2 py-2', className)}
				ref={ref}
				{...props}>
				{!isEditing ? (
					<>
						{prepend}
						<TextBlockBody
							blockTitle={block.title}
							editable={editable}
							onClick={() => setIsEditing(true)}
							as={headerTextTag}
						/>
						<div className='ml-auto'>
							{append}
							{editable && (
								<BlockHeaderMenu
									onDelete={handleDelete}
									onEdit={() => setIsEditing(true)}
									blockTitle={block.title ?? ''}
								/>
							)}
						</div>
					</>
				) : (
					<InlineEditor
						value={block.title}
						onSubmit={(newTitle: string) => handleUpdate({ title: newTitle })}
						onCancel={handleClose}
						placeholder='Введите заголовок'
						closeOnOutsideClick
						
					/>
				)}
			</div>
		);
	}
);

