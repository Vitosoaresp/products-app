'use client';

import { Register, SigninResponse } from '@products-app/schemas';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../lib/api';

export const useRegister = () => {
	const { mutateAsync: handleRegister, isPending } = useMutation({
		mutationFn: async (payload: Register) => {
			const { data } = await api.post<SigninResponse>('/auth/register', payload);
			return data;
		},
	});

	return {
		handleRegister,
		isPending,
	};
};
