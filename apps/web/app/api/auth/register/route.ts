import { register } from '@/service/auth';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		await register(body);

		const response = NextResponse.json({ message: 'created' }, { status: 201 });

		return response;
	} catch (error) {
		const err = error as AxiosError;
		return Response.json(err, { status: err.response?.status || 500 });
	}
}
