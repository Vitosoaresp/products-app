'use client';

import { RhfTextField } from '@/components/form/rhf-text-field';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMeStore } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { Signin, signinSchema } from '@products-app/schemas';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSignIn } from '../../hooks/use-sign-in';

export const SignInForm = () => {
	const { toast } = useToast();
	const { setUser } = useMeStore(s => s);
	const router = useRouter();
	const {
		control,
		formState: { errors },
		handleSubmit,
	} = useForm<Signin>({
		resolver: zodResolver(signinSchema),
	});
	const { handleSignIn, isPending } = useSignIn();

	const onSubmit = async (data: Signin) => {
		await handleSignIn(data)
			.then(data => {
				router.push('/products');
				setUser(data.user);
			})
			.catch(e => {
				const status = e.response?.status ?? 500;
				const invalidCredentials = status === 401 || status === 404;
				toast({
					title: 'Error',
					description: invalidCredentials
						? 'Credenciais inválidas'
						: 'Erro ao fazer login, tente novamente',
				});
			});
	};

	return (
		<form
			className="lg:max-w-sm mx-auto w-full px-4"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="space-y-5">
				<RhfTextField
					control={control}
					name="email"
					label="Email"
					error={errors.email}
					defaultValue=""
				/>
				<RhfTextField
					control={control}
					name="password"
					label="Senha"
					error={errors.password}
					type="password"
					defaultValue=""
				/>
				<Button disabled={isPending} className="w-full" type="submit">
					Entrar
				</Button>
			</div>
		</form>
	);
};
