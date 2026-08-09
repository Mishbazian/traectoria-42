import {
	getFromLocalStorage,
	setLocalStorage,
	OLD_MOCK_API_BOARD_STORAGE_KEY,
} from '@lib';
import MOCK_BOARDS from '../fixtures/boards.json';
import type { BoardsDTO, CardsDTO, ColumnsDTO } from '@api';

type StorageData = {
	boards: BoardsDTO;
	columns: ColumnsDTO;
	cards: CardsDTO;
};

// Имитация задержки сети
export async function fetchBoardMock(ids?: string[]): Promise<StorageData> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	let data = getFromLocalStorage<StorageData>(OLD_MOCK_API_BOARD_STORAGE_KEY);
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
		setLocalStorage(OLD_MOCK_API_BOARD_STORAGE_KEY, data);
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
