import React from 'react';
import { Ticket } from '../types/ticket';

interface Props {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
}

export function TicketList({ tickets, onSelect }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Assigned To</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Created At</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-6 text-center text-gray-500">
                No tickets found.
              </td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-[#134C60]">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.title}</td>
                <td className="px-6 py-4">{ticket.status}</td>
                <td className="px-6 py-4">{ticket.priority}</td>
                <td className="px-6 py-4">{ticket.assignedUserName ?? 'Unassigned'}</td>
                <td className="px-6 py-4">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onSelect(ticket)}
                    className="text-[#44C0CF] hover:text-[#3ab0bf] font-semibold text-sm"
                  >
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