// src/state/board-store.ts
import { atom } from 'jotai';
import { fetchBoards } from '@/api';
import type { Board } from './types';

// Atom для загрузки нескольких досок по их ID
export const loadBoardsAtom = atom(null, async (_, set, ids: string[]) => {
	try {
		const { boards } = await fetchBoards(ids);
		if (boards.length === 0) return;

		// Обновляем массив досок
		set(boardsAtom, boards);
	} catch (error) {
		console.error('Ошибка загрузки досок:', error);
	}
});

// Atom для массива досок
export const boardsAtom = atom<Board[]>([]);
