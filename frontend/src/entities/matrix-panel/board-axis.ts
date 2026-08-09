import { makeAutoObservable } from 'mobx';
import { nanoid } from 'nanoid';
import type { TAxisDTO } from '@/shared/api/types';
import type { IAxis, ICell, IPoint, TAxisName } from './types';
import { BoardAxisPoint } from './board-axis-point';

export class BoardAxis implements IAxis {
	id: string;
	points: IPoint[] = [];

	constructor(
		public type: TAxisName,
		axisPoints: TAxisDTO[] = [],
		protected onAddPoint: (newPointId: string) => void,
		protected onDeletePoint: (pointId: string) => void,
		private getAxisPointCells: (pointId: string) => ICell[]
	) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = nanoid();
		axisPoints?.forEach(({ id, title }) => this.addPoint(title, id));
	}

	addPoint(title: string, pointId?: string) {
		const id = pointId ?? nanoid();
		this.points.push(
			new BoardAxisPoint(
				id,
				this.id,
				title,
				this.deletePoint,
				this.getAxisPointCells
			)
		);
		this.onAddPoint(id);
	}

	deletePoint(id: string) {
		this.points = this.points.filter((p) => p.id !== id);
		this.onDeletePoint(id);
	}
}
