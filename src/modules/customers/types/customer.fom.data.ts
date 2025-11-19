export interface CustomerFormData {
  name: string;
  blulogixAccountNumber: string;
  carrierAccountNumber: string;
  status: 'Active' | 'Inactive';
  products?: number[];
  actions?: string[];
}