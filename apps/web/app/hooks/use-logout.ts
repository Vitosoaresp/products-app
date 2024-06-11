import { api } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
	const router = useRouter();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: () => api.delete('/auth'),
	});

	const handleLogout = async () => {
		await mutateAsync().then(() => {
			router.push('/sign-in');
		});
	};

	return { handleLogout, isLoading: isPending };
};
