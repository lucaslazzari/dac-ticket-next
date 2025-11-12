import { User } from '../types/user';
import { UserStats } from '../types/user.stats';

const MOCK_DATA: User[] = [
  { id: 1, name: 'Admin User', email: 'admin@dac.com', role: 'Administrator', status: 'Active', lastLogin: '2024-11-05' },
    { id: 2, name: 'John Doe', email: 'john@dac.com', role: 'Manager', status: 'Active', lastLogin: '2024-11-04' },
    { id: 3, name: 'Jane Smith', email: 'jane@dac.com', role: 'Support', status: 'Active', lastLogin: '2024-11-05' },
    { id: 4, name: 'Bob Wilson', email: 'bob@dac.com', role: 'Support', status: 'Inactive', lastLogin: '2024-10-28' },
    { id: 5, name: 'Alice Johnson', email: 'alice@dac.com', role: 'Manager', status: 'Active', lastLogin: '2024-11-06' },
    { id: 6, name: 'Charlie Brown', email: 'charlie@dac.com', role: 'Support', status: 'Active', lastLogin: '2024-11-03' },
    { id: 7, name: 'Diana Prince', email: 'diana@dac.com', role: 'User', status: 'Active', lastLogin: '2024-11-05' },
    { id: 8, name: 'Edward Norton', email: 'edward@dac.com', role: 'Support', status: 'Inactive', lastLogin: '2024-10-15' },
    { id: 9, name: 'Fiona Green', email: 'fiona@dac.com', role: 'Manager', status: 'Active', lastLogin: '2024-11-06' },
    { id: 10, name: 'George Miller', email: 'george@dac.com', role: 'User', status: 'Active', lastLogin: '2024-11-04' },
    { id: 11, name: 'Hannah White', email: 'hannah@dac.com', role: 'Support', status: 'Active', lastLogin: '2024-11-05' },
    { id: 12, name: 'Ian Black', email: 'ian@dac.com', role: 'Administrator', status: 'Active', lastLogin: '2024-11-06' }
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
}

export const usersServiceMock: UsersService = {
  async list(params) {
    const search = params?.search?.toLowerCase().trim() ?? '';
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 5;

    await delay(300); // simula latência

    let filtered = MOCK_DATA;
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search) ||
          c.role.toLowerCase().includes(search) ||
          c.status.toLowerCase().includes(search) ||
          c.lastLogin.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const data = filtered.slice(start, end);

    return { data, total, page, perPage };
  },

  async getById(id: number) {
    await delay(200);
    return MOCK_DATA.find((c) => c.id === id) ?? null;
  },

  async getStats(): Promise<UserStats> {
    await delay(200);
    const total = MOCK_DATA.length;
    const active = MOCK_DATA.filter((u) => u.status === 'Active').length;
    const inactive = total - active;

    return {
      total,
      active,
      inactive
    };
  },
};