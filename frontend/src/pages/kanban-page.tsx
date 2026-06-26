import { KanbanBoard } from '@/components/kanban-board';
import { KanbanCard } from '@/components/kanban-card';
import { KanbanColumn } from '@/components/kanban-column';
import { boardsAtom, loadBoardsAtom } from '@/state/board-store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const BOARDID = 'taskboard1';

export const KanbanPage = () => {
	const [_, loadBoards] = useAtom(loadBoardsAtom);
	const [boards] = useAtom(boardsAtom);

	useEffect(() => {
		loadBoards([BOARDID]);
	}, [loadBoards]);

	return (
		<div>
			{boards.map((board) => (
				<>
					<h2 key={board.id}>{board.title}</h2>
					<KanbanBoard columns={board.columns}>
						{(column) => (
							<KanbanColumn cards={column.cards} title={column.title}>
								{(card) => (
									<KanbanCard
										title={card.title}
										description={card.description}
										authorName={card.author.name}
										authorAvatar={card.author.avatar}
										onDetailClick={() => {}}
									/>
								)}
							</KanbanColumn>
						)}
					</KanbanBoard>
				</>
			))}
		</div>
	);
};
