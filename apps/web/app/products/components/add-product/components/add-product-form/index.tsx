'use client';

import { RhfTextField } from '@/components/form/rhf-text-field';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { QueryKeys } from '@/lib/query-client';
import { createProductFn } from '@/service/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductDto, productSchema } from '@products-app/schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface AddProductFormProps {
	onClose: () => void;
}

export const AddProductForm = ({ onClose }: AddProductFormProps) => {
	const { toast } = useToast();
	const client = useQueryClient();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<ProductDto>({
		resolver: zodResolver(productSchema),
	});
	const { mutateAsync: handleCreate, isPending } = useMutation({
		mutationFn: (data: ProductDto) => createProductFn(data),
		mutationKey: [QueryKeys.Product],
	});

	const onSubmit = async (data: ProductDto) => {
		await handleCreate(data)
			.then(() => {
				toast({
					title: 'Produto criado com sucesso',
				});
				onClose();
				client.invalidateQueries({ queryKey: [QueryKeys.Products] });
			})
			.catch(() => {
				toast({
					title: 'Erro ao criar produto',
				});
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
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
					containerClassName="lg:col-span-2"
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
					containerClassName="lg:col-span-2"
				/>
			</div>
			<div className="flex items-center justify-end gap-4 mt-4">
				<DialogClose asChild>
					<Button disabled={isPending} type="button" variant="destructive">
						Cancelar
					</Button>
				</DialogClose>
				<Button disabled={isPending} type="submit">
					Salvar
				</Button>
			</div>
		</form>
	);
};
