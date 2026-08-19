import { useState, forwardRef } from 'react';
import { InlineEditor } from '@ui';
import { cn } from '@lib';
import type { BlockHeaderProps, BlockData } from './types';
import { TextBlockBody } from './text-block-body';
import { observer } from 'mobx-react-lite';

export const BlockHeader = observer(
	forwardRef<HTMLDivElement, BlockHeaderProps>(
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
				actions,
				...props
			},
			ref
		) => {
			const [isEditing, setIsEditing] = useState(false);

			const handleUpdate = (updated: Partial<BlockData>) => {
				block.update?.(updated);
				setIsEditing(false);
			};

			const handleClose = () => {
				setIsEditing(false);
			};

			return (
				<div
					className={cn(
						'ml-1 flex h-max w-full flex-wrap items-center justify-start gap-1 py-2',
						className
					)}
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
							<div className='ml-auto flex'>
								{append}
								{editable && actions}
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
	)
);
