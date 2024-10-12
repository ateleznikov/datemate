import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  user: null | object;
  setAuth: (user: object) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (user) => set({ isAuthenticated: true, user }),
  clearAuth: () => set({ isAuthenticated: false, user: null }),
}));