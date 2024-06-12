'use client';

import { RhfTextField } from '@/components/form/rhf-text-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRegister } from '@/register/hooks/register-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { Register, registerSchema } from '@products-app/schemas';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const RegisterForm = () => {
	const { toast } = useToast();
	const router = useRouter();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<Register>({
		resolver: zodResolver(registerSchema),
	});
	const { handleRegister, isPending } = useRegister();

	const onSubmit = async (data: Register) => {
		await handleRegister(data)
			.then(() => {
				router.push('/sign-in');
			})
			.catch(() => {
				toast({
					title: 'Error',
					description: 'Erro ao registrar usuário',
				});
			});
	};

	return (
		<form
			className='lg:max-w-sm mx-auto w-full px-4'
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='space-y-3'>
				<RhfTextField
					control={control}
					name='email'
					label='Email'
					error={errors.email}
					defaultValue=''
				/>
				<RhfTextField
					control={control}
					name='name'
					label='Nome'
					error={errors.name}
					defaultValue=''
				/>
				<RhfTextField
					control={control}
					name='password'
					label='Senha'
					error={errors.password}
					type='password'
					defaultValue=''
				/>
				<div className='pt-2'>
					<Button disabled={isPending} className='w-full' type='submit'>
						Registrar
					</Button>
				</div>
			</div>
		</form>
	);
};
