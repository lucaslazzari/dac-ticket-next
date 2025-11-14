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
  allowedRoles = [],
}: {
  children: React.ReactNode;
  initialUser?: Auth | null;
  allowedRoles?: string[];
}) {
  const [user, setUser] = useState<Auth | null | undefined>(initialUser);
  const [loading, setLoading] = useState<boolean>(initialUser === undefined);

  console.log("AuthProviderClient renderizado", { initialUser }); // Log adicionado

  async function refreshUser() {
    setLoading(true);
    try {
      let u: Auth | null = null;

      try {
        u = await authService.meApi(); // tenta pegar usuário atual
      } catch (err: any) {
        if (err.status === 401) {
          // token expirou → tenta refresh
          u = await authService.refreshApi(); // chama /refresh
          if (u) {
            // refresh ok → pega /me novamente
            u = await authService.meApi();
          } else {
            u = null; // refresh falhou
          }
        } else {
          throw err;
        }
      }

      // valida roles permitidas
      if (allowedRoles.length && u && !allowedRoles.includes(u.role ?? "")) {
        window.location.href = "/login"; // redireciona se não tiver role
        return;
      }

      setUser(u);
    } catch {
      setUser(null);
      window.location.href = "/login"; // se erro → logout
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setOnRefreshSuccess(() => {
      refreshUser().catch(() => {});
    });

    refreshUser(); // chama refreshUser no mount
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
