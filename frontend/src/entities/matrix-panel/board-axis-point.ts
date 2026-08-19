import { makeAutoObservable } from 'mobx';
import type { TPointData, IAxisPoint } from './types';

export class BoardAxisPoint implements IAxisPoint {
	public color?: string;

	constructor(
		readonly id: string,
		public title: string
	) {
		makeAutoObservable(this, {}, { autoBind: true });
	}

	update(updated: Partial<TPointData>) {
		Object.assign(this, updated);
	}
}
