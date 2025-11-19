'use client';

import React, { useMemo, useState } from 'react';
import { Log } from '../types/log';
import { useLogs } from '../hooks/useLogs';
import { LogDetailsModal } from '../components/LogDetailsModal';
import { LogsTable } from '../components/LogsTable';
import { LogsStats } from '../components/LogsStats';
import { LogsFilters } from '../components/LogsFilters';
import { LogsPagination } from '../components/LogsPagination';

export default function LogsPage() {
  const { logs, loading, saveLog } = useLogs();
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [query, setQuery] = useState('');

  // Estatísticas
  const stats = useMemo(() => [
    { label: 'Errors', value: String(logs.filter(l => l.type === 'Error').length), bgColor: 'bg-red-50', borderColor: 'border-red-500', textColor: 'text-red-700' },
    { label: 'Warnings', value: String(logs.filter(l => l.type === 'Warning').length), bgColor: 'bg-yellow-50', borderColor: 'border-yellow-500', textColor: 'text-yellow-700' },
    { label: 'Success', value: String(logs.filter(l => l.type === 'Success').length), bgColor: 'bg-green-50', borderColor: 'border-green-500', textColor: 'text-green-700' },
  ], [logs]);

  // Filtro local
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

  // Função retry simples
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

  const handleSave = (updatedLog: Log) => {
    saveLog(updatedLog);
    setSelectedLog(null);
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
            Export
          </button>
          {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors">
            Filters
          </button> */}
        </div>
      </div>

      <LogsStats stats={stats} />

      <LogsFilters query={query} onQueryChange={setQuery} />

      {loading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44C0CF] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <LogsTable logs={currentLogs} onViewDetails={setSelectedLog} />

          <LogsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            indexOfFirst={indexOfFirstLog}
            indexOfLast={indexOfLastLog}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      )}

      <LogDetailsModal log={selectedLog} onClose={() => setSelectedLog(null)} onRetry={handleRetry} onSave={handleSave} />
    </div>
  );
}