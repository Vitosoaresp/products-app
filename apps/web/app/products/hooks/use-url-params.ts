import { useSetParams } from '@/hooks/use-set-params';

export const useUrlParams = () => {
	const { params, setParams } = useSetParams();
	const { page, orderBy, perPage, search, sort } = params;

	const handleNextPage = () => setParams({ page: page + 1 });
	const handlePrevPage = () => setParams({ page: page - 1 });

	return {
		page,
		orderBy,
		perPage,
		search,
		sort,
		handleNextPage,
		handlePrevPage,
		setParams,
	};
};
