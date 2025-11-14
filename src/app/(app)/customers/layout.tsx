// app/(app)/customers/layout.tsx  (server component)
import React from "react";
import { redirect, unauthorized } from "next/navigation";
import { AppShell } from "@/modules/layout"; // seu componente shell
import { getCurrentUserFromCookies } from "@/modules/auth/server/GetCurrentUserFromCookies";
import type { Auth } from "@/modules/auth/types/auth"; // ajuste o path conforme seu projeto
import AuthProviderClient from "@/modules/auth/components/AuthProviderClient";
import { headers } from "next/headers";

export default async function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers(); // NÃO é async
  const cookieHeader = h.get("cookie");

  if (!cookieHeader) return redirect("/login");

  // se passou nas checagens, renderiza o layout (pode reutilizar AppShell)
  return (
    <AppShell>
      <AuthProviderClient allowedRoles={["Administrator", "Manager"]}>{children}</AuthProviderClient>
    </AppShell>
  );
}
