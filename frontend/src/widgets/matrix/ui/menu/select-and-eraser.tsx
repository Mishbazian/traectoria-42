import { cn } from '@/shared';
import { ButtonGroup } from '@/shared/ui/button-group';
import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui';
import { Eraser } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import type { SelectAndEraserProps } from './types';

export const SelectAndEraser = observer(
	({
		items,
		value,
		onValueChange,
		placeholder,
		onErase,
		className,
		...props
	}: SelectAndEraserProps) => {
		return (
			<ButtonGroup {...props} className={cn('flex', className)}>
				<Select
					value={value}

					onValueChange={onValueChange}>
					<SelectTrigger className='flex-1'>
						<SelectValue placeholder={placeholder ?? 'Не выбрано'} />
					</SelectTrigger>
					<SelectContent position={'popper'}>
						{items.map((item) => (
							<SelectItem key={item.value} value={item.value}>
								{item.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					type='button'
					variant={'outline'}
					onClick={onErase}
					disabled={!value}>
					<Eraser />
				</Button>
			</ButtonGroup>
		);
	}
);
