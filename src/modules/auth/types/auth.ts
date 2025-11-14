export type Auth = {
  id: number;
  email: string;
  name?: string | null;
  role?: string | null;
  permissions?: string[] | null;
};