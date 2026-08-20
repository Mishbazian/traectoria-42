import { makeAutoObservable } from 'mobx';
import type { IAxis, IBoard, ICard, ICardsSource } from './types';
import type { MatrixBoardDTO } from '@/shared/api/types';
import { BoardAxis } from './board-axis';
import { BoardAxisPoint } from './board-axis-point';

export class Board implements IBoard {
	readonly id: string;
	title: string;
	axes: IAxis[] = [];

	constructor(
		dto: MatrixBoardDTO,
		private _onDelete: () => void,
		private cardsSource: ICardsSource
	) {
		makeAutoObservable(this, {}, { autoBind: true });
		this.id = dto.id;
		this.title = dto.title;
		for (const axisDto of dto.axes) {
			this.initAxis(axisDto);
		}
	}

	/** Карточки доски — вычисляются из глобального списка по boardId */
	get cards(): ICard[] {
		return this.cardsSource.cards.filter((card) => card.boardId === this.id);
	}

	/** Инициализация одной оси */
	private initAxis({ id, name, points }: MatrixBoardDTO['axes'][number]) {
		this.axes.push(
			new BoardAxis({
				id,
				name,
				axisPoints: points.map(
					(point) => new BoardAxisPoint(point.id, id, point.title)
				),
			})
		);
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
