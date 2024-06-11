import { RhfTextField } from '@/components/form/rhf-text-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Product, ProductDto, productSchema } from '@products-app/schemas';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface ProductFormProps {
	initialValues?: ProductDto;
	onSubmit: (data: ProductDto) => Promise<Product>;
	isLoading?: boolean;
}

export const ProductForm = ({
	initialValues,
	onSubmit,
	isLoading = false,
}: ProductFormProps) => {
	const router = useRouter();
	const client = useQueryClient();
	const { toast } = useToast();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ProductDto>({
		defaultValues: initialValues,
		resolver: zodResolver(productSchema),
	});

	const handleUpdate = (data: ProductDto) => {
		onSubmit(data)
			.then(() => {
				client.invalidateQueries({ queryKey: ['products'] });
				router.back();
				toast({
					title: 'Produto atualizado com sucesso',
				});
			})
			.catch(() => {
				toast({
					title: 'Erro ao atualizar produto',
				});
			});
	};

	return (
		<form onSubmit={handleSubmit(handleUpdate)}>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				<RhfTextField
					control={control}
					name="name"
					error={errors.name}
					label="Nome"
					defaultValue=""
				/>
				<RhfTextField
					control={control}
					name="code"
					error={errors.code}
					label="Codigo"
					type="number"
				/>
				<RhfTextField
					control={control}
					name="description"
					error={errors.description}
					label="Descrição"
					defaultValue=""
				/>
				<RhfTextField
					control={control}
					name="quantity"
					error={errors.quantity}
					label="Quantidade"
					type="number"
					defaultValue={0}
				/>
				<RhfTextField
					control={control}
					name="price"
					error={errors.price}
					label="Preço"
					type="number"
					defaultValue={0}
				/>
				<RhfTextField
					control={control}
					name="category"
					error={errors.category}
					label="Categoria"
					defaultValue=""
				/>
			</div>
			<div className="flex items-center justify-end gap-4 mt-4">
				<Button
					disabled={isLoading}
					type="button"
					variant="destructive"
					onClick={() => router.back()}
				>
					Cancelar
				</Button>
				<Button disabled={isLoading} type="submit">
					Salvar
				</Button>
			</div>
		</form>
	);
};
