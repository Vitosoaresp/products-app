'use client';

import { MeStore, createMeStore } from '@/store/me';
import { createContext, useRef } from 'react';
import { StoreApi } from 'zustand/vanilla';

export const MeStoreContext = createContext<StoreApi<MeStore> | null>(null);

export const MeStoreProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const storeRef = useRef<StoreApi<MeStore>>();
	if (!storeRef.current) {
		storeRef.current = createMeStore();
	}

	return (
		<MeStoreContext.Provider value={storeRef.current}>
			{children}
		</MeStoreContext.Provider>
	);
};
