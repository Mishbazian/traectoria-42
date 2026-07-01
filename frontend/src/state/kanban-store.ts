// src/state/kanban-store.ts
import { atomWithStorage } from 'jotai/utils';
import type { Board, Card, Column } from './types';

// Основные атомы для хранения данных в localStorage
export const kanbanBoardsAtom = atomWithStorage<Board[]>('kanban-boards', []);

export const kanbanColumnsStateAtom = atomWithStorage<Record<string, Card[]>>( 'kanban-columns-state', {}

);

export const kanbanColumnOrderAtom = atomWithStorage<Record<string, Column[]>>( 'kanban-column-order', {}

);
