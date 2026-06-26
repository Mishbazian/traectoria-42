import MOCK_BOARD from '../fixtures/boards.json';

// Имитация задержки сети
export async function fetchBoardMock(
	ids: string[]
): Promise<typeof MOCK_BOARD> {
	const foundBoards = MOCK_BOARD.boards.filter(({ id }) => ids.includes(id));
	await new Promise((resolve) => setTimeout(resolve, 500));
	return { boards: foundBoards };
}
