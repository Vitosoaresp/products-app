import { api } from '@/lib/api';
import { Product, ProductDto } from '@products-app/schemas';

type getProductsProps = {
	search?: string;
	orderBy?: string;
	sort?: 'asc' | 'desc';
	perPage?: number;
	page?: number;
};

export interface IPaginationProduct {
	data: Product[];
	total: number;
}

export const getProductsFn = async (
	params: getProductsProps,
): Promise<IPaginationProduct> => {
	const { data } = await api.get<IPaginationProduct>('/products', { params });
	return data;
};

export const createProductFn = async (
	payload: ProductDto,
): Promise<Product> => {
	const { data } = await api.post<Product>('/products', payload);
	return data;
};

export const updateProductFn = async (
	slug: string,
	payload: ProductDto,
): Promise<Product> => {
	const { data } = await api.put<Product>(`/products/${slug}`, payload);
	return data;
};

export const getProductBySlugFn = async (slug: string): Promise<Product> => {
	const { data } = await api.get<Product>(`/products/${slug}`);
	return data;
};

export const deleteProductFn = async (slug: string): Promise<void> => {
	await api.delete(`/products/${slug}`);
};
