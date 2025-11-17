import { User } from "../types/user";
import { UserCreated } from "../types/user.created";
import { UserFormData } from "../types/user.form.data";
import { UserStats } from "../types/user.stats";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

const MOCK_DATA: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@dac.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2024-11-05",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@dac.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-11-04",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@dac.com",
    role: "Support",
    status: "Active",
    lastLogin: "2024-11-05",
  },
  {
    id: 4,
    name: "Bob Wilson",
    email: "bob@dac.com",
    role: "Support",
    status: "Inactive",
    lastLogin: "2024-10-28",
  },
  {
    id: 5,
    name: "Alice Johnson",
    email: "alice@dac.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-11-06",
  },
  {
    id: 6,
    name: "Charlie Brown",
    email: "charlie@dac.com",
    role: "Support",
    status: "Active",
    lastLogin: "2024-11-03",
  },
  {
    id: 7,
    name: "Diana Prince",
    email: "diana@dac.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-11-05",
  },
  {
    id: 8,
    name: "Edward Norton",
    email: "edward@dac.com",
    role: "Support",
    status: "Inactive",
    lastLogin: "2024-10-15",
  },
  {
    id: 9,
    name: "Fiona Green",
    email: "fiona@dac.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-11-06",
  },
  {
    id: 10,
    name: "George Miller",
    email: "george@dac.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-11-04",
  },
  {
    id: 11,
    name: "Hannah White",
    email: "hannah@dac.com",
    role: "Support",
    status: "Active",
    lastLogin: "2024-11-05",
  },
  {
    id: 12,
    name: "Ian Black",
    email: "ian@dac.com",
    role: "Administrator",
    status: "Active",
    lastLogin: "2024-11-06",
  },
];

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export interface UsersService {
  list(params?: { search?: string; page?: number; perPage?: number }): Promise<{
    data: User[];
    total: number;
    page: number;
    perPage: number;
  }>;

  getById(id: number): Promise<User | null>;

  getStats(): Promise<UserStats>;
  create(data: UserFormData): Promise<UserCreated>
}

export const usersService: UsersService = {
  async list(params) {
    const query = new URLSearchParams();

    if (params?.search) query.append("search", params.search);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.perPage) query.append("perPage", params.perPage.toString());

    const res = await fetch(`${API_BASE}/api/User?${query.toString()}`, {
      credentials: "include", // se usar cookies para auth
      headers: {
        "Content-Type": "application/json",
        // Adicione token Authorization se usar JWT Bearer
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.statusText}`);
    }

    const json = await res.json();

    // Ajuste conforme o formato que sua API retorna
    return {
      data: json.data,
      total: json.total,
      page: json.page,
      perPage: json.perPage,
    };
  },

  async getById(id: number) {
    await delay(200);
    return MOCK_DATA.find((c) => c.id === id) ?? null;
  },

  async getStats(): Promise<UserStats> {
    const res = await fetch(`${API_BASE}/api/User/stats`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch user stats: ${res.statusText}`);
    }

    return await res.json();
  },

  async create(data: UserFormData): Promise<UserCreated> {
    const res = await fetch(`${API_BASE}/api/User`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to create user: ${res.statusText}`);
    }

    return await res.json();
  },
};
