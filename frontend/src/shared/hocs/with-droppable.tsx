import type { ComponentType, ReactElement } from 'react';
import type { DroppablePreset } from '../lib';
import { useDroppable, type UseDroppableInput } from '@dnd-kit/react';

export function withDroppable<T>(
	WrappedComponent: ComponentType<T>,
	config?: DroppablePreset
): ComponentType<T & UseDroppableInput> {
	return function (props: T & UseDroppableInput): ReactElement {
		const droppableProps = useDroppable({
			id: props.id,
			...config,
		});

		return <WrappedComponent {...props} {...droppableProps} />;
	};
}
