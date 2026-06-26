// src/components/task-card/types.ts
export interface KanbanCardProps {
  title: string
  description: string
  authorName: string
  authorAvatar?: string
  onDetailClick: () => void
}