'use client';

import { useLogout } from '@/hooks';
import { me } from '@/service/auth';
import { useQuery } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const Header = () => {
	const { data } = useQuery({ queryKey: ['me'], queryFn: me, retry: 1 });
	const { handleLogout, isLoading } = useLogout();

	return (
		<header className='flex py-2 justify-between border-b border-zinc-700'>
			<div className='container flex justify-between items-center'>
				<h1 className='uppercase font-medium'>Products App</h1>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarFallback>{data?.name[0].toUpperCase()}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem disabled={isLoading} onClick={handleLogout}>
							<LogOut />
							Sair
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
