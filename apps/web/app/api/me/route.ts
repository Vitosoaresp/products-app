import { User } from '@products-app/schemas';
import axios from 'axios';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET() {
	const cookiesState = cookies();
	const token = cookiesState.get('token')?.value;
	console.log('token', token);

	try {
		if (!token) {
			return redirect('/sign-in');
		}

		const { data } = await axios.get<User>('http://localhost:3333/auth/me', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return Response.json(data);
	} catch (error: any) {
		if (error?.message === 'NEXT_REDIRECT') throw error;
		return Response.error();
	}
}
