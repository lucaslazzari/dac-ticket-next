import React from 'react';

interface Stat {
  label: string;
  value: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

interface Props {
  stats: Stat[];
}

export function LogsStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${stat.bgColor} rounded-xl shadow-md p-4 border-2 ${stat.borderColor}`}>
          <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
          <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}