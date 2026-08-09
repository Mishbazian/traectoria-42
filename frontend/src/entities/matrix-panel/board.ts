import { makeAutoObservable } from 'mobx';
import type { IAxis, ICell, IBoard, TAxisName, TBoardAxes } from './types';
import type { MatrixBoardDTO, TAxisDTO, CellDTO } from '@/shared/api/types';
import { BoardAxis } from './board-axis';
import { Cell } from './cell';

export class Board implements IBoard {
  readonly id: string;
  title: string;
  axes: IAxis[] = [];
  cells: ICell[] = [];

  private _onDelete: () => void;

  constructor(
    dto: MatrixBoardDTO,
    onDelete: () => void,
  ) {
    this._onDelete = onDelete;
    makeAutoObservable(this, {}, { autoBind: true });
    this.id = dto.id;
    this.title = dto.title;
    this.initAxis('x', dto.columns);
    this.initAxis('y', dto.rows);
    this.populateCells(dto.cells);
  }

  initAxis(name: TAxisName, points?: TAxisDTO[]) {
    const axis = new BoardAxis(
      name,
      points ?? [],
      (newPointId) => this.handleAddAxisPoint(name, newPointId),
      (pointId) => this.handleRemoveAxisPoint(name, pointId),
      (pointId) => this.getCellsByAxisPoint(name, pointId),
    );
    this.axes.push(axis);
  }

  populateCells(cellDtos: CellDTO[]) {
    for (const dto of cellDtos) {
      this.cells.push(new Cell(dto.col, dto.row, this.id, [...(dto.data ?? [])]));
    }
  }

  private getCellsByAxisPoint(axis: TAxisName, pointId: string): ICell[] {
    return this.cells.filter((cell) => cell[axis] === pointId);
  }

  private handleAddAxisPoint(axis: TAxisName, newPointId: string) {
    const otherAxis = axis === 'x' ? 'y' : 'x';
    const otherAxisObj = this.axesMap[otherAxis];
    if (!otherAxisObj) return;

    for (const existingPoint of otherAxisObj.points) {
      const x = axis === 'x' ? newPointId : existingPoint.id;
      const y = axis === 'y' ? newPointId : existingPoint.id;
      this.cells.push(new Cell(x, y, this.id));
    }
  }

  private handleRemoveAxisPoint(axis: TAxisName, pointId: string) {
    this.cells = this.cells.filter((cell) => cell[axis] !== pointId);
  }

  get axesMap(): TBoardAxes {
    const map: Record<string, IAxis> = {};
    for (const axis of this.axes) {
      map[axis.type] = axis;
    }
    return map as TBoardAxes;
  }

  reverseAxes() {
    this.axes.reverse();
  }

  updateTitle(title: string) {
    this.title = title;
  }

  delete() {
    this._onDelete();
  }
}
