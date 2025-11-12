// app/users/page.tsx (ou pages/users/index.tsx)
"use client";

import { UsersTable } from "../components/usersTable";
import { UsersFilters } from "../components/UsersFilters";
import { UsersPagination } from "../components/UsersPagination";
import { useUsers } from "../hooks/useUsers";
import { UsersHeader } from "../components/UsersHeader";
import { useStats } from "../hooks/useStats";
import { UsersStats } from "../components/UsersStats";

export default function UsersPage() {
  const { data, total, loading, params, setParams } = useUsers({
    page: 1,
    perPage: 5,
  });

  const { data: stats, loading: statsLoading } = useStats();

  const perPage = params.perPage ?? 5;
  const currentPage = params.page ?? 1;
  const totalPages = Math.ceil(total / perPage);
  const indexOfFirst = (currentPage - 1) * perPage;
  const indexOfLast = indexOfFirst + perPage;

  return (
    <div className="space-y-6">
      <UsersHeader />

      {/* Stats Section */}
      {statsLoading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <p className="text-gray-500">Loading stats...</p>
        </div>
      ) : (
        <UsersStats stats={stats ?? { total: 0, active: 0, inactive: 0}} />
      )}

      <UsersFilters
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
            <p className="text-gray-500">No users found</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <UsersTable users={data} />
          </div>

          <UsersPagination
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
    </div>
  );
}