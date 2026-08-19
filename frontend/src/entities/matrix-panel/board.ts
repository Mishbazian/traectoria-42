import { makeAutoObservable } from 'mobx';
import type { IAxis, IBoard, ICard } from './types';
import type { MatrixBoardDTO } from '@/shared/api/types';
import { BoardAxis } from './board-axis';
import { BoardAxisPoint } from './board-axis-point';

export class Board implements IBoard {
	readonly id: string;
	title: string;
	axes: IAxis[] = [];
	cards: ICard[];

	constructor(
		dto: MatrixBoardDTO,
		private _onDelete: () => void,
		cards: ICard[] = []
	) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = dto.id;
		this.title = dto.title;
		this.cards = cards;
		for (const axisDto of dto.axes) {
			this.initAxis(axisDto);
		}
	}

	/** Инициализация одной оси */
	private initAxis({ id, name, points }: MatrixBoardDTO['axes'][number]) {
		this.axes.push(
			new BoardAxis({
				id,
				name,
				axisPoints: points.map(
					(point) => new BoardAxisPoint(point.id, point.title)
				),
			})
		);
	}

	removeCard(cardId: string) {
		const index = this.cards.findIndex((card) => card.id === cardId);
		return this.cards.splice(index, 1)[0];
	}

	updateTitle(title: string) {
		this.title = title;
	}

	delete() {
		this._onDelete();
	}
	/** Фильтрация карточек, попадающих в конкретную ячейку матрицы */
	getCardsByFeatures(...props: string[]): ICard[] {
		if (!props || props.length === 0) return this.cards;
		return this.cards.filter((card) => {
			const values = Object.values(card.features);
			for (const prop of props) {
				if (!values.includes(prop)) return false;
			}
			return true;
		});
	}
}
