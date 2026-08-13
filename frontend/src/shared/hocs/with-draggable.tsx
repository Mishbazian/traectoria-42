import type { ComponentType, ReactElement } from 'react';
import type { DraggablePreset } from '../lib';
import {
	useDraggable,
	type UseDraggableInput,
} from '@dnd-kit/react';

export function withDraggable<T>(
	WrappedComponent: ComponentType<T>,
	config?: DraggablePreset
): ComponentType<T & UseDraggableInput> {
	return function (props: T & UseDraggableInput): ReactElement {
		const draggableProps = useDraggable({
			id: props.id,
			...config,
		});

		return <WrappedComponent {...props} {...draggableProps} />;
	};
}
