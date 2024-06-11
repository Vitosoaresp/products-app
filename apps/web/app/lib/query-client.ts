import { QueryClient } from '@tanstack/react-query';

export const client = new QueryClient();

export enum QueryKeys {
	Products = 'products',
	Product = 'product',
}
