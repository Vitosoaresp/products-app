import { API_BASE_URL } from '@/lib/utils';
import { Product } from '@products-app/schemas';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	const search = searchParams.get('search');
	const page = searchParams.get('page');
	const perPage = searchParams.get('perPage');
	const orderBy = searchParams.get('orderBy');
	const sort = searchParams.get('sort');
	const cookiesState = cookies();
	const token = cookiesState.get('token')?.value;

	if (!token) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data } = await axios.get<Product[]>(API_BASE_URL + '/products', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			search,
			page,
			perPage,
			orderBy,
			sort,
		},
	});

	return Response.json(data);
}

export async function POST(req: NextRequest) {
	const cookiesState = cookies();
	const token = cookiesState.get('token')?.value;

	if (!token) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data } = await axios.post<Product>(
		API_BASE_URL + '/products',
		await req.json(),
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return Response.json(data, { status: 201 });
}
