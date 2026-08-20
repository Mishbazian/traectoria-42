import { makeAutoObservable, runInAction } from 'mobx';
import type { IBoard, IBoardStore, ICardsSource, ICard } from './types';
import type { MatrixBoardDTO } from '@/shared/api/types';
import { fetchMatrixBoard } from '@api';
import { Board } from './board';
import { Card } from './card';

export class MatrixBoardStore implements IBoardStore, ICardsSource {
	boards: IBoard[] = [];
	cards: ICard[] = [];
	isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this, {}, { autoBind: true });
		this.init();
	}

	private init = async () => {
		runInAction(() => {
			this.isLoading = true;
		});
		const loaded = await fetchMatrixBoard();
		runInAction(() => {
			this.isLoading = false;
			for (const board of loaded) {
				this.addBoard(board);
			}
		});
	};

	get boardsMap(): Record<string, IBoard> {
		return this.boards.reduce(
			(acc, board) => {
				acc[board.id] = board;
				return acc;
			},
			{} as Record<string, IBoard>
		);
	}

	get cardsMap(): Map<string, ICard> {
		const map = new Map<string, ICard>();
		this.cards.forEach((card) => map.set(card.id, card));
		return map;
	}

	private addBoard(dto: MatrixBoardDTO) {
		const boardCards = dto.cards.map(
			(card) => new Card({ ...card, boardId: dto.id })
		);
		this.cards.push(...boardCards);
		this.boards.push(new Board(dto, () => this.deleteBoard(dto.id), this));
	}

	deleteBoard(boardId: string) {
		// Удаляем все карточки, принадлежащие доске
		this.cards = this.cards.filter((c) => c.boardId !== boardId);
		this.boards = this.boards.filter((b) => b.id !== boardId);
	}

	/** Перемещение карточки на другую доску в ячейку с конкретными координатами */
	moveCard(
		cardId: string,
		toBoardId: string,
		features: Record<string, string>
	) {
		console.log('mmove to board');
		const card = this.cards.find((c) => c.id === cardId);
		console.log({ card });
		if (!card) return;
		card.update({ boardId: toBoardId, features });
	}
}
