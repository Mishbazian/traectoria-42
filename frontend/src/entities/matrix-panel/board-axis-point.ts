import { makeAutoObservable } from 'mobx';
import type { TPointData, IAxisPoint, ICell } from './types';

export class BoardAxisPoint implements IAxisPoint {
	public color?: string;

	constructor(
		readonly id: string,
		readonly axis: string,
		public title: string,
		private getCells: () => ICell[]
	) {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	get cells() {
		return this.getCells();
	}

	update(updated: Partial<TPointData>) {
		Object.assign(this, updated);
	}
}
