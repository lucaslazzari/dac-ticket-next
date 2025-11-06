'use client';

import { Search, Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const users: User[] = [
    { id: 1, name: 'Admin User', email: 'admin@dac.com', role: 'Administrator', status: 'Active', lastLogin: '2024-11-05' },
    { id: 2, name: 'John Doe', email: 'john@dac.com', role: 'Manager', status: 'Active', lastLogin: '2024-11-04' },
    { id: 3, name: 'Jane Smith', email: 'jane@dac.com', role: 'Support', status: 'Active', lastLogin: '2024-11-05' },
    { id: 4, name: 'Bob Wilson', email: 'bob@dac.com', role: 'Support', status: 'Inactive', lastLogin: '2024-10-28' },
    { id: 5, name: 'Alice Johnson', email: 'alice@dac.com', role: 'Manager', status: 'Active', lastLogin: '2024-11-06' },
    { id: 6, name: 'Charlie Brown', email: 'charlie@dac.com', role: 'Support', status: 'Active', lastLogin: '2024-11-03' },
    { id: 7, name: 'Diana Prince', email: 'diana@dac.com', role: 'User', status: 'Active', lastLogin: '2024-11-05' },
    { id: 8, name: 'Edward Norton', email: 'edward@dac.com', role: 'Support', status: 'Inactive', lastLogin: '2024-10-15' },
    { id: 9, name: 'Fiona Green', email: 'fiona@dac.com', role: 'Manager', status: 'Active', lastLogin: '2024-11-06' },
    { id: 10, name: 'George Miller', email: 'george@dac.com', role: 'User', status: 'Active', lastLogin: '2024-11-04' },
    { id: 11, name: 'Hannah White', email: 'hannah@dac.com', role: 'Support', status: 'Active', lastLogin: '2024-11-05' },
    { id: 12, name: 'Ian Black', email: 'ian@dac.com', role: 'Administrator', status: 'Active', lastLogin: '2024-11-06' }
  ];

  // Cálculos de paginação
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      'Administrator': 'bg-red-100 text-red-700',
      'Manager': 'bg-purple-100 text-purple-700',
      'Support': 'bg-blue-100 text-blue-700',
      'User': 'bg-gray-100 text-gray-700'
    };
    return colors[role] || 'bg-gray-100 text-gray-700';
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#134C60]">Users</h1>
          <p className="text-gray-600 mt-1">Manage system users</p>
        </div>
        <button className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105">
          <Plus size={20} />
          New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '342', color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: '298', color: 'from-green-500 to-green-600' },
          { label: 'Inactive', value: '44', color: 'from-gray-500 to-gray-600' },
          { label: 'Administrators', value: '12', color: 'from-red-500 to-red-600' }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#134C60]">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF] focus:border-transparent"
            />
          </div>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Filter size={20} />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#44C0CF] to-[#134C60] flex items-center justify-center text-white font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-[#44C0CF] hover:text-[#3ab0bf] font-semibold text-sm">
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, users.length)} of {users.length} results
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#44C0CF] focus:border-transparent"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      currentPage === pageNumber
                        ? 'bg-[#44C0CF] text-white'
                        : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}