export interface KanbanColumnProps<T extends { id: string }> {
	id: string,
	cards: T[];
	children: (item: T, index: number) => React.ReactNode;
}
