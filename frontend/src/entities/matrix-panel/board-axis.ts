import { makeAutoObservable } from 'mobx';
import type { IAxis, IAxisPoint } from './types';

export type BoardAxisProps = {
	readonly id: string;
	name: string;
	axisPoints?: IAxisPoint[];
	defaultPoint?: IAxisPoint['id'];
};

export class BoardAxis implements IAxis {
	id: string;
	name: string;
	points: IAxisPoint[];
	defaultPoint: string;

	constructor({ id, name, axisPoints = [], defaultPoint }: BoardAxisProps) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = id;
		this.name = name;
		this.points = axisPoints;
		this.defaultPoint = defaultPoint ?? axisPoints[0]?.id ?? '';
	}

	deletePoint(id: string) {
		this.points = this.points.filter((p) => p.id !== id);
	}
	update(updated: Partial<BoardAxisProps>) {
		Object.assign(this, updated);
	}
}
