// src/modules/auth/services/authService.ts
import { apiFetchJson } from "./api.client";
import { Auth } from "../types/auth";

export async function loginApi(email: string, password: string): Promise<Auth> {
  return apiFetchJson<Auth>("/api/Auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export async function logoutApi(): Promise<void> {
  await apiFetchJson("/api/Auth/logout", { method: "POST" });
}

export async function meApi(): Promise<Auth> {
  return apiFetchJson<Auth>("/api/Auth/me", { method: "GET" });
}
