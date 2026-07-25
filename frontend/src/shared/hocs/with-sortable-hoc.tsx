import { useSortable, type UseSortableInput } from '@dnd-kit/react/sortable';
import type { ComponentType, ReactElement } from 'react';
export function withSortable<T>(
	WrappedComponent: ComponentType<T>
): ComponentType<T & UseSortableInput> {
	return function (props: T & UseSortableInput): ReactElement {
		const sortableProps = useSortable({
			...props,
			id: props.id,
		});

		return <WrappedComponent {...props} {...sortableProps} />;
	};
}
