import Link from 'next/link';
import { RegisterForm } from './components/register-form';

export default function Page() {
	return (
		<div className='h-screen flex justify-center items-center flex-col w-full'>
			<h1 className='font-bold text-2xl'>Registre-se</h1>
			<RegisterForm />
			<p className='pt-2'>
				Já possui uma conta?{' '}
				<Link href='/sign-in' className='text-blue-500'>
					Entrar
				</Link>
			</p>
		</div>
	);
}
