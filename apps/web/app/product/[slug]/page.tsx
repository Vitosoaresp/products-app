'use client';

import { Header } from '@/components/header';
import { QueryKeys } from '@/lib/query-client';
import { getProductBySlugFn, updateProductFn } from '@/service/product';
import { ProductDto } from '@products-app/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ProductForm } from '../components/product-form';
import { ProductSkeleton } from '../components/product-skeleton';

export default function Page({ params }: { params: { slug: string } }) {
	const { data: product, isLoading } = useQuery({
		queryFn: () => getProductBySlugFn(params.slug),
		queryKey: [QueryKeys.Product, params.slug],
	});
	const { mutateAsync: handleUpdate, isPending } = useMutation({
		mutationFn: (data: ProductDto) => updateProductFn(params.slug, data),
		mutationKey: [QueryKeys.Product],
	});

	return (
		<>
			<Header />
			<main className="container mx-auto pt-20">
				{!isLoading ? (
					<ProductForm
						initialValues={product}
						isLoading={isPending}
						onSubmit={handleUpdate}
					/>
				) : (
					<ProductSkeleton />
				)}
			</main>
		</>
	);
}
