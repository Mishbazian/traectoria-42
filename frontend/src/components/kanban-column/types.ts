export interface KanbanColumnProps<T extends { id: string }> {
	cards: T[];
	children: (item: T, index: number) => React.ReactNode;
	title: string;
	headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
