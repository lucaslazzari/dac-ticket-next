"use client";

import { UsersTable } from "../components/usersTable";
import { UsersFilters } from "../components/UsersFilters";
import { UsersPagination } from "../components/UsersPagination";
import { useUsers } from "../hooks/useUsers";
import { UsersHeader } from "../components/UsersHeader";
import { useStats } from "../hooks/useStats";
import { UsersStats } from "../components/UsersStats";
import { UserCreateModal } from "../components/new/UserCreateModal";
import { useState } from "react";
import { UserFormData } from "../types/user.form.data";
import { useCreateUser } from "../hooks/useCreateUser";
import { UserCreated } from "../types/user.created";

export default function UsersPage() {
  const { data, total, loading, params, setParams } = useUsers({
    page: 1,
    perPage: 5,
  });

  
  const { createUser, loading: creating, error: createError } = useCreateUser();

  const [statsRefreshKey, setStatsRefreshKey] = useState(0);
  const { data: stats, loading: statsLoading } = useStats(statsRefreshKey);

  const [createdUser, setCreatedUser] = useState<UserCreated | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCreateUser = async (data: UserFormData) => {
    const created = await createUser(data);
    setCreatedUser(created);
    // Atualiza a lista para incluir o novo usuário
    setParams((p) => ({ ...p }));
    setStatsRefreshKey((k) => k + 1);
    // Mantém o modal aberto para mostrar a senha
    return created;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCreatedUser(null); // limpa o usuário criado para resetar o form
  };

  const perPage = params.perPage ?? 5;
  const currentPage = params.page ?? 1;
  const totalPages = Math.ceil(total / perPage);
  const indexOfFirst = (currentPage - 1) * perPage;
  const indexOfLast = indexOfFirst + perPage;

  return (
    <div className="space-y-6">
      <UsersHeader onNewUser={() => setOpenModal(true)} />

      {/* Stats Section */}
      {statsLoading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <p className="text-gray-500">Loading stats...</p>
        </div>
      ) : (
        <UsersStats stats={stats ?? { total: 0, active: 0, inactive: 0 }} />
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

      <UserCreateModal
        open={openModal}
        onClose={handleCloseModal}
        onCreate={handleCreateUser}
        loading={creating}
        createdUser={createdUser}
      />
    </div>
  );
}