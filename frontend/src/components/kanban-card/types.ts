// src/components/task-card/types.ts
export interface KanbanCardProps {
  id: string;
  title: string
  description?: string
  authorName?: string
  authorAvatar?: string
  onDetailClick: () => void
  column: string;
  index: number;
}