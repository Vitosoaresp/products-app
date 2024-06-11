'use client';

import { api } from '@/lib/api';
import { Signin, SigninResponse } from '@products-app/schemas';
import { useMutation } from '@tanstack/react-query';

export const useSignIn = () => {
	const { mutateAsync: handleSignIn, isPending } = useMutation({
		mutationFn: async (payload: Signin) => {
			const { data } = await api.post<SigninResponse>('/auth', payload);
			return data;
		},
	});

	return {
		handleSignIn,
		isPending,
	};
};
