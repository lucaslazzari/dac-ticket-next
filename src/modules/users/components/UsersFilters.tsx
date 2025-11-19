'use client';

import { Search, Filter } from 'lucide-react';

interface Props {
  onSearch?: (q: string) => void;
}

export function UsersFilters({ onSearch }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search users..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF] focus:border-transparent"
          />
        </div>
        {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
          <Filter size={20} />
          Filters
        </button> */}
      </div>
    </div>
  );
}