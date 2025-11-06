'use client';

import { CustomersTable } from '../components/CustomersTable';
import { CustomersFilters } from '../components/CustomersFilters';
import { CustomersPagination } from '../components/CustomersPagination';
import { useCustomers } from '../hooks/useCustomers';
import { CustomersHeader } from '../components/CustomersHeader';

export default function CustomersPage() {
  const { data, total, loading, params, setParams } = useCustomers({ page: 1, perPage: 5 });

  const perPage = params.perPage ?? 5;
  const currentPage = params.page ?? 1;
  const totalPages = Math.ceil(total / perPage);
  const indexOfFirst = (currentPage - 1) * perPage;
  const indexOfLast = indexOfFirst + perPage;

  return (
    <div className="space-y-6">
      <CustomersHeader/>
      
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
        onItemsPerPageChange={(perPage) => setParams((p) => ({ ...p, perPage, page: 1 }))}
      />
    </div>
  );
}