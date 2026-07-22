import { ModeToggle } from '@/components/mode-toggle';
import { type ReactNode } from 'react';

export const AppLayout = ({ children }: { children: ReactNode }) => (
	<div>
		<div className='flex justify-end'>
			<ModeToggle />
		</div>
		{children}
	</div>
);
