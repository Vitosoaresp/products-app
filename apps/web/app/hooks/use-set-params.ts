'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type QueryParams = {
	page: number;
	perPage: number;
	search: string;
	orderBy: string;
	sort: string;
};

export const useSetParams = (defaultParams?: Partial<QueryParams>) => {
	const { replace } = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const setParams = (newParams: Record<string, string | number>) => {
		const params = new URLSearchParams(searchParams);
		Object.keys(newParams).forEach(key => {
			if (!newParams[key as string]) params.delete(key);
			params.set(key, String(newParams[key as string]));
		});

		replace(`${pathname}?${params.toString()}`);
	};

	const search = searchParams.get('search') ?? '';
	const page = Number(searchParams.get('page') ?? 1);
	const perPage = Number(searchParams.get('perPage') ?? 10);
	const orderBy = searchParams.get('orderBy') || defaultParams?.orderBy || '';
	const sort = searchParams.get('sort') || defaultParams?.sort || 'asc';

	return {
		setParams,
		params: {
			search,
			page,
			perPage,
			orderBy,
			sort,
		},
	};
};
