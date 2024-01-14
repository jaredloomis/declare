import { create } from 'zustand';
import { User } from './gql/graphql';

export interface AuthStore {
  user: User | undefined;
  token: string | undefined;
  setUser: (user: any | undefined) => void;
  setToken: (token: string | undefined) => void;
}

export const useAuthStore = create<AuthStore>(set => ({
  user: undefined,
  token: localStorage.getItem('declare_token') || undefined,
  setUser: (user: any | undefined) => set({ user }),
  setToken: (token: string | undefined) => {
    if (!token) {
      localStorage.removeItem('declare_token');
    } else {
      localStorage.setItem('declare_token', token);
    }
    set({ token });
  },
}));
