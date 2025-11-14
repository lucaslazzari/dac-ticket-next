
import React from "react";
import { redirect, unauthorized } from "next/navigation";
import { AppShell } from "@/modules/layout"; 
import { getCurrentUserFromCookies } from "@/modules/auth/server/GetCurrentUserFromCookies";
import type { Auth } from "@/modules/auth/types/auth";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const user: Auth | null = await getCurrentUserFromCookies();

  // se não autenticado -> redireciona para login
  if (!user) {
    return redirect("/login");
  }

  // valida role (use a string exata que seu backend retorna)
  if (user.role !== "Administrator") {
    return redirect("/login");
  }

  // se passou nas checagens, renderiza o layout (pode reutilizar AppShell)
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}