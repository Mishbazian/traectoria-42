import type { CardUser } from '@/state/types';
type TaskInfo = {
	assignee?: CardUser;
	dueDate?: string | number;
};
export interface TaskKanbanCardInfoProps {
	info: TaskInfo;
}
