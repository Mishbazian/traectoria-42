import type { IBoard, ICard } from "@/entities";
import type { ReactNode } from "react";
import type { SortableProps } from "../types";

export type KanbanBoardProps = {
	className?: string;
	board: IBoard;
	colWidthPx?: number;
	children: (card: ICard) => ReactNode;
} & SortableProps;
