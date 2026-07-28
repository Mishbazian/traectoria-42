import type { FC, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import type { TBoard, TTask } from '../../../entities/matrix-panel/types';
import { EditableTextBlock } from '@ui';
import { getCellId } from '../../../entities/matrix-panel/matrix-board-store';
import { KanbanCard } from '../../kanban/ui/kanban-card';
import { cn } from '@lib';
import { CELL } from '@constants';

// eslint-disable-next-line react-refresh/only-export-components
const MatrixCell = ({ children }: { children?: ReactNode }) => {
	return <div className='flex flex-col gap-2 p-2'>{children}</div>;
};

type MatrixProps = {
	store: {
		boards: TBoard[];
		cellsDataMap: Map<string, TTask[]>;
	};
};

export const MatrixPanel: FC<MatrixProps> = observer(({ store }) => {
	return (
		<div className='mx-auto my-0 grid w-max max-w-3/4 grid-flow-col grid-cols-[repeat(auto-fill,minmax(fit-content,1fr))] gap-2'>
			{store.boards.map((board) => (
				<section className='p-2'>
					<EditableTextBlock
						as='h2'
						title={board.title}
						onSave={() => {}}
						cancelByOutsideClick
						className='bg-accent'
					/>
					<div
						className='relative col-span-full grid gap-2 p-2 h-full'
						style={{
							gridTemplateColumns: `repeat(${board.columns.length},${CELL.width})`,
						}}>
						{board.columns.length > 1 &&
							board.columns.map((c) => (
								<EditableTextBlock
									as='h3'
									title={c.title}
									onSave={() => {}}
									cancelByOutsideClick
									className=''
									key={c.id}
									id={c.id}
								/>
							))}

						{board.rows.map((r) => (
							<>
								<div
									className={cn(
										'col-span-full grid grid-cols-subgrid rounded-lg',
										board.rows.length > 1 && 'ring'
									)}>
									{board.rows.length > 1 && (
										<EditableTextBlock
											as='h3'
											title={r.title}
											onSave={() => {}}
											cancelByOutsideClick
											className='col-span-full mt-3 rounded-none rounded-t-lg'
										/>
									)}
									{board.columns.map((c) => {
										const cellId = getCellId(board.id, c.id, r.id);
										const taskList = store.cellsDataMap.get(cellId);
										return (
											<MatrixCell key={cellId}>
												{taskList &&
													taskList?.map((t) => (
														<KanbanCard card={t} onCardClick={() => {}} />
													))}
											</MatrixCell>
										);
									})}
								</div>
							</>
						))}

						<div
							className={cn('bg-accent absolute inset-0 -z-20 grid gap-2 p-2')}
							style={{
								gridTemplateColumns: `repeat(${board.columns.length},${CELL.width})`,
							}}>
							{board.columns.length > 1 &&
								board.columns.map((c) => (
									<div
										className='bg-border rounded-lg'
										key={`overlay_${c.id}`}></div>
								))}
						</div>
					</div>
				</section>
			))}
		</div>
	);
});
