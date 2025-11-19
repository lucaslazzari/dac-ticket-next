import React from 'react';
import { Search } from 'lucide-react';

interface Props {
  query: string;
  onQueryChange: (q: string) => void;
}

export function LogsFilters({ query, onQueryChange }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            type="text"
            placeholder="Search logs by id, timestamp, type, customer or action..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>
      </div>
    </div>
  );
}