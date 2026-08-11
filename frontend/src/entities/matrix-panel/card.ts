import { makeAutoObservable } from 'mobx';
import type { IAxis, IAxisPoint, ICard, TTask, TUser } from './types';

export type TCardProps = TTask & {
	boardId: string;
	coordinates: Record<IAxis['id'], IAxisPoint['id']>;
};

export class Card implements ICard {
	readonly id: string;
	title: string;
	description?: string;
	author: TUser;
	assignee?: TUser;
	dueDate?: string;
	tags?: string[];
	readonly createdAt: string;
	updatedAt: string;
	boardId: string;
	coordinates: Record<IAxis['id'], IAxisPoint['id']>;
	constructor(props: TCardProps) {
		this.id = props.id;
		this.title = props.title;
		this.description = props.description;
		this.author = props.author;
		this.assignee = props.assignee;
		this.dueDate = props.dueDate;
		this.tags = props.tags;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
		this.coordinates = props.coordinates;
		this.boardId = props.boardId;
		makeAutoObservable(this, {}, { autoBind: true });
	}

	update(updated: Partial<TCardProps>) {
		Object.assign(this, updated);
		this.updatedAt = new Date().toDateString();
	}
}
