import { useState, useEffect } from "react";
import { Role } from "../types/role";
import { rolesService } from "../services/roles.service";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    rolesService.list()
      .then((data) => {
        if (!canceled) setRoles(data);
      })
      .catch((err) => {
        if (!canceled) setError(err);
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, []);

  return { roles, loading, error };
}