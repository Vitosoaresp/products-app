'use client';

import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { IconButton } from '@/components/icon-button';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { QueryKeys } from '@/lib/query-client';
import { useDeleteProduct } from '@/products/hooks/use-delete-product';
import { useUrlParams } from '@/products/hooks/use-url-params';
import { getProductsFn } from '@/service/product';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	ExternalLink,
	LoaderCircle,
	Trash2,
} from 'lucide-react';
import Link from 'next/link';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const ProductsList = () => {
	const { handleNextPage, handlePrevPage, page, search, perPage, setParams } =
		useUrlParams();
	const { handleDelete } = useDeleteProduct();

	const { data, isLoading } = useQuery({
		queryKey: [QueryKeys.Products, search, page, perPage],
		queryFn: async () => getProductsFn({ search, page, perPage }),
	});

	const products = data?.data ?? [];
	const isEmpty = !isLoading && products?.length === 0;
	const total = data?.total ?? 0;
	const totalPages = Math.ceil(total / perPage);

	const handleFirstPage = () => {
		setParams({ page: 1 });
	};

	const handleLastPage = () => {
		setParams({ page: totalPages });
	};

	const currentPaginatedItems =
		page === 1 ? products?.length : (page - 1) * perPage + products?.length;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Nome</TableHead>
					<TableHead>Preço</TableHead>
					<TableHead>Categoria</TableHead>
					<TableHead>Quantidade</TableHead>
					<TableHead>Ultima atualização</TableHead>
					<TableHead>Visualizar</TableHead>
					<TableHead>Excluir</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isEmpty && (
					<TableRow>
						<TableCell colSpan={7}>Nenhum produto encontrado</TableCell>
					</TableRow>
				)}
				{isLoading && !products && (
					<TableRow>
						<TableCell colSpan={7}>
							<LoaderCircle className="animate-spin" />
						</TableCell>
					</TableRow>
				)}
				{!isLoading &&
					products?.map(product => (
						<TableRow key={product._id}>
							<TableCell>{product.name}</TableCell>
							<TableCell>
								{Intl.NumberFormat('pt-br', {
									style: 'currency',
									currency: 'BRL',
								}).format(product.price)}
							</TableCell>
							<TableCell>{product.category ?? '-'}</TableCell>
							<TableCell>{product.quantity}</TableCell>
							<TableCell>{dayjs(product.updatedAt).fromNow()}</TableCell>
							<TableCell>
								<Button variant="link" asChild>
									<Link href={`/product/${product.slug}`}>
										<ExternalLink />
									</Link>
								</Button>
							</TableCell>
							<TableCell>
								<ConfirmationDialog
									title="Excluir produto"
									onConfirm={() => handleDelete(product._id)}
									description={`Deseja realmente excluir o produto ${product.name}? Ao excluir, não será possível recuperar os dados.`}
								>
									<Button variant="link">
										<Trash2 />
									</Button>
								</ConfirmationDialog>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>
						Mostrando {currentPaginatedItems} de {total} produtos
					</TableCell>
					<TableCell className="text-right" colSpan={4}>
						<div className="inline-flex gap-8 items-center">
							<span>
								Pagina {page} de {totalPages}
							</span>
							<div className="flex gap-1.5">
								<IconButton onClick={handleFirstPage} disabled={page === 1}>
									<ChevronsLeft className="size-4" />
								</IconButton>
								<IconButton onClick={handlePrevPage} disabled={page === 1}>
									<ChevronLeft className="size-4" />
								</IconButton>
								<IconButton
									onClick={handleNextPage}
									disabled={page === totalPages}
								>
									<ChevronRight className="size-4" />
								</IconButton>
								<IconButton
									onClick={handleLastPage}
									disabled={page === totalPages}
								>
									<ChevronsRight className="size-4" />
								</IconButton>
							</div>
						</div>
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};
