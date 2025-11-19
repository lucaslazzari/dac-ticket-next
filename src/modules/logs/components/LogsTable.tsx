import React from 'react';
import { Log, LogType } from '../types/log';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface Props {
  logs: Log[];
  onViewDetails: (log: Log) => void;
}

const getTypeColor = (type: LogType) => {
  switch (type) {
    case 'Error': return 'bg-red-100 text-red-700';
    case 'Warning': return 'bg-yellow-100 text-yellow-700';
    case 'Success': return 'bg-green-100 text-green-700';
    case 'Info': default: return 'bg-blue-100 text-blue-700';
  }
};

const getTypeIcon = (type: LogType) => {
  switch (type) {
    case 'Error': return <XCircle size={14} />;
    case 'Warning': return <AlertCircle size={14} />;
    case 'Success': return <CheckCircle size={14} />;
    case 'Info': default: return <Info size={14} />;
  }
};

export function LogsTable({ logs, onViewDetails }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Timestamp</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Assigned To</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {logs.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-6 text-center text-gray-500">No logs found.</td>
            </tr>
          ) : (
            logs.map(log => (
              <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#134C60]">{log.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 text-sm">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(log.type)}`}>
                    <span className="inline-flex mr-1">{getTypeIcon(log.type)}</span>
                    {log.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{log.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{log.priority}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{log.customer}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{log.action}</td>
                <td className="px-6 py-4 whitespace-nowrap">{log.assignedUserName ?? 'Unassigned'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => onViewDetails(log)} className="text-[#44C0CF] hover:text-[#3ab0bf] font-semibold text-sm">
                    View / Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}