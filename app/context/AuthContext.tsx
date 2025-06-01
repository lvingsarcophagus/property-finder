"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "../../lib/supabaseClient"; // Import Supabase client
import type { AuthChangeEvent, Session, User as SupabaseUser, Provider } from '@supabase/supabase-js'; // Import Supabase types

// Keep your existing User type or adapt it. For simplicity, we'll map SupabaseUser to it.
type User = {
  id: string;
  name: string; // Supabase user might not have 'name' by default, consider user_metadata
  email: string | undefined; // email can be undefined
};

type AuthContextType = {
  user: User | null;
  session: Session | null; // Add session state
  isAuthenticated: boolean; // Can be derived from user/session
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  signInWithOAuth: (provider: Provider) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true);
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      if (currentSession?.user) {
        setUser({
          id: currentSession.user.id,
          name: currentSession.user.user_metadata?.full_name || currentSession.user.email?.split('@')[0] || 'User',
          email: currentSession.user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession);
        if (newSession?.user) {
          setUser({
            id: newSession.user.id,
            name: newSession.user.user_metadata?.full_name || newSession.user.email?.split('@')[0] || 'User',
            email: newSession.user.email,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // You can add options here, like redirect URL or metadata
      // options: {
      //   emailRedirectTo: `${window.location.origin}/`,
      // }
    });
    // If sign up is successful, Supabase sends a confirmation email.
    // The user state will be updated by onAuthStateChange when the user confirms.
    setLoading(false);
    return { error };
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    // User and session will be set to null by onAuthStateChange
    setLoading(false);
  };

  const signInWithOAuth = async (provider: Provider) => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/`, // Or your desired callback URL
      },
    });
    // Supabase handles the redirect and user state will be updated by onAuthStateChange
    // setLoading(false); // Page will redirect, so loading state might not be relevant here
  };
  
  const isAuthenticated = !!user && !!session;

  return (
    <AuthContext.Provider value={{ user, session, isAuthenticated, login, signUp, logout, signInWithOAuth }}>
      {!loading ? children : <div>Loading...</div>} {/* Basic loading indicator */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

