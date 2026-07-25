import type { HTMLAttributes } from 'react';

type User = {
	name: string;
	avatar?: string;
};
export interface UserAvatarProps extends HTMLAttributes<HTMLDivElement> {
	user: User;
	className?: string;
}
