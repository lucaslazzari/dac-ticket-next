// src/modules/auth/services/apiClient.ts
const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
const pendingResolvers: Array<() => void> = [];
let onRefreshSuccessCallback: (() => void) | null = null;

export function setOnRefreshSuccess(cb: () => void) {
  onRefreshSuccessCallback = cb;
}

async function doRefresh(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;
  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) return false;
      try { onRefreshSuccessCallback?.(); } catch {}
      return true;
    } catch {
      return false;
    } finally {
      isRefreshing = false;
    }
  })();

  const r = await refreshPromise;
  refreshPromise = null;
  pendingResolvers.splice(0).forEach(r => r());
  return r;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" && (input.startsWith("http://") || input.startsWith("https://")) ? input : `${API_BASE}${input}`;
  const merged: RequestInit = {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  };

  let res = await fetch(url, merged);

  if (res.status !== 401) return res;

  const refreshed = await doRefresh();
  if (!refreshed) return res;

  if (isRefreshing) {
    await new Promise<void>(resolve => pendingResolvers.push(resolve));
  }

  res = await fetch(url, merged);
  return res;
}

export async function apiFetchJson<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await apiFetch(input, init);
  if (!res.ok) {
    const txt = await res.text();
    let body: any = txt;
    try { body = JSON.parse(txt); } catch {}
    const err: any = new Error(res.statusText || "Request failed");
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return (await res.json()) as T;
}

// Fetch para server component (server-side)
export async function apiFetchJsonServer<T = any>(input: string, cookieHeader?: string): Promise<T> {
  const url = input.startsWith("http://") || input.startsWith("https://") ? input : `${API_BASE}${input}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    const txt = await res.text();
    let body: any = txt;
    try { body = JSON.parse(txt); } catch {}
    const err: any = new Error(res.statusText || "Request failed");
    (err as any).status = res.status;
    (err as any).body = body;
    throw err;
  }

  return res.json() as Promise<T>;
}