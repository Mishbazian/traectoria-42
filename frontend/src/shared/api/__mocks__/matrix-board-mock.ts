import {
	getFromLocalStorage,
	setLocalStorage,
	MOCK_API_BOARD_STORAGE_KEY,
} from '@lib';
import MOCK_MATRIXS_BOARDS_DATA from '../fixtures/matrix-board.json';
import type { MatrixBoardDTO } from '@api';

// Имитация задержки сети
export async function fetchMatrixBoardMock(
	ids?: string[]
): Promise<MatrixBoardDTO[]> {
	await new Promise((resolve) => setTimeout(resolve, 500));
	let data = getFromLocalStorage<MatrixBoardDTO[]>(MOCK_API_BOARD_STORAGE_KEY);
	if (!data) {
		data = MOCK_MATRIXS_BOARDS_DATA.boards;
		setLocalStorage(MOCK_API_BOARD_STORAGE_KEY, data);
	}
	if (ids) {
		const filtered = data?.filter((b) => ids.includes(b.id));
		return filtered ?? [];
	}
	return data ?? [];
}
