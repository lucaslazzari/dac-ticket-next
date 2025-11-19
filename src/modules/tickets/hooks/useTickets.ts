import { useEffect, useState } from 'react';
import { Ticket } from '../types/ticket';
import { fetchTickets, updateTicket } from '../services/tickets.service';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTickets()
      .then(setTickets)
      .finally(() => setLoading(false));
  }, []);

  const saveTicket = async (ticket: Ticket) => {
    setLoading(true);
    const updated = await updateTicket(ticket);
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
    setLoading(false);
  };

  return { tickets, loading, saveTicket };
}