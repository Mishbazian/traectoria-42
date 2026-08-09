import type { CardUser } from '@/entities/kanban';
type TaskInfo = {
	assignee?: CardUser;
	dueDate?: string | number;
};
export interface TaskKanbanCardInfoProps {
	info: TaskInfo;
}
