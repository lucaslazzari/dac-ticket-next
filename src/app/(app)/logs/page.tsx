"use client";

import {
  Search,
  Filter,
  Download,
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ReactElement, useState } from "react";
import LogDetailsModal, { Log } from "@/components/logs/LogDetailsModal";

export default function Logs() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const logs: Log[] = [
    {
      id: "#LOG-001",
      timestamp: "2024-11-06 14:32:15",
      type: "Error",
      user: "John Silva",
      action: "Activate",
      ip: "192.168.1.100",
      details: "Failed to activate user account due to invalid credentials.",
      stackTrace:
        "Error: Invalid credentials\n  at validateUser (auth.js:45)\n  at activateAccount (user.js:123)\n  at processRequest (api.js:89)",
    },
    {
      id: "#LOG-002",
      timestamp: "2024-11-06 14:28:42",
      type: "Success",
      user: "Mary Santos",
      action: "Deactivate",
      ip: "192.168.1.101",
      details: "User account successfully deactivated.",
    },
    {
      id: "#LOG-003",
      timestamp: "2024-11-06 14:15:33",
      type: "Success",
      user: "Peter Costa",
      action: "Deactivate Provisioning",
      ip: "192.168.1.102",
      details: "Provisioning resources successfully deallocated.",
    },
    {
      id: "#LOG-004",
      timestamp: "2024-11-06 14:05:21",
      type: "Success",
      user: "Anna Oliveira",
      action: "Activate",
      ip: "192.168.1.103",
      details: "User account activated successfully.",
    },
    {
      id: "#LOG-005",
      timestamp: "2024-11-06 13:58:10",
      type: "Error",
      user: "Carlos Lima",
      action: "Activate Provisioning",
      ip: "192.168.1.104",
      details: "Failed to provision resources. Database connection timeout.",
      stackTrace:
        "Error: Connection timeout\n  at connectDB (database.js:78)\n  at provisionResources (provisioning.js:156)\n  at handleActivation (handler.js:234)",
    },
    {
      id: "#LOG-006",
      timestamp: "2024-11-06 13:45:55",
      type: "Success",
      user: "Julia Ferreira",
      action: "Extend",
      ip: "192.168.1.105",
      details: "Subscription date extended by 30 days.",
    },
    // Adicione mais logs para testar a paginação
    {
      id: "#LOG-007",
      timestamp: "2024-11-06 13:30:12",
      type: "Info",
      user: "Roberto Alves",
      action: "Login",
      ip: "192.168.1.106",
      details: "User logged in successfully.",
    },
    {
      id: "#LOG-008",
      timestamp: "2024-11-06 13:15:45",
      type: "Warning",
      user: "Patricia Souza",
      action: "Update Profile",
      ip: "192.168.1.107",
      details: "Profile update attempted with incomplete data.",
    },
    {
      id: "#LOG-009",
      timestamp: "2024-11-06 13:00:33",
      type: "Success",
      user: "Fernando Costa",
      action: "Activate",
      ip: "192.168.1.108",
      details: "User account activated successfully.",
    },
    {
      id: "#LOG-010",
      timestamp: "2024-11-06 12:45:21",
      type: "Error",
      user: "Mariana Lima",
      action: "Payment",
      ip: "192.168.1.109",
      details: "Payment processing failed.",
      stackTrace:
        "Error: Payment gateway timeout\n  at processPayment (payment.js:234)\n  at handleTransaction (transaction.js:89)",
    },
    {
      id: "#LOG-011",
      timestamp: "2024-11-06 12:30:15",
      type: "Success",
      user: "Lucas Martins",
      action: "Logout",
      ip: "192.168.1.110",
      details: "User logged out successfully.",
    },
  ];

  // Cálculos de paginação
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(logs.length / itemsPerPage);

  const getTypeColor = (type: Log["type"]): string => {
    const colors: Record<Log["type"], string> = {
      Error: "bg-red-100 text-red-700",
      Warning: "bg-yellow-100 text-yellow-700",
      Success: "bg-green-100 text-green-700",
      Info: "bg-blue-100 text-blue-700",
    };
    return colors[type];
  };

  const getTypeIcon = (type: Log["type"]): ReactElement => {
    const icons: Record<Log["type"], ReactElement> = {
      Error: <XCircle size={16} />,
      Warning: <AlertCircle size={16} />,
      Success: <CheckCircle size={16} />,
      Info: <Info size={16} />,
    };
    return icons[type];
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset para primeira página
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#134C60]">Trimble Logs</h1>
          <p className="text-gray-600 mt-1">
            System activity and event logs for Trimble
          </p>
        </div>
        <button className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105">
          <Download size={20} />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Errors",
            value: "23",
            bgColor: "bg-red-50",
            borderColor: "border-red-500",
            textColor: "text-red-700",
          },
          {
            label: "Warnings",
            value: "45",
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-500",
            textColor: "text-yellow-700",
          },
          {
            label: "Success",
            value: "892",
            bgColor: "bg-green-50",
            borderColor: "border-green-500",
            textColor: "text-green-700",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl shadow-md p-4 border-2 ${stat.borderColor}`}
          >
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.textColor}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search logs..."
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-semibold text-[#134C60]">
                      {log.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getTypeColor(
                        log.type
                      )}`}
                    >
                      {getTypeIcon(log.type)}
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {log.user}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm font-mono">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-[#44C0CF] hover:text-[#3ab0bf] font-semibold text-sm"
                    >
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
              Showing {indexOfFirstLog + 1} to{" "}
              {Math.min(indexOfLastLog, logs.length)} of {logs.length} results
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600">
                Items per page:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) =>
                  handleItemsPerPageChange(Number(e.target.value))
                }
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => {
                // Mostrar apenas algumas páginas ao redor da página atual
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        currentPage === pageNumber
                          ? "bg-[#44C0CF] text-white"
                          : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return (
                    <span key={pageNumber} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }
            )}

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

      {/* Modal */}
      <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
    </div>
  );
}
