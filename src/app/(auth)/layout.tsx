// app/(auth)/layout.tsx
import React from "react";
import AuthProviderClient from "@/modules/auth/components/AuthProviderClient";
import { getCurrentUserFromCookies } from "@/modules/auth/server/GetCurrentUserFromCookies";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  let initialUser = null;
  try {
    initialUser = await getCurrentUserFromCookies();
    // opcional: console.log só aparece no servidor
    console.log("AuthLayout initialUser:", initialUser);
  } catch (err) {
    console.error("getCurrentUserFromCookies failed:", err);
    initialUser = null;
  }

  return (
    <AuthProviderClient initialUser={initialUser}>
      {children}
    </AuthProviderClient>
  );
}