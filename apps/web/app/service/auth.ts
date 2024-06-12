import { api } from '@/lib/api';
import { Register, Signin, SigninResponse, User } from '@products-app/schemas';
import axios from 'axios';

export const signIn = async (payload: Signin): Promise<SigninResponse> => {
	const { data } = await axios.post<SigninResponse>(
		'http://localhost:3333/auth/signin',
		payload,
	);
	return data;
};

export const register = async (payload: Register) => {
	const { data } = await api.post<User>(
		'http://localhost:3333/auth/register',
		payload,
	);
	return data;
};

export const me = async () => {
	const { data } = await api.get<User>('/me');
	return data;
};
