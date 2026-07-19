import type { ClassNameValue } from 'tailwind-merge';

export interface GrabbingGripProps {
	variant?: 'default' | 'vertical' | 'horizontal';
	isGrabbing: boolean;
	size?: number;
	className?: ClassNameValue;
}
