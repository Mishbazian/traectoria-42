import { nanoid } from 'nanoid';
import type { ICell, TTask } from './types';
import { makeAutoObservable } from 'mobx';

export class Cell implements ICell {
	readonly id: string;
	constructor(
		public readonly x: string,
		public readonly y: string,
		public readonly board: string,
		public data: TTask[] = []
	) {
		this.id = nanoid();
    makeAutoObservable(this, {}, { autoBind: true });
	}

	addCellData(data: TTask[]) {
		this.data.push(...data);
	}
	removeCard(cardId: string, from?: number): TTask | null {
		const index =
			from !== undefined
				? from
				: this.data.findIndex((val) => val.id === cardId);
		if (index === -1) return null;
		return this.data.splice(index, 1)[0];
	}
  
	addCard(card: TTask, pos?: number) {
		if (pos === undefined) {
			this.data.push(card);
		} else {
			this.data.splice(pos, 0, card);
		}
	}
}
