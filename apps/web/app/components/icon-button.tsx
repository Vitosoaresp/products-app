import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export const IconButton = React.forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
	return (
		<button
			{...props}
			className={cn(
				'bg-white/10 border border-white/10 rounded-md p-1.5 disabled:opacity-50',
				className,
			)}
			ref={ref}
		/>
	);
});
