import { useSortable, type UseSortableInput } from '@dnd-kit/react/sortable';
import type { ComponentType, ReactElement } from 'react';

type SortableInputProps = Partial<UseSortableInput>;
export function withSortable<T>(
	WrappedComponent: ComponentType<T>,
	config?: SortableInputProps
): ComponentType<T & UseSortableInput> {
	return function (props: T & UseSortableInput): ReactElement {
		const sortableProps = useSortable({
			id: props.id,
			index: props.index,
			...config,
		});

		return <WrappedComponent {...props} {...sortableProps} />;
	};
}
