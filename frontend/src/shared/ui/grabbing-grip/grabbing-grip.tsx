import { forwardRef } from 'react';
import type { GrabbingGripProps } from './types';
import { Grip, GripHorizontal, GripVertical } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
/**
 * Компонент для отображения иконки захвата (grip), используемой в drag-and-drop.
 * Поддерживает горизонтальные и вертикальные иконки, а также состояние "захвата".
 */
export const GrabbingGrip = forwardRef<HTMLSpanElement, GrabbingGripProps>(
	({ isGrabbing, variant = 'default', size = 16, className }, ref) => {
		const Icon =
			variant === 'horizontal'
				? GripHorizontal
				: variant === 'vertical'
					? GripVertical
					: Grip;
		return (
			<span
				ref={ref}
				className={cn(
					'mr-2 cursor-grab transition-colors duration-150',
					isGrabbing
						? 'cursor-grabbing text-gray-900 dark:text-gray-100'
						: 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300',
					className
				)}
				role='button'
				aria-label={
					isGrabbing ? 'Перетащить' : 'Нажмите и удерживайте, чтобы перетащить'
				}>
				<Icon size={size} />
			</span>
		);
	}
);
