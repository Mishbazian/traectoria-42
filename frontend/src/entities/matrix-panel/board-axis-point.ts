import { makeAutoObservable } from 'mobx';
import type { IPoint, TPointData, ICell } from './types';

export class BoardAxisPoint implements IPoint {
  public color?: string;

  constructor(
    readonly id: string,
    readonly axis: string,
    public title: string,
    private onDelete: (id: string) => void,
    private getCells: () => ICell[],
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get cells() {
    return this.getCells();
  }

  update(updated: Partial<TPointData>) {
    Object.assign(this, updated);
  }

  delete() {
    this.onDelete(this.id);
  }
}
