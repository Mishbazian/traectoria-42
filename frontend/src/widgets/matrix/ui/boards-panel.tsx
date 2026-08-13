import { observer } from 'mobx-react-lite';
import { Slider } from '@ui';
import {
	boardConfig,
	CARD_TYPE,
	cardDragConfig,
	CELL,
	CELL_TYPE,
	withSortable,
} from '@shared';
import { useState } from 'react';
import { KanbanBoard } from './kanban-board';
import type { BoardPanelProps } from './types';
import { KanbanDndProvider } from './kanban-dnd-provider';
import { KanbanCard } from './kanban-card';
import { withDraggable } from '@/shared/hocs/with-draggable';

const Kanban = withSortable(KanbanBoard, boardConfig);
const Card = withDraggable(KanbanCard, cardDragConfig);
export const BoardsPanel = observer(({ store }: BoardPanelProps) => {
	const [cellWidth, setCellWidht] = useState<number>(CELL.width);

	const renderCellContent = (cellId: string) => {
		const cards = store.cellCardsMap.get(cellId);
		if (!cards?.length) return null;

		return cards.map((card) => (
			<Card
				id={card.id}
				key={card.id}
				card={card}
				onCardClick={() => {}} // TODO: реализовать
			/>
		));
	};

	return (
		<>
			<div className='mb-1'>
				<Slider
					value={[cellWidth]}
					min={200}
					max={500}
					step={10}
					className='mx-auto w-full max-w-xs'
					onValueChange={([v]) => {
						setCellWidht(v);
					}}
				/>
			</div>

			<div className='grid grid-flow-col justify-center gap-2 p-2'>
				<KanbanDndProvider
					moveCard={store.moveCard}
					cardType={CARD_TYPE}
					cellType={CELL_TYPE}>
					{store.boards.map((board, index) => (
						<Kanban
							id={board.id}
							key={board.id}
							index={index}
							board={board}
							colWidthPx={cellWidth}
							getCellContent={renderCellContent}
						/>
					))}
				</KanbanDndProvider>
			</div>
		</>
	);
});
