import { Product } from '../types/product';

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

export const productsServiceMock: ProductsService = {
  async list() {
    await delay(200);
    return MOCK_PRODUCTS.slice();
  },
};