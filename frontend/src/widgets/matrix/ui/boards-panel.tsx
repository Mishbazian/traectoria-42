import { observer } from 'mobx-react-lite';
import { Slider } from '@ui';
import {
	boardConfig,
	cardDragConfig,
	CELL,
	withSortable,
	CARD_TYPE,
	CELL_TYPE,
} from '@shared';
import { useState } from 'react';

import type { BoardPanelProps } from './types';
import type { ICard } from '@/entities';
import { withDraggable } from '@/shared/hocs/with-draggable';
import { TaskCard } from './card/task-card';
import { Board } from './board/board';
import { KanbanDndProvider } from './kanban-dnd-provider';

const Kanban = withSortable(Board, boardConfig);
const KanbanCard = withDraggable(TaskCard, cardDragConfig);

type BoardPanelWithCardProps = BoardPanelProps & {
	cardClick?: (card: ICard) => void;
};

export const BoardsPanel = observer(
	({ store, cardClick }: BoardPanelWithCardProps) => {
		const [cellWidth, setCellWidth] = useState<number>(CELL.width);

		return (
			<>
				<div className='mb-1'>
					<Slider
						value={[cellWidth]}
						min={200}
						max={500}
						step={10}
						className='mx-auto w-full max-w-xs'
						onValueChange={([v]) => setCellWidth(v)}
					/>
				</div>

				<div className='flex flex-wrap justify-center gap-2 p-2'>
					<KanbanDndProvider
						store={store}
						cardType={CARD_TYPE}
						cellType={CELL_TYPE}>
						{store.boards.map((board, index) => (
							<Kanban
								id={board.id}
								key={board.id}
								index={index}
								board={board}
								colWidthPx={cellWidth}>
								{(card: ICard) => (
									<KanbanCard
										key={card.id}
										id={card.id}
										card={card}
										onCardClick={() => cardClick?.(card)}
									/>
								)}
							</Kanban>
						))}
					</KanbanDndProvider>
				</div>
			</>
		);
	}
);
