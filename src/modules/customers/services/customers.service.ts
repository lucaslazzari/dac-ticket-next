import { Customer } from '../types/customer';

const MOCK_DATA: Customer[] = [
  { id: 1, name: 'John Silva', email: 'john@email.com', status: 'Active', tickets: 12 },
  { id: 2, name: 'Mary Santos', email: 'mary@email.com', status: 'Active', tickets: 8 },
  { id: 3, name: 'Peter Costa', email: 'peter@email.com', status: 'Inactive', tickets: 3 },
  { id: 4, name: 'Anna Oliveira', email: 'anna@email.com', status: 'Active', tickets: 15 },
  { id: 5, name: 'Carlos Lima', email: 'carlos@email.com', status: 'Active', tickets: 7 },
  { id: 6, name: 'Julia Ferreira', email: 'julia@email.com', status: 'Active', tickets: 22 },
  { id: 7, name: 'Roberto Alves', email: 'roberto@email.com', status: 'Inactive', tickets: 5 },
  { id: 8, name: 'Patricia Souza', email: 'patricia@email.com', status: 'Active', tickets: 18 },
  { id: 9, name: 'Fernando Costa', email: 'fernando@email.com', status: 'Active', tickets: 9 },
  { id: 10, name: 'Mariana Lima', email: 'mariana@email.com', status: 'Active', tickets: 14 },
  { id: 11, name: 'Lucas Martins', email: 'lucas@email.com', status: 'Inactive', tickets: 2 },
  { id: 12, name: 'Amanda Silva', email: 'amanda@email.com', status: 'Active', tickets: 11 },
];

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export interface CustomersService {
  list(params?: { search?: string; page?: number; perPage?: number }): Promise<{
    data: Customer[];
    total: number;
    page: number;
    perPage: number;
  }>;
  getById(id: number): Promise<Customer | null>;
}

export const customersServiceMock: CustomersService = {
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
          c.status.toLowerCase().includes(search)
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
};