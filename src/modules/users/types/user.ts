export interface User {
  id: number;
  name: string;
  email: string;
  role: 'Administrator' | 'Manager' | 'Support' | 'User';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}