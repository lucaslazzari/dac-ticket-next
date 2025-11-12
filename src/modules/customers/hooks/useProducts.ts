'use client';

import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { productsServiceMock } from '../services/products.service';

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    productsServiceMock.list().then((res) => {
      if (!cancelled) setData(res);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}