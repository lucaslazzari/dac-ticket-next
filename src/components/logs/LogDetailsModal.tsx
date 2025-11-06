'use client';

import { X, AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { ReactElement } from 'react';

export interface Log {
  id: string;
  timestamp: string;
  type: 'Error' | 'Warning' | 'Success' | 'Info';
  user: string;
  action: string;
  ip: string;
  details?: string;
  stackTrace?: string;
}

interface LogDetailsModalProps {
  log: Log | null;
  onClose: () => void;
}

export default function LogDetailsModal({ log, onClose }: LogDetailsModalProps) {
  if (!log) return null;

  const getTypeColor = (type: Log['type']): string => {
    const colors: Record<Log['type'], string> = {
      'Error': 'bg-red-100 text-red-700',
      'Warning': 'bg-yellow-100 text-yellow-700',
      'Success': 'bg-green-100 text-green-700',
      'Info': 'bg-blue-100 text-blue-700'
    };
    return colors[type];
  };

  const getTypeIcon = (type: Log['type']): ReactElement => {
    const icons: Record<Log['type'], ReactElement> = {
      'Error': <XCircle size={16} />,
      'Warning': <AlertCircle size={16} />,
      'Success': <CheckCircle size={16} />,
      'Info': <Info size={16} />
    };
    return icons[type];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getTypeColor(log.type)}`}>
              {getTypeIcon(log.type)}
              {log.type}
            </span>
            <h2 className="text-2xl font-bold text-[#134C60]">{log.id}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Timestamp</p>
              <p className="font-semibold text-gray-800">{log.timestamp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">User</p>
              <p className="font-semibold text-gray-800">{log.user}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Action</p>
              <p className="font-semibold text-gray-800">{log.action}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">IP Address</p>
              <p className="font-semibold text-gray-800 font-mono">{log.ip}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Details</p>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-800">{log.details || 'No additional details available.'}</p>
            </div>
          </div>

          {log.stackTrace && log.stackTrace !== 'N/A' && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Stack Trace</p>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">{log.stackTrace}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Close
          </button>
          <button className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Download Log
          </button>
        </div>
      </div>
    </div>
  );
}