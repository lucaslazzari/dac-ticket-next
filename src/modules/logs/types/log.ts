import { Comment } from "./comment";

export type LogType = 'Error' | 'Warning' | 'Success' | 'Info';

export type LogStatus = 'Open' | 'InProgress' | 'Resolved' | 'Closed';

export type LogPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Log {
  id: string;
  timestamp: string;
  type: LogType;
  status: LogStatus;
  priority: LogPriority;
  customer: string;
  action: string;
  assignedUserId?: string;
  assignedUserName?: string;
  resolvedAt?: string;
  ipAddress?: string;
  comments: Comment[];
  requestBody?: string;
  requestUrl?: string;
  responseMessage?: string;
  stackTrace?: string;
}