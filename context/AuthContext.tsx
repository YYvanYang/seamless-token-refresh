"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';

interface AuthContextProps {
  user: jwt.JwtPayload | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  initialUser: jwt.JwtPayload | null;
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ initialUser, children }: AuthProviderProps) => {
  const [user, setUser] = useState<jwt.JwtPayload | null>(initialUser);
  const router = useRouter();

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const { accessToken } = await res.json();

      const userData = jwt.decode(accessToken) as jwt.JwtPayload;
      setUser(userData);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
