"use client";

import { useEffect, useState } from "react";
import { CustomerDetailHeader } from "../components/details/CustomerDetailHeader";
import { CustomerEditForm } from "../components/details/CustomerEditForm";
import { CustomerProductsSection } from "../components/details/CustomerProductsSection";
import { useCustomerDetail } from "../hooks/useCustomerDetail";
import { useProducts } from "../hooks/useProducts";
import { customersService } from "../services/customers.service";
import type { Product } from "@/modules/customers/types/product";

export default function DetailsPage({ customerId }: { customerId: number }) {
  const { data: customerData, loading } = useCustomerDetail(customerId);
  const { data: allProducts } = useProducts();

  const [mutating, setMutating] = useState(false);
  const [customer, setCustomer] = useState(customerData);

  useEffect(() => {
    if (customerData) setCustomer(customerData);
  }, [customerData]);

  const handleSave = async (payload: any) => {
    if (!customerId) return;
    setMutating(true);
    try {
      await customersService.updateCustomer(customerId, payload);
      setCustomer((prev) => ({ ...prev, ...payload }));
    } finally {
      setMutating(false);
    }
  };

  // Adiciona múltiplos produtos de uma vez
  const handleAddBulk = async (productIds: number[]) => {
    if (!customerId || !allProducts) return;
    setMutating(true);
    try {
      // envia ao serviço
      await customersService.addProductsToCustomer(customerId, productIds);

      // atualiza incrementalmente
      setCustomer((prev) => {
        if (!prev) return prev;
        const newProducts = allProducts.filter((p) =>
          productIds.includes(p.id)
        );
        return {
          ...prev,
          products: [...(prev.products ?? []), ...newProducts],
        };
      });
    } finally {
      setMutating(false);
    }
  };

  const handleRemove = async (productId: number) => {
    if (!customerId) return;
    setMutating(true);
    try {
      await customersService.removeProductFromCustomer(
        customerId,
        productId
      );
      setCustomer((prev) =>
        prev
          ? {
              ...prev,
              products: (prev.products ?? []).filter((p) => p.id !== productId),
            }
          : prev
      );
    } finally {
      setMutating(false);
    }
  };

  if (loading) return <div className="p-6">Loading customer...</div>;
  if (!customer) return <div className="p-6">Customer not found</div>;

  return (
    <div className="space-y-6 p-6">
      <CustomerDetailHeader title="Customer" />

      <CustomerEditForm
        customer={{
          name: customer.name,
          blulogixAccountNumber: customer.blulogixAccountNumber,
          carrierAccountNumber: customer.carrierAccountNumber,
          status: customer.status,
          actions: customer.actions || []
        }}
        onSave={handleSave}
        loading={mutating}
      />

      <CustomerProductsSection
        products={customer.products ?? []}
        availableProducts={allProducts ?? []}
        onAdd={() => {}} // stub vazio
        onAddBulk={handleAddBulk}
        onRemove={handleRemove}
        loading={mutating}
      />
    </div>
  );
}
