'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { supabase } from '@/lib/supabase';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { 
    initialize, 
    setUser, 
    setSession,
    initialized
  } = useAuthStore();

  // Initialize auth state on first load
  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialize, initialized]);

  // Set up auth state listeners
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setSession(session);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession]);

  return <>{children}</>;
} 