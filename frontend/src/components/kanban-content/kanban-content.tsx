import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { KanbanBoard } from '../kanban-board';
import { KanbanColumn } from '../kanban-column';
import { KanbanCard } from '../kanban-card';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable, type UseSortableInput } from '@dnd-kit/react/sortable';
import { boardStore } from '@/state/board-store';
import type { Board, Card, Column } from '@/state/types';
import { move } from '@dnd-kit/helpers';
import { withSortable } from '@/hocs/with-sortable-hoc';
import { CollisionPriority } from '@dnd-kit/abstract';
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers';

type DragOpsProps = {
	id: string;
	type: string;
	fromIndex: number;
	fromGroup?: string;
	toGroup?: string;
	toIndex: number;
};

const BOARD_TYPE = 'board';
const COLUMN_TYPE = 'column';
const CARD_TYPE = 'card';

const SortableBoard = withSortable(KanbanBoard);
const boardSortableProps: Omit<Partial<UseSortableInput>, 'id' | 'index'> = {
	type: BOARD_TYPE,
	accept: BOARD_TYPE,
	collisionPriority: CollisionPriority.Lowest,
} as const;

const SortableColumn = withSortable(KanbanColumn);
const columnSortableProps: Omit<Partial<UseSortableInput>, 'id' | 'index'> = {
	type: COLUMN_TYPE,
	accept: [CARD_TYPE, COLUMN_TYPE],
	modifiers: [RestrictToHorizontalAxis],
} as const;

export const KanbanContent = observer(() => {
	useEffect(() => {
		boardStore.fetchBoardsData();
	}, []);
	const { boards, columnsByBoard, cardsByColumns } = boardStore;

	const [boardsOrder, setBoardsOrder] = useState<Board[]>(boards ?? []);
	const [columnsOrder, setColumnsOrder] = useState<
		Record<string, Column['id'][]>
	>(columnsByBoard ?? null);
	const [cardsOrder, setCardsOrder] = useState<Record<string, Card['id'][]>>(
		cardsByColumns ?? null
	);

	const [dragStart, setDragStart] = useState<Omit<
		DragOpsProps,
		'toGroup' | 'toIndex'
	> | null>(null);

	useEffect(() => {
		setBoardsOrder(boards);
		setColumnsOrder(columnsByBoard);
		setCardsOrder(cardsByColumns);
	}, [boards, columnsByBoard, cardsByColumns]);

	const handleMove = async (props: DragOpsProps) => {
		if (props.fromIndex === props.toIndex && props.fromGroup === props.toGroup)
			return;
		const success = await boardStore.moveItem({
			...props,
		});
		//rollback
		if (!success) {
			setBoardsOrder(boards);
			setColumnsOrder(columnsByBoard);
			setCardsOrder(cardsByColumns);
		}
	};

	return (
		<DragDropProvider
			onDragStart={(event) => {
				const { source } = event.operation;
				if (isSortable(source) && source.type) {
					const { id, type, initialGroup, initialIndex } = source;
					if (!initialGroup) return;
					setDragStart({
						id: id.toString(),
						type: type.toString(),
						fromIndex: initialIndex,
						fromGroup: initialGroup?.toString(),
					});
				}
			}}
			onDragOver={(event) => {
				const { source } = event.operation;
				if (source && source.type === 'card') {
					setCardsOrder((items) => move(items, event));
				}
			}}
			onDragEnd={(event) => {
				const { source } = event.operation;

				if (
					!event.canceled &&
					isSortable(source) &&
					dragStart &&
					dragStart.id === source.id.toString()
				) {
					const { group, index } = source;

					switch (source.type) {
						case 'column':
							setColumnsOrder((columnsOrder) => move(columnsOrder, event));
							break;
						case 'board':
							setBoardsOrder((boardsOrder) => move(boardsOrder, event));
							break;
						case 'card':
							if (!group) return;
							break;
						default:
							return;
					}

					handleMove({
						...dragStart,
						toIndex: index,
						toGroup: group?.toString(),
					});
				}
			}}>
			<div className='p-4'>
				{boardsOrder.map((board, index) => (
					<SortableBoard
						id={board.id}
						index={index}
						key={board.id}
						{...boardSortableProps}>
						{columnsOrder[board.id].map((c, i) => (
							<SortableColumn
								key={c}
								id={c}
								index={i}
								group={board.id}
								{...columnSortableProps}>
								{cardsOrder[c].map((card, index) => (
									<KanbanCard
										key={card}
										id={card}
										onDetailClick={() => {}}
										index={index}
										columnId={c}
									/>
								))}
							</SortableColumn>
						))}
					</SortableBoard>
				))}
			</div>
		</DragDropProvider>
	);
});
