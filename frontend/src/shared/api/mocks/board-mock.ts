import { getFromLocalStorage, setLocalStorage } from '@lib';
import { MOCK_API_BOARD_STORAGE_KEY } from '@constants';
import MOCK_BOARDS from '../fixtures/boards.json';
import type { BoardsDTO, CardsDTO, ColumnsDTO, MatrixBoardDTO } from '../types';
import MOCK_MATRIXS_BOARDS_DATA from '../fixtures/matrix-board.json'

type StorageData = {
	boards: BoardsDTO;
	columns: ColumnsDTO;
	cards: CardsDTO;
};
// Имитация задержки сети
export async function fetchBoardMock(ids?: string[]): Promise<StorageData> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	let data = getFromLocalStorage<StorageData>(MOCK_API_BOARD_STORAGE_KEY);
	if (!data) {
		data = {
			boards: MOCK_BOARDS.boards.map((b) => ({
				...b,
				columns: b.columns?.map((c) => c.id),
			})),
			columns: MOCK_BOARDS.boards.flatMap((b) =>
				b.columns.map((c) => ({
					...c,
					cards: c.cards.map((card) => card.id),
				}))
			),
			cards: MOCK_BOARDS.boards.flatMap((b) =>
				b.columns.flatMap((col) => col.cards)
			),
		};
		setLocalStorage(MOCK_API_BOARD_STORAGE_KEY, data);
	}
	if (ids) {
		const boards = data.boards.filter((b) => ids.includes(b.id));
		const columns = data.columns.filter((c) => ids.includes(c.boardId));

		const cardIdsInColumns = new Set(columns.flatMap((col) => col.cards));
		const cards = data.cards.filter((card) => cardIdsInColumns.has(card.id));
		return { boards, columns, cards };
	}
	return data;
}


export async function fetchMatrixBoardMock(ids?: string[]): Promise<MatrixBoardDTO[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	let data = getFromLocalStorage<MatrixBoardDTO[]>(MOCK_API_BOARD_STORAGE_KEY);
	if (!data) {
		data = MOCK_MATRIXS_BOARDS_DATA.boards
		setLocalStorage(MOCK_API_BOARD_STORAGE_KEY, data);
	}
	if (ids) {
		const filtered = data?.filter((b) => ids.includes(b.id));

		return filtered ?? [];
	}
	return data ?? [];
}
