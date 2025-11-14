import { useState } from "react";

interface CustomerFormData {
  name: string;
  blulogixAccountNumber: string;
  carrierAccountNumber: string;
  status: "Active" | "Inactive";
}

interface CustomerEditFormProps {
  customer: CustomerFormData;
  onSave: (payload: CustomerFormData) => void;
  loading?: boolean;
  showActions?: boolean;
}

const AVAILABLE_ACTIONS = ["Activate", "Deactivate", "Extend Date"];

export function CustomerEditForm({
  customer,
  onSave,
  loading,
  showActions = true,
}: CustomerEditFormProps) {
  const [form, setForm] = useState<CustomerFormData>(customer);

  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  const handleChange = <T extends keyof CustomerFormData>(
    field: T,
    value: CustomerFormData[T]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAction = (action: string) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Blulogix Account
          </label>
          <input
            value={form.blulogixAccountNumber}
            onChange={(e) =>
              handleChange("blulogixAccountNumber", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Carrier Account
          </label>
          <input
            value={form.carrierAccountNumber}
            onChange={(e) =>
              handleChange("carrierAccountNumber", e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) =>
              handleChange("status", e.target.value as "Active" | "Inactive")
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <label className="block text-sm text-gray-600 mb-1 mt-3">
        Customer Actions
      </label>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        {AVAILABLE_ACTIONS.map((action) => {
          const selected = selectedActions.includes(action);
          return (
            <label
              key={action}
              className={`flex items-center gap-2 cursor-pointer select-none px-3 py-2 border rounded-lg transition 
          ${
            selected
              ? "bg-[#44C0CF] text-white border-[#44C0CF]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
            >
              <input
                type="checkbox"
                checked={selected}
                onChange={() => toggleAction(action)}
                className="form-checkbox h-4 w-4 text-[#44C0CF] border-gray-300 rounded focus:ring-0"
              />
              <span className="font-medium">{action}</span>
            </label>
          );
        })}
      </div>

      {showActions && (
        <div className="mt-6">
          {onSave && (
            <button
              onClick={() => onSave(form)}
              disabled={loading}
              className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            >
              Save
            </button>
          )}

          <button
            disabled={loading}
            className="bg-[#44C0CF] hover:bg-[#3ab0bf] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all hover:scale-105 disabled:opacity-50 ml-5"
          >
            Generate New Token
          </button>
        </div>
      )}
    </div>
  );
}
