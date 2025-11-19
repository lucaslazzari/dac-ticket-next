import { Log } from '../types/log';

let MOCK_LOGS: Log[] = [
  {
    id: '#LOG-001',
    timestamp: '2024-11-06T14:32:15Z',
    type: 'Error',
    status: 'Open',
    priority: 'High',
    customer: 'Trimble Inc.',
    action: 'Activate',
    assignedUserId: 'user123',
    assignedUserName: 'Alice Support',
    ipAddress: '192.168.1.100',
    requestBody: '{ "userId": "123", "action": "activate" }',
    requestUrl: '/api/users/activate',
    responseMessage: 'Failed to activate user account due to invalid credentials.',
    stackTrace: 'Error: Invalid credentials\n  at validateUser (auth.js:45)\n  at activateAccount (user.js:123)...',
    comments: [
      {
        id: 'c1',
        authorId: 'user123',
        authorName: 'Alice Support',
        createdAt: '2024-11-06T15:00:00Z',
        content: 'User contacted support, investigating issue.',
      },
    ],
  },
  {
    id: '#LOG-002',
    timestamp: '2024-11-06T14:28:42Z',
    type: 'Success',
    status: 'Resolved',
    priority: 'Low',
    customer: 'Acme Corp.',
    action: 'Deactivate',
    ipAddress: '192.168.1.101',
    requestBody: '{ "userId": "456", "action": "deactivate" }',
    requestUrl: '/api/users/deactivate',
    responseMessage: 'User account successfully deactivated.',
    comments: [],
  },
];

export async function fetchLogs(): Promise<Log[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_LOGS), 300));
}

export async function updateLog(updatedLog: Log): Promise<Log> {
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_LOGS = MOCK_LOGS.map(l => l.id === updatedLog.id ? updatedLog : l);
      resolve(updatedLog);
    }, 300);
  });
}