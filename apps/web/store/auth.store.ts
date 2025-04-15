// Zustand store for auth

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session, AuthError } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;

  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setInitialized: (initialized: boolean) => void;

  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  initialized: false,

  setUser: user => set({ user }),
  setSession: session => set({ session }),
  setError: error => set({ error }),
  setLoading: isLoading => set({ isLoading }),
  setInitialized: initialized => set({ initialized }),

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, session: null });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  },

  initialize: async () => {
    set({ isLoading: true });
    try {
      const { data } = await supabase.auth.getSession();
      set({
        session: data.session,
        user: data.session?.user || null,
        initialized: true,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
