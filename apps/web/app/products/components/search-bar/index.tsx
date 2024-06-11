'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUrlParams } from '@/products/hooks/use-url-params';
import { useState } from 'react';

export const SearchBar = () => {
	const { setParams } = useUrlParams();
	const [tempSearch, setTempSearch] = useState<string>('');

	return (
		<div className="lg:py-8 py-4 flex flex-col lg:flex-row items-stretch lg:gap-10 gap-4 w-full">
			<Input
				placeholder="Pesquisar por nome, categoria..."
				onChange={({ target }) => setTempSearch(target.value)}
				value={tempSearch}
				className="lg:max-w-xs"
			/>

			<Button
				variant="outline"
				onClick={() => setParams({ search: tempSearch })}
			>
				Pesquisar
			</Button>
		</div>
	);
};
