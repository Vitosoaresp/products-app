import { SignInForm } from './components/sign-in-form';

export default function Page() {
	return (
		<div className="h-screen flex justify-center items-center flex-col w-full">
			<h1 className="font-bold text-2xl">LOGIN</h1>
			<SignInForm />
		</div>
	);
}
