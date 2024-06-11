'use client';

import { Toaster } from '@/components/ui/toaster';
import { client } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { MeStoreProvider } from './me-provider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Toaster />
			<MeStoreProvider>
				<QueryClientProvider client={client}>{children}</QueryClientProvider>
			</MeStoreProvider>
		</>
	);
};
