'use client';

import { MeStoreContext } from '@/providers/me-provider';
import { MeStore } from '@/store/me';
import { useContext } from 'react';
import { useStore } from 'zustand';

export const useMeStore = <T>(selector: (store: MeStore) => T): T => {
	const context = useContext(MeStoreContext);

	if (!context) {
		throw new Error('useMeStore must be used within a MeProvider');
	}

	return useStore(context, selector);
};
