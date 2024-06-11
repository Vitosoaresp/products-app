import { API_BASE_URL } from '@/lib/utils';
import { Product } from '@products-app/schemas';
import axios from 'axios';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(
	_req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	const cookiesState = cookies();
	const token = cookiesState.get('token')?.value;

	if (!token) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data } = await axios.get<Product>(
		API_BASE_URL + '/products/' + params.slug,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return Response.json(data);
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	const body = await req.json();
	console.log(body);
	const cookiesState = cookies();
	const token = cookiesState.get('token')?.value;

	if (!token) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { data } = await axios.put<Product>(
		API_BASE_URL + '/products/' + params.slug,
		body,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return Response.json(data);
}

export async function DELETE(
	_req: NextRequest,
	{ params }: { params: { slug: string } },
) {
	const cookiesState = cookies();
	const token = cookiesState.get('token')?.value;

	if (!token) {
		return Response.json({ error: 'Unauthorized' }, { status: 401 });
	}

	await axios.delete(API_BASE_URL + '/products/' + params.slug, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return Response.json({ message: 'Product deleted' });
}
