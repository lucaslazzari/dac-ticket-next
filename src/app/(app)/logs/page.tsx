'use client';

import React, { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  XCircle,
  AlertCircle,
  CheckCircle,
  Info,
  X,
} from 'lucide-react';

type LogType = 'Error' | 'Warning' | 'Success' | 'Info';

interface Log {
  id: string;
  timestamp: string;
  type: LogType;
  customer: string; // campo mostrado na listagem
  action: string;
  ipAddress?: string;
  requestBody?: string; // JSON BODY (string)
  requestUrl?: string;
  responseMessage?: string;
  stackTrace?: string;
}

/* Modal de detalhes (in-line) */
function LogDetailsModal({
  log,
  onClose,
  onRetry,
}: {
  log: Log | null;
  onClose: () => void;
  onRetry?: (log: Log) => Promise<void>;
}) {
  const [isRetrying, setIsRetrying] = useState(false);

  if (!log) return null;

  const getTypeColor = (type: LogType) => {
    switch (type) {
      case 'Error':
        return 'bg-red-100 text-red-700';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'Success':
        return 'bg-green-100 text-green-700';
      case 'Info':
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const handleRetryClick = async () => {
    if (!onRetry) return;
    try {
      setIsRetrying(true);
      await onRetry(log);
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-lg">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-4 border-b bg-white rounded-t-xl">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Log Details</h2>
            <p className="text-sm text-gray-500">ID: <span className="font-mono text-sm">{log.id}</span></p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Detail label="ID" value={<span className="font-mono">{log.id}</span>} />
            <Detail label="Timestamp" value={log.timestamp} />
            <Detail
              label="Type"
              value={
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(log.type)}`}>
                  {log.type}
                </span>
              }
            />
            <Detail label="Customer" value={log.customer} />
            <Detail label="Action" value={log.action} />
            <Detail label="IP Address" value={log.ipAddress ?? '—'} />
          </div>

          <hr className="border-gray-200" />

          <div>
            <h3 className="text-sm text-gray-500 mb-2">Request URL</h3>
            <p className="font-medium text-gray-800">{log.requestUrl ?? '—'}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">Response Message</h3>
            <p className="font-medium text-gray-800">{log.responseMessage ?? '—'}</p>
          </div>

          <div>
            <h3 className="text-sm text-gray-500 mb-2">Request Body</h3>
            <pre className="max-h-48 overflow-auto bg-gray-50 p-3 rounded-md text-sm">
              {log.requestBody ?? '—'}
            </pre>
          </div>

          {log.stackTrace && (
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Stack Trace</h3>
              <pre className="max-h-48 overflow-auto bg-gray-50 p-3 rounded-md text-sm">{log.stackTrace}</pre>
            </div>
          )}
        </div>

        {/* Retry button apenas para logs de erro */}
        {log.type === 'Error' && onRetry && (
          <div className="px-6 pb-6">
            <button
              onClick={handleRetryClick}
              disabled={isRetrying}
              className="w-full py-2 bg-[#44C0CF] hover:bg-[#3ab0bf] disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isRetrying ? 'Retrying...' : 'Retry Request'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

/* Página principal */
export default function LogsPage() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [query, setQuery] = useState('');

  const logs: Log[] = [
    {
      id: '#LOG-001',
      timestamp: '2024-11-06 14:32:15',
      type: 'Error',
      customer: 'Trimble Inc.',
      action: 'Activate',
      ipAddress: '192.168.1.100',
      requestBody: '{ "userId": "123", "action": "activate" }',
      requestUrl: '/api/users/activate',
      responseMessage: 'Failed to activate user account due to invalid credentials.',
      stackTrace: 'Error: Invalid credentials\n  at validateUser (auth.js:45)\n  at activateAccount (user.js:123)...',
    },
    {
      id: '#LOG-002',
      timestamp: '2024-11-06 14:28:42',
      type: 'Success',
      customer: 'Acme Corp.',
      action: 'Deactivate',
      ipAddress: '192.168.1.101',
      requestBody: '{ "userId": "456", "action": "deactivate" }',
      requestUrl: '/api/users/deactivate',
      responseMessage: 'User account successfully deactivated.',
    },
    {
      id: '#LOG-003',
      timestamp: '2024-11-06 14:15:33',
      type: 'Success',
      customer: 'ACME - Provisioning',
      action: 'Deactivate Provisioning',
      ipAddress: '192.168.1.102',
      requestUrl: '/api/provisioning/deallocate',
      responseMessage: 'Provisioning resources successfully deallocated.',
    },
    // adicione mais conforme precisar
  ];

  // Aqui: estatísticas (cards)
  const stats = [
    { label: 'Errors', value: String(logs.filter(l => l.type === 'Error').length), bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700' },
    { label: 'Warnings', value: String(logs.filter(l => l.type === 'Warning').length ?? 0), bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500', textColor: 'text-yellow-700' },
    { label: 'Success', value: String(logs.filter(l => l.type === 'Success').length), bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700' },
  ];

  // filtro local (id, timestamp, type, customer, action)
  const filtered = useMemo(() => {
    if (!query) return logs;
    const q = query.toLowerCase();
    return logs.filter(
      (l) =>
        l.id.toLowerCase().includes(q) ||
        l.timestamp.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q) ||
        l.customer.toLowerCase().includes(q) ||
        l.action.toLowerCase().includes(q)
    );
  }, [logs, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const indexOfLastLog = currentPage * itemsPerPage;
  const indexOfFirstLog = indexOfLastLog - itemsPerPage;
  const currentLogs = filtered.slice(indexOfFirstLog, indexOfLastLog);

  const getTypeColor = (type: LogType) => {
    switch (type) {
      case 'Error':
        return 'bg-red-100 text-red-700';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'Success':
        return 'bg-green-100 text-green-700';
      case 'Info':
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const getTypeIcon = (type: LogType) => {
    switch (type) {
      case 'Error':
        return <XCircle size={14} />;
      case 'Warning':
        return <AlertCircle size={14} />;
      case 'Success':
        return <CheckCircle size={14} />;
      case 'Info':
      default:
        return <Info size={14} />;
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (v: number) => {
    setItemsPerPage(v);
    setCurrentPage(1);
  };

  // função de retry simples (pai): faz fetch para requestUrl usando requestBody se houver
  const handleRetry = async (log: Log) => {
    if (!log.requestUrl) {
      alert('No request URL available to retry.');
      return;
    }

    try {
      const res = await fetch(log.requestUrl, {
        method: log.requestBody ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: log.requestBody ?? undefined,
      });

      if (res.ok) {
        alert(`Retry succeeded for ${log.id}`);
      } else {
        alert(`Retry failed for ${log.id} (status ${res.status})`);
      }
    } catch (err) {
      console.error('Retry error', err);
      alert(`Network error while retrying ${log.id}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#134C60]">Logs</h1>
          <p className="text-gray-600 mt-1">System activity and event logs</p>
        </div>

        <div className="flex gap-3">
          <button className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 shadow transition-all">
            <Download size={16} />
            Export
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* Stats (cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bgColor} rounded-xl shadow-md p-4 border-2 ${stat.borderColor}`}>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              type="text"
              placeholder="Search logs by id, timestamp, type, customer or action..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#134C60]">{log.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{log.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(log.type)}`}>
                      <span className="inline-flex mr-1">{getTypeIcon(log.type)}</span>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.customer}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{log.action}</td>
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

              {currentLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-gray-500">
                    No logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstLog + 1} to {Math.min(indexOfLastLog, filtered.length)} of {filtered.length} results
            </span>
            <div className="flex items-center gap-2">
              <label htmlFor="itemsPerPage" className="text-sm text-gray-600">Items per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-lg font-semibold ${currentPage === page ? "bg-[#44C0CF] text-white" : "border border-gray-300 text-gray-600 hover:bg-gray-100"}`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
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

      {/* Modal */}
      <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} onRetry={handleRetry} />
    </div>
  );
}