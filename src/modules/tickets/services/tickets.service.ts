import { Ticket, Comment } from '../types/ticket';

let MOCK_TICKETS: Ticket[] = [
  {
    id: 'TCK-001',
    title: 'User cannot login',
    description: 'User reports invalid credentials error when trying to login.',
    status: 'Open',
    priority: 'High',
    assignedUserId: 'user123',
    assignedUserName: 'Alice Support',
    createdAt: '2024-11-15T10:00:00Z',
    comments: [
      {
        id: 'c1',
        authorId: 'user123',
        authorName: 'Alice Support',
        createdAt: '2024-11-15T11:00:00Z',
        content: 'User contacted support, investigating issue.',
      },
    ],
  },
  {
    id: 'TCK-002',
    title: 'API timeout on data fetch',
    description: 'The data fetch API is timing out intermittently.',
    status: 'InProgress',
    priority: 'Critical',
    assignedUserId: 'user456',
    assignedUserName: 'Bob Dev',
    createdAt: '2024-11-14T08:30:00Z',
    comments: [],
  },
];

export async function fetchTickets(): Promise<Ticket[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_TICKETS), 300));
}

export async function updateTicket(updatedTicket: Ticket): Promise<Ticket> {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_TICKETS = MOCK_TICKETS.map(t => t.id === updatedTicket.id ? updatedTicket : t);
      resolve(updatedTicket);
    }, 300);
  });
}