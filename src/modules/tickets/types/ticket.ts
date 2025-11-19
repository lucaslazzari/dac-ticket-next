export type TicketStatus = 'Open' | 'InProgress' | 'Resolved' | 'Closed';

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  createdAt: string; // ISO string
  content: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedUserId?: string;
  assignedUserName?: string;
  createdAt: string;
  resolvedAt?: string;
  comments: Comment[];
}