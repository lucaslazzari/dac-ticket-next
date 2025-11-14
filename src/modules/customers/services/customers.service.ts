import { Customer } from "../types/customer";
import { CustomerStats } from "../types/customer.stats";
import { Product } from "../types/product";

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
}

export const customersServiceMock: CustomersService = {
  async list(params) {
    const search = params?.search?.toLowerCase().trim() ?? "";
    const page = params?.page ?? 1;
    const perPage = params?.perPage ?? 5;

    await delay(300);

    let filtered = MOCK_DATA;
    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.blulogixAccountNumber.toLowerCase().includes(search) ||
          c.carrierAccountNumber.toLowerCase().includes(search) ||
          c.status.toLowerCase().includes(search)
      );
    }

    const total = filtered.length;
    const start = (page - 1) * perPage;
    const data = filtered.slice(start, start + perPage);

    return { data, total, page, perPage };
  },

  async getById(id: number) {
    await delay(200);
    const customer = MOCK_DATA.find((c) => c.id === id);
    if (!customer) return null;

    const productIds = Array.from(CUSTOMER_PRODUCTS[id] ?? new Set<number>());
    const products = (
      await import("./products.service")
    ).productsServiceMock.list();
    const allProducts = await products;
    const customerProducts = allProducts.filter((p) =>
      productIds.includes(p.id)
    );

    return { ...customer, products: customerProducts };
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
  },

  async getStats(): Promise<CustomerStats> {
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
