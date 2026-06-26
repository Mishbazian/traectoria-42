export interface KanbanBoardProps<T extends { id: string }> {
	columns: T[];
	children: (item: T, index: number) => React.ReactNode;
}
