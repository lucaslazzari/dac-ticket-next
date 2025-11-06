'use client';

import Link from 'next/link';
import { Users, Ticket, UserCircle, TrendingUp } from 'lucide-react';

export default function Home() {
  const cards = [
    { 
      id: 'customers', 
      label: 'Customers', 
      icon: Users, 
      description: 'Gerenciar clientes',
      count: '1,234',
      color: 'from-blue-500 to-blue-600',
      href: '/customers'
    },
    { 
      id: 'tickets', 
      label: 'Tickets', 
      icon: Ticket, 
      description: 'Gerenciar tickets',
      count: '856',
      color: 'from-purple-500 to-purple-600',
      href: '/tickets'
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: UserCircle, 
      description: 'Gerenciar usuários',
      count: '342',
      color: 'from-green-500 to-green-600',
      href: '/users'
    }
  ];

  const stats = [
    { label: 'Total Revenue', value: 'R$ 45.2K', change: '+12.5%', positive: true },
    { label: 'Active Users', value: '2,345', change: '+8.2%', positive: true },
    { label: 'Pending Tickets', value: '23', change: '-15.3%', positive: true },
    { label: 'Satisfaction', value: '94.5%', change: '+2.1%', positive: true }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#134C60] to-[#44C0CF] rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Bem-vindo ao DAC</h1>
        <p className="text-lg text-gray-100">Sistema de gerenciamento integrado</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-[#134C60]">{stat.value}</h3>
              <span className={`text-sm font-semibold flex items-center gap-1 ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={16} />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 overflow-hidden group hover:scale-105"
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-[#134C60]">{card.count}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#134C60] mb-2">{card.label}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-[#134C60] mb-4">Atividades Recentes</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#44C0CF] flex items-center justify-center text-white font-semibold">
                {item}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Nova atividade registrada</p>
                <p className="text-xs text-gray-500">Há {item} hora(s) atrás</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}