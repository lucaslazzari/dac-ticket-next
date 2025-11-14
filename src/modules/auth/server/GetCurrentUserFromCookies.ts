// src/modules/auth/server/GetCurrentUserFromCookies.ts
import { headers } from "next/headers";
import { Auth } from "../types/auth";

const API_BASE = (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

async function fetchWithCookie(url: string, cookieHeader?: string, options: RequestInit = {}) {
  // Garante que headers são do tipo certo
  const headersObj: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (cookieHeader) headersObj["cookie"] = cookieHeader;

  const res = await fetch(`${API_BASE}${url}`, {
    credentials: "include",
    headers: headersObj,
    ...options,
  });
  return res;
}

export async function getCurrentUserFromCookies(): Promise<Auth | null> {
  try {
    const h = await headers(); // NÃO é async
    const cookieHeader = h.get("cookie");

    if (!cookieHeader) {
      console.log("Nenhum cookie encontrado no header.");
      return null;
    }

    // 1️⃣ Tenta pegar usuário
    let res = await fetchWithCookie("/api/Auth/me", cookieHeader);

    if (res.status === 401) {
      // 2️⃣ Se não autorizado, tenta refresh
      const refreshRes = await fetchWithCookie("/api/Auth/refresh", cookieHeader, { method: "POST" });

      if (!refreshRes.ok) {
        // Refresh falhou → usuário não autenticado
        return null;
      }

      // 3️⃣ Tenta novamente /me após refresh
      res = await fetchWithCookie("/api/Auth/me", cookieHeader);

      if (!res.ok) {
        return null;
      }
    }

    return (await res.json()) as Auth;
  } catch (err) {
    console.error("Erro ao obter usuário:", err);
    return null;
  }
}
