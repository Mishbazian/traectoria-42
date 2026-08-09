import { makeAutoObservable } from 'mobx';
import type { TPointData, ICell, IAxisPoint } from './types';

export class BoardAxisPoint implements IAxisPoint {
	public color?: string;

	constructor(
		readonly id: string,
		readonly axis: string,
		public title: string,
		private onDelete: (id: string) => void,
		private getCellsFn: (pointId: string) => ICell[]
	) {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	get cells() {
		return this.getCellsFn(this.id);
	}

	update(updated: Partial<TPointData>) {
		Object.assign(this, updated);
	}

	delete() {
		this.onDelete(this.id);
	}
}
