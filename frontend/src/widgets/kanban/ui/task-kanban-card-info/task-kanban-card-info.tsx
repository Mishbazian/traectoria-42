import { observer } from 'mobx-react-lite';
import type { TaskKanbanCardInfoProps } from './types';
import { forwardRef } from 'react';
import { getFormattedDateString } from '@/shared/lib/date';
import { UserAvatar } from '../../../../shared/ui/user-avatar';

export const TaskKanbanCardInfo = observer(
	forwardRef<HTMLDivElement, TaskKanbanCardInfoProps>(({ info }, ref) => {
		const formattedDueDate = info.dueDate
			? getFormattedDateString(new Date(info.dueDate))
			: '';
		return (
			<div className='flex items-center justify-between' ref={ref}>
				{info.dueDate && (
					<span className='text-muted-foreground text-sm'>
						Срок: {formattedDueDate}
					</span>
				)}

				{info.assignee && <UserAvatar user={info.assignee} />}
			</div>
		);
	})
);
