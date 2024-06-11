/* eslint-disable no-unused-vars */
import { User } from '@products-app/schemas';
import { createStore } from 'zustand/vanilla';

export type MeStoreState = {
	user: User | null;
};

export type MeStoreActions = {
	setUser: (value: User) => void;
};

export type MeStore = MeStoreState & MeStoreActions;

export const createMeStore = (initialState: MeStoreState = { user: null }) =>
	createStore<MeStore>()(set => ({
		...initialState,
		setUser: value => set(() => ({ user: value })),
	}));
