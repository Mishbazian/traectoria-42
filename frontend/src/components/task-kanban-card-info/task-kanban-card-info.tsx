import { observer } from 'mobx-react-lite';
import type { TaskKanbanCardInfoProps } from './types';
import { forwardRef } from 'react';
import { getFormattedDateString } from '@/lib/date';
import { UserAvatar } from '../ui/user-avatar';

export const TaskKanbanCardInfo = observer(
	forwardRef<HTMLDivElement, TaskKanbanCardInfoProps>(({ info }, ref) => {
		const formattedDueDate = info.dueDate
			? getFormattedDateString(new Date(info.dueDate))
			: '';
		return (
			<div className='flex justify-between items-center' ref={ref}>
				{info.dueDate && (
					<span className='text-sm text-muted-foreground'>
						Срок: {formattedDueDate}
					</span>
				)}

				{info.assignee && <UserAvatar user={info.assignee} />}
			</div>
		);
	})
);
