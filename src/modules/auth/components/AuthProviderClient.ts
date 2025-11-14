// src/modules/auth/components/AuthProviderClient.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/auth.service";
import { Auth } from "../types/auth";
import { setOnRefreshSuccess } from "../services/api.client";

type AuthContextType = {
  user: Auth | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (perm: string) => boolean;
  hasRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProviderClient({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: Auth | null;
}) {
  const [user, setUser] = useState<Auth | null | undefined>(initialUser);
  const [loading, setLoading] = useState<boolean>(initialUser === undefined);

  console.log("AuthProviderClient renderizado", { initialUser }); // Log adicionado

  async function refreshUser() {
    setLoading(true);
    try {
      const u = await authService.meApi();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setOnRefreshSuccess(() => {
      refreshUser().catch(() => {});
    });

    if (initialUser === undefined) {
      refreshUser();
    } else {
      setLoading(false);
      setUser(initialUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(email: string, password: string) {
    console.log("Tentando login com", { email }); // Log adicionado
    setLoading(true);
    try {
      const u = await authService.loginApi(email, password);
      console.log("Login bem-sucedido", { user: u }); // Log adicionado
      setUser(u);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    try {
      await authService.logoutApi();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  function hasPermission(perm: string) {
    return !!user?.permissions?.includes(perm);
  }

  function hasRole(role: string) {
    return user?.role === role;
  }

  const value: AuthContextType = {
    user: user ?? null,
    loading,
    login,
    logout,
    refreshUser,
    hasPermission,
    hasRole,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

// Hook para consumir o contexto
export function useAuth() {
  console.log("useAuth chamado"); // Log adicionado
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProviderClient");
  return ctx;
}
