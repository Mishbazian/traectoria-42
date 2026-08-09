import { EllipsisVertical, PaintbrushVertical, Pencil } from 'lucide-react';

import { forwardRef } from 'react';
import type { BlockHeaderMenuProps } from './types';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@ui';
import { ButtonGroup } from '@ui/button-group';
import { DeleteBlockControl } from './delete-block-control';

export const BlockHeaderMenu = forwardRef<
	HTMLButtonElement,
	BlockHeaderMenuProps
>(({ onEdit, onDelete, onPaint, blockTitle }, ref) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'ghost'} ref={ref}>
					<EllipsisVertical />
				</Button>
			</PopoverTrigger>
			<PopoverContent side='left' className='w-max p-0'>
				<ButtonGroup>
					{onDelete && (
						<DeleteBlockControl onSubmit={onDelete} blockTitle={blockTitle} />
					)}
					{onPaint && (
						<Button variant={'ghost'} size={'icon'}>
							<PaintbrushVertical />
						</Button>
					)}
					{onEdit && (
						<Button variant={'ghost'} size={'icon'} onClick={onEdit} autoFocus>
							<Pencil />
						</Button>
					)}
				</ButtonGroup>
			</PopoverContent>
		</Popover>
	);
});
