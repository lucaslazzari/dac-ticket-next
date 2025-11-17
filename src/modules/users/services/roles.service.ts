import { Role } from '../types/role';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

export interface RolesService {
  list(): Promise<Role[]>;
}

export const rolesService: RolesService = {
  async list() {
    const res = await fetch(`${API_BASE}/api/Role`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch roles: ${res.statusText}`);
    }

    return await res.json();
  },
};