import { useState } from 'react';
import { usersService } from '../services/users.service';
import { UserCreated } from '../types/user.created';
import { UserFormData } from '../types/user.form.data';

export function useCreateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createUser = async (data: UserFormData): Promise<UserCreated> => {
    setLoading(true);
    setError(null);
    try {
      const createdUser = await usersService.create(data);
      return createdUser;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
}