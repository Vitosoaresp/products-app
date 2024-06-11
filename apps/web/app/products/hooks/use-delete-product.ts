import { useToast } from '@/components/ui/use-toast';
import { QueryKeys } from '@/lib/query-client';
import { deleteProductFn } from '@/service/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteProduct = () => {
	const client = useQueryClient();
	const { toast } = useToast();
	const { mutateAsync } = useMutation({
		mutationFn: (slug: string) => deleteProductFn(slug),
	});

	const handleDelete = async (slug: string) => {
		mutateAsync(slug).then(() => {
			client.invalidateQueries({ queryKey: [QueryKeys.Products] });
			toast({ title: 'Produto excluído com sucesso' });
		});
	};

	return { handleDelete };
};
