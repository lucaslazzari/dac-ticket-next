import { useState, useEffect } from "react";
import { meApi, logoutApi } from "@/modules/auth/services/auth.service";
import { Auth } from "@/modules/auth/types/auth";

export function useAuth() {
  const [user, setUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    meApi()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  return { user, loading, logout };
}