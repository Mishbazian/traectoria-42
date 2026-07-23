import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import type { UserAvatarProps } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { HatGlasses } from 'lucide-react';
import { cn } from '@/lib/utils';

export const UserAvatar = observer(
	forwardRef<HTMLDivElement, UserAvatarProps>(
		({ user, className, ...props }, ref) => {
			return (
				<div className={cn('flex items-center gap-2', className)} {...props}>
					<span className='text-muted-foreground text-sm'>{user.name}</span>
					<Avatar className='h-6 w-6' ref={ref}>
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback>
							<HatGlasses className='h-4 w-4' />
						</AvatarFallback>
					</Avatar>
				</div>
			);
		}
	)
);
