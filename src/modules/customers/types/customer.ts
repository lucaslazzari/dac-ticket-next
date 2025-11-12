import { Product } from "./product";

export interface Customer {
  id: number;
  name: string;
  blulogixAccountNumber: string;
  carrierAccountNumber: string;
  status: 'Active' | 'Inactive';
  products?: Product[];
}