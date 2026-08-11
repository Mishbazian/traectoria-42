import { makeAutoObservable } from 'mobx';
import type { IAxis, ICell, IBoard, TAxisId, IAxisPoint } from './types';
import type { MatrixBoardDTO } from '@/shared/api/types';
import { BoardAxis } from './board-axis';
import { BoardAxisPoint } from './board-axis-point';

export class Board implements IBoard {
	readonly id: string;
	title: string;
	/** Имеющиеся оси */
	axes: IAxis[] = [];
	/** Выбранные оси для отображения матрицы */
	xAxis: string; //@todo
	yAxis: string; //@todo
	isRotated: boolean = false;

	constructor(
		dto: MatrixBoardDTO,
		private _onDelete: () => void
	) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = dto.id;
		this.title = dto.title;

		// Загружаем оси — каждая несёт свои точки
		for (const axisDto of dto.axes) {
			this.initAxis(axisDto);
		}
		// Автоматически выбираем первые 2 оси для отображения
		this.xAxis = this.axes[0]?.id ?? ''; //@todo
		this.yAxis = this.axes[1]?.id ?? ''; //@todo
	}

	/** Инициализация одной оси из DTO */
	initAxis({ id, name, points }: MatrixBoardDTO['axes'][number]) {
		this.axes.push(
			new BoardAxis({
				id,
				name,
				axisPoints: points.map(
					(point) =>
						new BoardAxisPoint(point.id, id, point.title, () =>
							this.cells.filter(
								(cell) => cell.x === point.id || cell.y === point.id
							)
						)
				),
			})
		);
	}

	/** Получить оси для отображения */
	get displayAxes(): IAxis[] {
		if (!this.xAxis || !this.yAxis) return [];
		const axisX = this.axesMap[this.isRotated ? this.xAxis : this.yAxis];
		const axisY = this.axesMap[this.isRotated ? this.yAxis : this.xAxis];
		return [axisX, axisY].filter((a): a is BoardAxis => a != null);
	}

	/** Геттер: маппинг id → Axis (вычисляется на лету) */
	get axesMap(): Record<TAxisId, IAxis> {
		const map: Record<string, IAxis> = {};
		for (const axis of this.axes) {
			map[axis.id] = axis;
		}
		return map as Record<TAxisId, IAxis>;
	}

	get pointsMap(): Map<IAxisPoint['id'], IAxisPoint> {
		return new Map(
			this.axes.flatMap(({ points }) =>
				points.map((point) => [point.id, point])
			)
		);
	}

	get cells(): ICell[] {
		const cells = [];
		const [x, y] = this.displayAxes;
		for (const xPoint of x.points) {
			for (const yPoint of y.points) {
				const cell: ICell = {
					id: `${xPoint.id}-${yPoint.id}`,
					x: xPoint.id,
					y: yPoint.id,
					boardId: this.id,
				};
				cells.push(cell);
			}
		}
		return cells;
	}

	get cellsMap(): Map<ICell['id'], ICell> {
		return new Map(this.cells.map((cell): [string, ICell] => [cell.id, cell]));
	}

	get defaultCoordinates(): Record<string, string> {
		return this.axes.reduce(
			(acc, axis) => {
				acc[axis.id] = axis.defaultPoint;
				return acc;
			},
			{} as Record<string, string>
		);
	}

	/**
	 * Выбрать оси x и y для отображения матрицы.
	 * Ячейки генерируются на лету.
	 */
	setAxes({ xAxis, yAxis }: { xAxis?: string; yAxis?: string }) {
		if (xAxis) this.xAxis = xAxis;
		if (yAxis) this.yAxis = yAxis;
	}

	/** Менять местами x и y */
	reverseAxes() {
		this.isRotated = !this.isRotated;
	}

	updateTitle(title: string) {
		this.title = title;
	}

	delete() {
		this._onDelete();
	}
}
