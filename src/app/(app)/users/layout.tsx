import React from "react";
import { redirect, unauthorized } from "next/navigation";
import { AppShell } from "@/modules/layout";
import { headers } from "next/headers";
import AuthProviderClient from "@/modules/auth/components/AuthProviderClient";

export default async function UsersLayout({
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
      <AuthProviderClient allowedRoles={["Administrator"]}>
        {children}
      </AuthProviderClient>
    </AppShell>
  );
}
