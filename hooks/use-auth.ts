'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/v1/auth/me');
        if (response.ok) {
          const data = await response.json();
          setState({
            user: data.user,
            isLoading: false,
            isAuthenticated: true,
          });
        } else {
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setState((s) => ({ ...s, isLoading: true }));

        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Login failed');
        }

        const data = await response.json();
        setState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        });

        toast.success('Logged in successfully');
        router.push('/dashboard');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An error occurred';
        toast.error(message);
        setState((s) => ({ ...s, isLoading: false }));
      }
    },
    [router]
  );

  const register = useCallback(
    async (email: string, password: string, full_name: string) => {
      try {
        setState((s) => ({ ...s, isLoading: true }));

        const response = await fetch('/api/v1/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, full_name }),
          credentials: 'include',
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Registration failed');
        }

        const data = await response.json();
        setState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
        });

        toast.success('Account created successfully');
        router.push('/dashboard');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'An error occurred';
        toast.error(message);
        setState((s) => ({ ...s, isLoading: false }));
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      setState((s) => ({ ...s, isLoading: true }));

      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });

      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'An error occurred';
      toast.error(message);
      setState((s) => ({ ...s, isLoading: false }));
    }
  }, [router]);

  return {
    ...state,
    login,
    register,
    logout,
  };
}
