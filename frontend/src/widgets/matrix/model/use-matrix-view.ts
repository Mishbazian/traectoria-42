import { useState } from 'react';
import type { IAxis, IBoard } from '@/entities';

/**
 * Хук управления отображением матрицы.
 * Вычисляет колонки/строки на основе выбранных осей. *
 */
export function useMatrixView(board: IBoard) {
	const [columnsAxisId, setColumnsAxisId] = useState<string | undefined>(
		board.axes[0]?.id
	);
	const [rowsAxisId, setRowsAxisId] = useState<string | undefined>(
		board.axes[1]?.id
	);

	const getAxisById = (id: string | undefined) =>
		board.axes.find((axis: IAxis) => axis.id === id);

	const columnsAxis = getAxisById(columnsAxisId);
	const rowsAxis = getAxisById(rowsAxisId);
	const columns = columnsAxis?.points ?? [];
	const rows = rowsAxis?.points ?? [];

	const isSingleCell = !columnsAxisId && !rowsAxisId;
	const isOnlyColumns = columnsAxisId && !rowsAxisId;

	const swapAxes = () => {
		const temp = columnsAxisId;
		setColumnsAxisId(rowsAxisId);
		setRowsAxisId(temp);
	};

	const setAxes = (ids: { columns?: string; rows?: string }) => {
		if ('columns' in ids) {
			setColumnsAxisId(ids.columns);
			if (rowsAxisId === ids.columns) setRowsAxisId(undefined);
		}
		if ('rows' in ids) {
			setRowsAxisId(ids.rows);
			if (columnsAxisId === ids.rows) setColumnsAxisId(undefined);
		}
	};

	return {
		columns,
		rows,
		isSingleCell,
		isOnlyColumns,
		swapAxes,
		setAxes,
		rowsAxisId,
		columnsAxisId,
	};
}
