import { signIn } from '@/service/auth';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const { token, user } = await signIn(body);
		console.log('token', token);

		const response = NextResponse.json({ success: true, user });

		response.cookies.set({
			name: 'token',
			value: token,
			path: '/',
		});

		return response;
	} catch (error) {
		const err = error as AxiosError;
		return Response.json(err, { status: err.response?.status || 500 });
	}
}

export async function DELETE() {
	const response = NextResponse.json({ success: true });

	response.cookies.delete({
		name: 'token',
		path: '/',
	});

	return response;
}
