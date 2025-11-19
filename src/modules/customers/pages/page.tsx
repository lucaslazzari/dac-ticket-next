"use client";

import { useState } from "react";

import { CustomersTable } from "../components/CustomersTable";
import { CustomersFilters } from "../components/CustomersFilters";
import { CustomersPagination } from "../components/CustomersPagination";
import { useCustomers } from "../hooks/useCustomers";
import { CustomersHeader } from "../components/CustomersHeader";
import { useProducts } from "@/modules/customers/hooks/useProducts";

import { CustomerCreateModal } from "../components/new/CustomerCreateModal";
import { useStats } from "@/modules/customers/hooks/useStats";
import { CustomersStats } from "../components/CustomersStats";

import { useCreateCustomer } from "../hooks/useCreateCustomer";
import { CustomerFormData } from "../types/customer.fom.data";
import { CustomerCreated } from "../types/customer.created";

export default function CustomersPage() {
  const { data, total, loading, params, setParams } = useCustomers({
    page: 1,
    perPage: 5,
  });

  const { data: products, loading: productsLoading } = useProducts();
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);
  const { data: stats, loading: statsLoading } = useStats(statsRefreshKey);

  const [openModal, setOpenModal] = useState(false);
  const [createdCustomer, setCreatedCustomer] =
    useState<CustomerCreated | null>(null);

  const {
    createCustomer,
    loading: creating,
    error: createError,
  } = useCreateCustomer();

  const handleCreateCustomer = async (
    data: CustomerFormData,
    productIds: number[],
    actions: string[]
  ) => {
    try {
      const created = await createCustomer({
        name: data.name,
        blulogixAccountNumber: data.blulogixAccountNumber,
        carrierAccountNumber: data.carrierAccountNumber,
        status: data.status,
        products: productIds,
        actions: actions, // ajuste conforme necessário
      });
      setCreatedCustomer(created);

      setParams((p) => ({ ...p })); // atualiza lista
      setStatsRefreshKey((k) => k + 1); // atualiza stats

      return created;
    } catch (err) {
      alert("Failed to create customer");
      throw err;
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCreatedCustomer(null);
  };

  const perPage = params.perPage ?? 5;
  const currentPage = params.page ?? 1;
  const totalPages = Math.ceil(total / perPage);
  const indexOfFirst = (currentPage - 1) * perPage;
  const indexOfLast = indexOfFirst + perPage;

  return (
    <div className="space-y-6">
      <CustomersHeader onNewCustomer={() => setOpenModal(true)} />

      {statsLoading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <p className="text-gray-500">Loading stats...</p>
        </div>
      ) : (
        <CustomersStats stats={stats ?? { total: 0, active: 0, inactive: 0 }} />
      )}

      <CustomersFilters
        onSearch={(q) => setParams((p) => ({ ...p, search: q, page: 1 }))}
      />

      {loading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44C0CF] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12">
          <div className="text-center">
            <p className="text-gray-500">No customers found</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <CustomersTable customers={data} />
          </div>

          <CustomersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirst={indexOfFirst}
            indexOfLast={indexOfLast}
            totalItems={total}
            itemsPerPage={perPage}
            onPageChange={(page) => setParams((p) => ({ ...p, page }))}
            onItemsPerPageChange={(perPage) =>
              setParams((p) => ({ ...p, perPage, page: 1 }))
            }
          />
        </>
      )}

      <CustomerCreateModal
        open={openModal}
        onClose={handleCloseModal}
        availableProducts={products ?? []}
        onCreate={handleCreateCustomer}
        loading={creating}
        createdCustomer={createdCustomer} // <== passe aqui
      />
    </div>
  );
}
