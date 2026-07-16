import { useState, useCallback, useEffect } from 'react';
import type { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import { boardStore } from '@/state/board-store';
import type { Board, Card, Column } from '@/state/types';

type DragOpsProps = {
  id: string;
  type: string;
  fromGroup?: string;
  toGroup?: string;
  toIndex: number;
};

type DragStartState = Omit<DragOpsProps, 'toGroup' | 'toIndex'> | null;

export function useKanbanDrag(
  boards: Board[],
  columnsByBoard: Record<string, Column['id'][]>,
  cardsByColumns: Record<string, Card['id'][]>
) {
  const [boardsOrder, setBoardsOrder] = useState<Board[]>(boards);
  const [columnsOrder, setColumnsOrder] = useState<Record<string, Column['id'][]>>(columnsByBoard);
  const [cardsOrder, setCardsOrder] = useState<Record<string, Card['id'][]>>(cardsByColumns);
  const [dragStart, setDragStart] = useState<DragStartState>(null);

  useEffect(() => {
    setBoardsOrder(boards);
    setColumnsOrder(columnsByBoard);
    setCardsOrder(cardsByColumns);
  }, [boards, columnsByBoard, cardsByColumns]);

  const handleMove = useCallback(async (props: DragOpsProps) => {
    const success = await boardStore.moveItem({
      type: props.type,
      id: props.id,
      fromGroup: props.fromGroup,
      toIndex: props.toIndex,
      toGroup: props.toGroup,
    });

    if (!success) {
      setBoardsOrder(boards);
      setColumnsOrder(columnsByBoard);
      setCardsOrder(cardsByColumns);
    }
  }, [boards, columnsByBoard, cardsByColumns]);

  const onDragStart = useCallback((event: DragStartEvent) => {
    const { source } = event.operation;
    if (isSortable(source) && source.type) {
      const { id, type, initialGroup } = source;
      if (!initialGroup) return;
      setDragStart({
        id: id.toString(),
        type: type.toString(),
        fromGroup: initialGroup?.toString(),
      });
    }
  }, []);

  const onDragOver = useCallback((event: DragOverEvent) => {
    const { source } = event.operation;
    if (source && source.type === 'card') {
      setCardsOrder((items) => move(items, event));
    }
  }, []);

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { source } = event.operation;

      if (!event.canceled && isSortable(source) && dragStart && dragStart.id === source.id.toString()) {
        const { group, index } = source;

        switch (source.type) {
          case 'column': {
            setColumnsOrder((columnsOrder) => move(columnsOrder, event));
            break;
          }
          case 'board': {
            setBoardsOrder((boardsOrder) => move(boardsOrder, event));
            break;
          }
          case 'card': {
            if (!group) return;
            break;
          }
          default:
            return;
        }

        handleMove({
          ...dragStart,
          toIndex: index,
          toGroup: group?.toString(),
        });
      }
    },
    [dragStart, handleMove]
  );

  return {
    boardsOrder,
    columnsOrder,
    cardsOrder,
    dragHandlers: {
      onDragStart,
      onDragOver,
      onDragEnd,
    },
    moveItem: handleMove,
  };
}
