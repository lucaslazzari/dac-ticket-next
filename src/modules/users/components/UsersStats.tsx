interface Props {
  stats: {
    total: number;
    active: number;
    inactive: number;
    administrators: number;
  };
}

export function UsersStats({ stats }: Props) {
  const cards = [
    { label: 'Total Users', value: stats.total, color: 'from-blue-500 to-blue-600' },
    { label: 'Active', value: stats.active, color: 'from-green-500 to-green-600' },
    { label: 'Inactive', value: stats.inactive, color: 'from-gray-500 to-gray-600' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className="text-2xl font-bold text-[#134C60]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}