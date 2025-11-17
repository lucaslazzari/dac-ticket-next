'use client';

import { Plus } from 'lucide-react';

interface Props {
  onNewUser?: () => void;
}

export function UsersHeader({ onNewUser }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[#134C60]">Users</h1>
        <p className="text-gray-600 mt-1">Manage system users</p>
      </div>
      <button
        type="button"
        onClick={onNewUser}
        className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105"
      >
        <Plus size={20} />
        New User
      </button>
    </div>
  );
}