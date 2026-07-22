import type { User } from '@/state/types';
type TaskInfo = {
	assignee?: User;
	dueDate?: string | number;
};
export interface TaskKanbanCardInfoProps {
	info: TaskInfo;
}
