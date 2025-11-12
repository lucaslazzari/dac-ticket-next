'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export function CustomerDetailHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <button
          onClick={() => router.back()}
          className="text-sm mb-1 flex items-center gap-2 bg-[#44C0CF] hover:bg-[#3ab0bf] text-white rounded-full px-3 py-1.5 text-sm font-medium shadow-lg transition-all z-10"
          aria-label="Back"
        >
          <ChevronLeft size={16} /> Back
        </button>
        <h1 className="text-3xl font-bold text-[#134C60]">{title}</h1>
        <p className="text-gray-600 mt-1">Edit customer details and manage products</p>
      </div>
    </div>
  );
}