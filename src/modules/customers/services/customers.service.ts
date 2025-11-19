import { Customer } from "../types/customer";
import { CustomerCreated } from "../types/customer.created";
import { CustomerFormData } from "../types/customer.fom.data";
import { CustomerStats } from "../types/customer.stats";
import { Product } from "../types/product";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

const MOCK_DATA: Customer[] = [
  {
    id: 1,
    name: "Trimble Inc.",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 2,
    name: "Mary Santos",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 3,
    name: "Peter Costa",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Anna Oliveira",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 5,
    name: "Carlos Lima",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 6,
    name: "Julia Ferreira",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
    actions: ["Activate", "Deactivate"],
  },
  {
    id: 7,
    name: "Roberto Alves",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Patricia Souza",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 9,
    name: "Fernando Costa",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 10,
    name: "Mariana Lima",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
  {
    id: 11,
    name: "Lucas Martins",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Inactive",
  },
  {
    id: 12,
    name: "Amanda Silva",
    blulogixAccountNumber: "D119-0012895",
    carrierAccountNumber: "telna001",
    status: "Active",
  },
];

const CUSTOMER_PRODUCTS: Record<number, Set<number>> = {
  1: new Set([1, 2]),
  2: new Set([2]),
  3: new Set(),
  4: new Set([1, 3]),
  5: new Set([3]),
};

function delay(ms = 200) {
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
  updateCustomer(
    id: number,
    payload: Partial<Customer>
  ): Promise<Customer | null>;
  addProductsToCustomer(
    customerId: number,
    productIds: number[]
  ): Promise<Customer | null>;
  removeProductFromCustomer(
    customerId: number,
    productId: number
  ): Promise<Customer | null>;
  getStats(): Promise<CustomerStats>;
  create(data: CustomerFormData): Promise<CustomerCreated>;
}

export const customersService: CustomersService = {
  async list(params) {
    const query = new URLSearchParams();

    if (params?.search) query.append("search", params.search);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.perPage) query.append("perPage", params.perPage.toString());

    const res = await fetch(`${API_BASE}/api/Customer?${query.toString()}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res: ", res);

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

  async create(data: CustomerFormData): Promise<CustomerCreated> {
    console.log("data", data);
    const res = await fetch(`${API_BASE}/api/Customer`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to create customer: ${res.statusText}`);
    }

    return await res.json();
  },

  async getById(id: number): Promise<Customer | null> {
    const res = await fetch(`${API_BASE}/api/Customer/${id}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return null;
    }

    const customer = await res.json();
    return customer;
  },

  async getStats(): Promise<CustomerStats> {
    const res = await fetch(`${API_BASE}/api/Customer/stats`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch customer stats: ${res.statusText}`);
    }

    return await res.json();
  },

  async updateCustomer(id: number, payload: Partial<Customer>) {
    await delay(200);
    const index = MOCK_DATA.findIndex((c) => c.id === id);
    if (index === -1) return null;
    MOCK_DATA[index] = { ...MOCK_DATA[index], ...payload };
    return MOCK_DATA[index];
  },

  async addProductsToCustomer(customerId: number, productIds: number[]) {
    await delay(200); // simula tempo de processamento

    if (!CUSTOMER_PRODUCTS[customerId])
      CUSTOMER_PRODUCTS[customerId] = new Set();

    productIds.forEach((id) => CUSTOMER_PRODUCTS[customerId].add(id));

    return this.getById(customerId);
  },

  async removeProductFromCustomer(customerId: number, productId: number) {
    await delay(200);
    CUSTOMER_PRODUCTS[customerId]?.delete(productId);
    return this.getById(customerId);
  }
};
