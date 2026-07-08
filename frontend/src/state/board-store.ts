// src/state/board-store.ts
import { atom } from 'jotai';
import { fetchBoards } from '@/api';
import type {  BoardsDataDTO } from '@/api/types';

// Атом с ID используемых в этот момент досок
export const boardIdsAtom = atom<string[]>([]);

// Асинхронный атом — может возвращать как данные, так и Promise
export const boardsAsyncAtom = atom<
	BoardsDataDTO['boards'] | Promise<BoardsDataDTO['boards']>
>(async (get) => {
	const ids = get(boardIdsAtom);
	if (ids.length === 0) return [];

	const { boards } = await fetchBoards(ids);
	return boards;
});
