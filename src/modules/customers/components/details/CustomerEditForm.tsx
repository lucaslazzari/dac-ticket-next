import { useState } from 'react';

interface CustomerFormData {
  name: string;
  blulogixAccountNumber: string;
  carrierAccountNumber: string;
  status: 'Active' | 'Inactive';
}

interface CustomerEditFormProps {
  customer: CustomerFormData;
  onSave: (payload: CustomerFormData) => void;
  loading?: boolean;
}

export function CustomerEditForm({ customer, onSave, loading }: CustomerEditFormProps) {
  const [form, setForm] = useState<CustomerFormData>(customer);

  const handleChange = <T extends keyof CustomerFormData>(field: T, value: CustomerFormData[T]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Blulogix Account</label>
          <input
            value={form.blulogixAccountNumber}
            onChange={(e) => handleChange('blulogixAccountNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Carrier Account</label>
          <input
            value={form.carrierAccountNumber}
            onChange={(e) => handleChange('carrierAccountNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => handleChange('status', e.target.value as 'Active' | 'Inactive')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 disabled:opacity-50"
        >
          Save
        </button>
        <button
          disabled={loading}
          className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 disabled:opacity-50 ml-5"
        >
          Generate New Token
        </button>
      </div>
    </div>
  );
}