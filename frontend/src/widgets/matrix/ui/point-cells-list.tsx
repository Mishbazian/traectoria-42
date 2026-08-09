import { observer } from 'mobx-react-lite';
import type { FC } from 'react';
import type { CellsListProps } from './types';
import { BoardCell } from './board-cell';

export const PointCellsList: FC<CellsListProps> = observer(({ point }) => {
	return (
		<>
			{point.cells.map((cell) => (
				<BoardCell cell={cell} key={cell.id} />
			))}
		</>
	);
});
