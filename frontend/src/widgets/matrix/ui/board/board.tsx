import { forwardRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { cellConfig, cn, columnConfig, rowConfig } from '@lib';
import { GrabbingGrip } from '@ui';
import { BlockHeader } from '../header/block-header';

import type { KanbanBoardProps } from './types';
import { withDroppable } from '@/shared/hocs/with-droppable';
import { BoardCell } from '../cell/board-cell';
import { withSortable } from '@/shared';
import { KanbanColumn } from '../axes/kanban-column';
import { CollapsibleKanbanRow } from '../axes/collapsible-row';
import { useMatrixView } from '@/widgets/matrix/model/use-matrix-view';
import { AxesSelect } from '../menu/axes-select';
import { BlockHeaderMenu } from '../menu/block-header-menu';

const SortableBoardColumn = withSortable(KanbanColumn, columnConfig);
const SortableBoardRow = withSortable(CollapsibleKanbanRow, rowConfig);
const DroppableBoardCell = withDroppable(BoardCell, cellConfig);
const SortableColumnHeader = withSortable(BlockHeader, columnConfig);

export const Board = observer(
	forwardRef<HTMLDivElement, KanbanBoardProps>(
		(
			{
				board,
				children,
				className,
				colWidthPx = 200,
				handleRef,
				isDragging = false,
			},
			ref
		) => {
			const {
				columns,
				rows,
				isSingleCell,
				isOnlyColumns,
				swapAxes,
				setAxes,
				rowsAxisId,
				columnsAxisId,
			} = useMatrixView(board);

			const gridCols = columns.length || 1;

			useEffect(() => {
				const container = document.querySelector(
					`.board_${board.id}`
				) as HTMLDivElement;
				if (!container) return;
				container.style.setProperty('--col-width', `${colWidthPx}px`);
				container.style.setProperty('--grid-cols', `${gridCols}`);
				container.style.setProperty(
					'--grid-width',
					`${(gridCols + 1) * colWidthPx}px`
				);
			}, [colWidthPx, gridCols, board.id]);

			const renderCards = (...coords: string[]) =>
				board.getCardsByFeatures(...coords).map((card) => children(card));

			return (
				<section
					ref={ref}
					className={cn(
						'ring-foreground/10 bg-background flex flex-col content-start gap-1 rounded-lg p-2 ring',
						`board_${board.id}`,
						className
					)}>
					<BlockHeader
						block={board}
						headerTextTag='h2'

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

						actions={
							<BlockHeaderMenu
								onEdit={() => {}}
								onDelete={() => {}}
								blockTitle={board.title}
							/>
						}
					/>
					<AxesSelect
						axes={board.axes}
						columnsValue={columnsAxisId ?? ''}
						rowsValue={rowsAxisId ?? ''}
						onSwapAxes={swapAxes}
						onSetAxes={setAxes}
						className='flex w-full justify-end border-b p-2'
					/>
					{isSingleCell ? (
						<DroppableBoardCell id={`${board.id}`} className='h-full w-full'>
							{renderCards()}
						</DroppableBoardCell>
					) : (
						<div
							className={cn(
								'grid flex-1 auto-rows-max gap-y-1',
								rowsAxisId
									? 'grid-cols-[200px_repeat(var(--grid-cols),var(--col-width))]'
									: 'grid-cols-[repeat(var(--grid-cols),var(--col-width))]'
							)}>
							{isOnlyColumns ? (
								columns.map((column, index) => (
									<SortableBoardColumn
										key={column.id}
										id={column.id}
										index={index}
										className='flex-1 ring'
										item={column}>
										<DroppableBoardCell id={`${column.id}`} className='flex-1'>
											{renderCards(column.id)}
										</DroppableBoardCell>
									</SortableBoardColumn>
								))
							) : (
								<>
									{columns && <div />}
									{columns.map((column, index) => (
										<SortableColumnHeader
											index={index}
											id={column.id}
											key={column.id}
											block={column}
											headerTextTag='p'
											editable
										/>
									))}
									{rows.map((row, index) => (
										<SortableBoardRow
											key={row.id}
											id={row.id}
											index={index}
											item={row}
											className={cn(
												'col-span-full',
												columns.length > 0
													? 'grid grid-cols-subgrid'
													: 'flex flex-col'
											)}>
											{columns.length > 0 ? (
												columns.map((column) => (
													<DroppableBoardCell
														id={`${column.id}-${row.id}`}
														key={`${column.id}-${row.id}`}>
														{renderCards(column.id, row.id)}
													</DroppableBoardCell>
												))
											) : (
												<DroppableBoardCell id={`${row.id}`}>
													{renderCards(row.id)}
												</DroppableBoardCell>
											)}
										</SortableBoardRow>
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
