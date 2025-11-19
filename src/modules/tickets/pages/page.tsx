'use client';

import React, { useState } from 'react';
import { Ticket } from '../types/ticket';
import { useTickets } from '../hooks/useTickets';
import { TicketList } from '../components/TicketList';
import { TicketDetailsModal } from '../components/TicketDetailsModal';

export default function TicketsPage() {
  const { tickets, loading, saveTicket } = useTickets();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleSave = (updatedTicket: Ticket) => {
    saveTicket(updatedTicket);
    setSelectedTicket(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#134C60]">Tickets</h1>
          <p className="text-gray-600 mt-1">Support tickets and issue tracking</p>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44C0CF] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <TicketList tickets={tickets} onSelect={setSelectedTicket} />
          <TicketDetailsModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onSave={handleSave} />
        </>
      )}
    </div>
  );
}