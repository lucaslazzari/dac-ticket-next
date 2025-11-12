export function getUserInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('');
}

export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    'Administrator': 'bg-red-100 text-red-700',
    'Manager': 'bg-purple-100 text-purple-700',
    'Support': 'bg-blue-100 text-blue-700',
    'User': 'bg-gray-100 text-gray-700'
  };
  return colors[role] || 'bg-gray-100 text-gray-700';
}

export function getStatusColor(status: string): string {
  return status === 'Active' 
    ? 'bg-green-100 text-green-700' 
    : 'bg-gray-100 text-gray-700';
}