import { LogType } from '../types/log';
import { XCircle, AlertCircle, CheckCircle, Info } from 'lucide-react';
import React from 'react';

export function getTypeColor(type: LogType): string {
  switch (type) {
    case 'Error': return 'bg-red-100 text-red-700';
    case 'Warning': return 'bg-yellow-100 text-yellow-700';
    case 'Success': return 'bg-green-100 text-green-700';
    case 'Info':
    default: return 'bg-blue-100 text-blue-700';
  }
}