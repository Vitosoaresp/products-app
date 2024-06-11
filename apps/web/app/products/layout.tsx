import { Header } from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="container mx-auto pb-10">{children}</main>
		</>
	);
}
