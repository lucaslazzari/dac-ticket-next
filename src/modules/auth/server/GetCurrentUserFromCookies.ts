import { headers } from "next/headers";
import { Auth } from "../types/auth";

const API_BASE = (process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

export async function getCurrentUserFromCookies(): Promise<Auth | null> {
  try {
    const h = await headers(); // NÃO é async
    const cookieHeader = h.get("cookie");

    if (!cookieHeader) {
      console.log("Nenhum cookie encontrado no header.");
      return null;
    }

    const res = await fetch(`${API_BASE}/api/Auth/me`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
      headers: {
        cookie: cookieHeader
      }
    });

    if (!res.ok) return null;

    return (await res.json()) as Auth;
  } catch (err) {
    console.error("Erro:", err);
    return null;
  }
}
