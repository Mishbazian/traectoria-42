import { forwardRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RotateCwSquare } from 'lucide-react';
import { cellConfig, cn, columnConfig, rowConfig } from '@lib';
import { GrabbingGrip, Separator, Toggle } from '@ui';
import { BlockHeader } from './block-header';
import type { KanbanBoardProps } from './types';
import { withSortable } from '@shared';
import { BoardCell } from './board-cell';
import { KanbanAxis } from './kanban-axis';
import type { ICell } from '@/entities';
import { withDroppable } from '@/shared/hocs/with-droppable';

// Перенесены за пределы компонента — не зависят от пропсов
const KanbanColumn = withSortable(KanbanAxis, columnConfig);
const KanbanRow = withSortable(KanbanAxis, rowConfig);
const KanbanCell = withDroppable(BoardCell, cellConfig);

export const KanbanBoard = observer(
	forwardRef<HTMLDivElement, KanbanBoardProps>(
		(
			{
				board,
				className,
				colWidthPx,
				getCellContent,
				handleRef,
				isDragging = false,
			},
			ref
		) => {
			const [mode, setMode] = useState<'table' | 'columns' | 'groups'>(
				'groups'
			);

			const renderBoardCell = (cell: ICell) => (
				<KanbanCell id={cell.id} cell={cell} key={cell.id}>
					{getCellContent(cell.id)}
				</KanbanCell>
			);
			const [columns, rows] = board.displayAxes;

			const isMultiRows = rows.points.length > 1;
			const isMultiColumns = columns.points.length > 1;
			const isSingleCell = !isMultiColumns && !isMultiRows;
			const gridCols =
				isMultiRows && mode === 'table'
					? columns.points.length + 1
					: columns.points.length;

			useEffect(() => {
				const container = document.querySelector(
					`.board_${board.id}`
				) as HTMLDivElement;
				if (!container) return;
				container.style.setProperty('--col-width', `${colWidthPx}px`);
				container.style.setProperty('--grid-cols', `${gridCols}`);
				container.style.setProperty(
					'--grid-width',
					`${gridCols * colWidthPx}px`
				);
			}, [colWidthPx, gridCols, board.id]);

			if (!columns) return null;
			return (
				<section
					ref={ref}
					className={cn(
						'ring-foreground/10 rounded-lg flex w-(--grid-width) flex-col content-start gap-1 px-2 ring',
						`board_${board.id}`,
						className
					)}>
					<BlockHeader
						block={board}
						headerTextTag='h2'
						className='max-w-full border-b'

						onUpdate={() => {}}
						editable
						prepend={
							handleRef && (
								<GrabbingGrip
									ref={handleRef}
									isGrabbing={isDragging}
									variant='vertical'
								/>
							)
						}
						append={
							(isMultiColumns || isMultiRows) && (
								<Toggle onClick={() => board.reverseAxes()}>
									<RotateCwSquare />
								</Toggle>
							)
						}
					/>
					{isSingleCell ? (
						renderBoardCell(board.cells[0])
					) : (
						<div className='grid flex-1 grid-cols-[repeat(var(--grid-cols),1fr)]'>
							<>
								{isMultiRows && mode === 'table' && <div />}
								{columns.points.map((column, i) => (
									<KanbanColumn
										key={column.id}
										id={column.id}
										index={i}
										item={column}>
										{!isMultiColumns
											? column.cells.map(renderBoardCell)
											: undefined}
									</KanbanColumn>
								))}
							</>
							{isMultiRows && (
								<>
									<Separator
										orientation='horizontal'
										className='col-span-full'
									/>
									{rows.points.map((row, i) => (
										<KanbanRow
											key={row.id}
											id={row.id}
											index={i}
											item={row}
											className='col-span-full grid grid-cols-subgrid'>
											{row.cells.map(renderBoardCell)}
										</KanbanRow>
									))}
								</>
							)}
						</div>
					)}
				</section>
			);
		}
	)
);
