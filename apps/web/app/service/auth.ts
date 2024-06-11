import { Signin, SigninResponse } from '@products-app/schemas';
import axios from 'axios';

export const signIn = async (payload: Signin): Promise<SigninResponse> => {
	const { data } = await axios.post<SigninResponse>(
		'http://localhost:3333/auth/signin',
		payload,
	);
	return data;
};
