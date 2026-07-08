export type User = {
  id: string
  name: string
  avatar?: string
}

export type Card = {
  id: string
  title: string
  description?: string
  author: User
  assignee?: User
  dueDate?: string
  tags?: string[]
  createdAt?: string
  updatedAt?: string
}

export type Column = {
  id: string
  title: string
  position: number
  cards: Card[]
}

export type Board = {
  id: string
  title: string
  columns: string[]
  createdAt?: string
  updatedAt?: string
}