import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { KanbanBoard } from '../kanban-board';
import { KanbanColumn } from '../kanban-column';
import { KanbanCard } from '../kanban-card';
import { DragDropProvider } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { boardStore } from '@/state/board-store';
import type { Board, Card, Column } from '@/state/types';
import { move } from '@dnd-kit/helpers';

// === Внутренний компонент с DragDropProvider (без observer) ===
interface KanbanContentDraggableProps {
	boards: typeof boardStore.boards;
	columnsByBoard: typeof boardStore.columnsByBoard;
	cardsByColumns: typeof boardStore.cardsByColumns;
	onMove: (props: {
		id: string;
		type: string;
		fromGroup?: string;
		toGroup?: string;
		fromIndex: number;
		toIndex: number;
	}) => void;
}

type DragOpsProps = {
	id: string;
	type: string;
	fromIndex: number;
	fromGroup?: string;
	toGroup?: string;
	toIndex: number;
};

export const KanbanContentDraggable = ({
	boards,
	columnsByBoard,
	cardsByColumns,
	onMove,
}: KanbanContentDraggableProps) => {
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
		await onMove({
			...props,
		});
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

				if (isSortable(source) && !event.canceled && dragStart) {
					const { id, group, index } = source;

					if (dragStart.id !== id.toString()) return;

					switch (source.type) {
						case 'column':
							setColumnsOrder((columnsOrder) => move(columnsOrder, event));
							break;
						case 'board':
							setBoardsOrder((boardsOrder) => move(boardsOrder, event));
							break;
						case 'card':
							if(!group) return;
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
					<KanbanBoard id={board.id} index={index} key={board.id}>
						{columnsOrder[board.id].map((c, i) => (
							<KanbanColumn key={c} id={c} index={i}>
								{cardsOrder[c].map((card, index) => (
									<KanbanCard
										key={card}
										id={card}
										onDetailClick={() => {}}
										index={index}
										columnId={c}
									/>
								))}
							</KanbanColumn>
						))}
					</KanbanBoard>
				))}
			</div>
		</DragDropProvider>
	);
};

// === Внешний observer-компонент ===
export const KanbanContent = observer(() => {
	useEffect(() => {
		boardStore.fetchBoardsData();
	}, []);
	const { boards, columnsByBoard, cardsByColumns } = boardStore;

	const handleMove = async ({
		id,
		type,
		fromGroup,
		toGroup,
		toIndex,
	}: {
		id: string;
		type: string;
		fromGroup?: string;
		toGroup?: string;
		toIndex: number;
	}) => {
		boardStore.moveItem({
			id,
			type,
			fromGroup,
			toGroup,
			toIndex,
		});
	};

	return (
		<KanbanContentDraggable
			boards={boards}
			columnsByBoard={columnsByBoard}
			cardsByColumns={cardsByColumns}
			onMove={handleMove}
		/>
	);
});
