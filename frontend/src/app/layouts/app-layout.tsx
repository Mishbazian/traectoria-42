import { ModeToggle } from '@/components/ui/mode-toggle';
import { type ReactNode } from 'react';

export const AppLayout = ({ children }: { children: ReactNode }) => (
	<div>
		<div className='flex justify-end'>
			<ModeToggle />
		</div>
		{children}
	</div>
);
