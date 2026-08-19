import { makeAutoObservable } from 'mobx';
import type { IBoardCard, ICard, TTaskContent } from './types';

/**
 * Конкретная карточка — задача.
 * Реализует IBoardCard: board-контракт + семантическое содержимое.
 */
export class Card implements IBoardCard {
	readonly id: string;
	boardId: string;
	features: Record<string, string>;

	// Семантическое содержимое (из TTaskContent)
	title: string;
	description?: string;
	author: TTaskContent['author'];
	assignee?: TTaskContent['assignee'];
	dueDate?: TTaskContent['dueDate'];
	tags?: TTaskContent['tags'];
	createdAt: TTaskContent['createdAt'];
	updatedAt: TTaskContent['updatedAt'];

	constructor(props: IBoardCard & TTaskContent) {
		this.id = props.id;
		this.boardId = props.boardId;
		this.features = props.features;
		this.title = props.title;
		this.description = props.description;
		this.author = props.author;
		this.assignee = props.assignee;
		this.dueDate = props.dueDate;
		this.tags = props.tags;
		this.createdAt = props.createdAt;
		this.updatedAt = props.updatedAt;
		makeAutoObservable(this, {}, { autoBind: true });
	}

	update(updated: Partial<ICard>) {
		Object.assign(this, updated);
		this.updatedAt = new Date().toDateString();
	}
}
