import { Product } from '../types/product';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE ?? "").trim();

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Product A', productCode: 'P-A-001', termLength: 12, provider: 'Provider X' },
  { id: 2, name: 'Product B', productCode: 'P-B-002', termLength: 24, provider: 'Provider Y' },
  { id: 3, name: 'Product C', productCode: 'P-C-003', termLength: 6, provider: 'Provider Z' },
];

function delay(ms = 200) {
  return new Promise((res) => setTimeout(res, ms));
}

export interface ProductsService {
  list(): Promise<Product[]>;
}

export const productsService: ProductsService = {
  async list() {
    const res = await fetch(`${API_BASE}/api/Product`, {
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