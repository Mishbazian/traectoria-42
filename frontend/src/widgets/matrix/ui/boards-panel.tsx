import { observer } from 'mobx-react-lite';
import { Slider } from '@ui';
import { CARD_TYPE, CELL, CELL_TYPE } from '@shared';
import { useState } from 'react';
import { KanbanBoard } from './kanban-board';
import type { BoardPanelProps } from './types';
import { KanbanDndProvider } from './kanban-dnd-provider';

export const BoardsPanel = observer(({ store }: BoardPanelProps) => {
	const [cellWidth, setCellWidht] = useState<number>(CELL.width);

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

			<div
				className='mx-auto my-0 grid max-w-full content-start items-start gap-2 p-1'
				style={{
					gridTemplateColumns: `repeat(auto-fill,${cellWidth}px)`,
				}}>
				<KanbanDndProvider
					moveCard={store.moveCard}
					cardType={CARD_TYPE}
					cellType={CELL_TYPE}>
					{store.boards.map((board, index) => (
						<KanbanBoard
							id={board.id}
							key={board.id}
							index={index}
							board={board}
							colWidthPx={cellWidth}
						/>
					))}
				</KanbanDndProvider>
			</div>
		</>
	);
});
