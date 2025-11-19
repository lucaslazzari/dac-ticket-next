// app/(app)/customers/layout.tsx  (server component)
import React from "react";
import { redirect, unauthorized } from "next/navigation";
import { AppShell } from "@/modules/layout"; // seu componente shell
import AuthProviderClient from "@/modules/auth/components/AuthProviderClient";
import { headers } from "next/headers";

export default async function LogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
//   const h = await headers(); // NÃO é async
//   const cookieHeader = h.get("cookie") ?? "";
//   const hasDacRefresh = cookieHeader.split(";").some(cookie => cookie.trim().startsWith("dac_refresh="));

//   if (!hasDacRefresh) {
//     return redirect("/login");
//   }

  // se passou nas checagens, renderiza o layout (pode reutilizar AppShell)
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}
