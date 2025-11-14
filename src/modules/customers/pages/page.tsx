"use client";

import { useState } from "react";

import { CustomersTable } from "../components/CustomersTable";
import { CustomersFilters } from "../components/CustomersFilters";
import { CustomersPagination } from "../components/CustomersPagination";
import { useCustomers } from "../hooks/useCustomers";
import { CustomersHeader } from "../components/CustomersHeader";
import { useProducts } from "@/modules/customers/hooks/useProducts";

// importe aqui o modal criado
import { CustomerCreateModal } from "../components/new/CustomerCreateModal";
import { useStats } from "@/modules/users/hooks/useStats";
import { CustomersStats } from "../components/CustomersStats";

export default function CustomersPage() {
  const { data, total, loading, params, setParams } = useCustomers({
    page: 1,
    perPage: 5,
  });

  const { data: products, loading: productsLoading } = useProducts();
  const { data: stats, loading: statsLoading } = useStats();
  // 🔥 Estado para controlar o modal
  const [openModal, setOpenModal] = useState(false);

  const perPage = params.perPage ?? 5;
  const currentPage = params.page ?? 1;
  const totalPages = Math.ceil(total / perPage);
  const indexOfFirst = (currentPage - 1) * perPage;
  const indexOfLast = indexOfFirst + perPage;

  return (
    <div className="space-y-6">
      {/* Header agora abre o modal */}
      <CustomersHeader onNewCustomer={() => setOpenModal(true)} />
      {/* Stats Section */}
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

      <CustomersTable customers={data} />

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

      <CustomerCreateModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        availableProducts={products}
        onCreate={async (data, productIds) => {
          console.log("Novo cliente:", data);
          console.log("Produtos selecionados:", productIds);

          setOpenModal(false);
          setParams((p) => ({ ...p }));
        }}
      />
    </div>
  );
}
