import { makeAutoObservable, runInAction } from 'mobx';
import type { IBoard, IBoardStore, ICard } from './types';
import type { MatrixBoardDTO } from '@/shared/api/types';
import { fetchMatrixBoard } from '@api';
import { Board } from './board';
import { Card } from './card';

export class MatrixBoardStore implements IBoardStore {
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

	private addBoard(dto: MatrixBoardDTO) {
		const cards = dto.cards.map(
			(card) => new Card({ ...card, boardId: dto.id })
		);
		this.boards.push(new Board(dto, () => this.deleteBoard(dto.id), cards));
	}

	deleteBoard(boardId: string) {
		this.boards = this.boards.filter((b) => b.id !== boardId);
	}
}
