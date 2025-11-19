"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CustomerProductsSection } from "../details/CustomerProductsSection"; // ajuste o caminho conforme seu projeto
import type { Product } from "@/modules/customers/types/product";
import { CustomerFormData } from "../../types/customer.fom.data";
import { CustomerCreated } from "../../types/customer.created";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (
    data: CustomerFormData,
    productIds: number[],
    actions: string[]
  ) => Promise<CustomerCreated>;
  availableProducts: Product[];
  loading?: boolean;
  createdCustomer?: CustomerCreated | null;
}

export function CustomerCreateModal({
  open,
  onClose,
  onCreate,
  availableProducts,
  loading = false,
  createdCustomer = null,
}: Props) {
  const [step, setStep] = useState<1 | 2>(1);

  const [customerData, setCustomerData] = useState<CustomerFormData>({
    name: "",
    blulogixAccountNumber: "",
    carrierAccountNumber: "",
    status: "Active",
  });

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && !createdCustomer) {
      setCustomerData({
        name: "",
        blulogixAccountNumber: "",
        carrierAccountNumber: "",
        status: "Active",
      });
      setSelectedProducts([]);
      setCopied(false);
      setStep(1);
    }
  }, [open, createdCustomer]);

  if (!open) return null;

  const handleChange = <K extends keyof CustomerFormData>(
    field: K,
    value: CustomerFormData[K]
  ) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleProduct = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Função para alternar seleção de ações
  const toggleAction = (action: string) => {
    setActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  };
  const copyToken = () => {
    if (createdCustomer) {
      navigator.clipboard.writeText(createdCustomer.dacApiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async () => {
    await onCreate(customerData, selectedProducts, actions);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          disabled={loading}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {!createdCustomer ? (
          <>
            <h2 className="text-2xl font-bold text-[#134C60] mb-6">
              Create Customer
            </h2>

            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`h-2 w-2 rounded-full ${
                  step === 1 ? "bg-[#44C0CF]" : "bg-gray-300"
                }`}
              />
              <div
                className={`h-2 w-2 rounded-full ${
                  step === 2 ? "bg-[#44C0CF]" : "bg-gray-300"
                }`}
              />
            </div>

            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={customerData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="blulogixAccountNumber"
                  >
                    BluLogix Account Number
                  </label>
                  <input
                    id="blulogixAccountNumber"
                    type="text"
                    value={customerData.blulogixAccountNumber}
                    onChange={(e) =>
                      handleChange("blulogixAccountNumber", e.target.value)
                    }
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 mb-1"
                    htmlFor="carrierAccountNumber"
                  >
                    Carrier Account Number
                  </label>
                  <input
                    id="carrierAccountNumber"
                    type="text"
                    value={customerData.carrierAccountNumber}
                    onChange={(e) =>
                      handleChange("carrierAccountNumber", e.target.value)
                    }
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="status">
                    Status
                  </label>
                  <select
                    id="status"
                    value={customerData.status}
                    onChange={(e) =>
                      handleChange(
                        "status",
                        e.target.value as "Active" | "Inactive"
                      )
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
                    disabled={loading}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Actions</label>
                  <div className="flex gap-4">
                    {["Activate", "Deactivate", "Extend Date"].map((action) => (
                      <label
                        key={action}
                        className="inline-flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={actions.includes(action)}
                          onChange={() => toggleAction(action)}
                          disabled={loading}
                          className="h-4 w-4"
                        />
                        <span>{action}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 px-6 py-3 rounded-xl bg-[#44C0CF] hover:bg-[#3ab0bf] text-white transition disabled:opacity-50"
                >
                  Next
                </button>
              </form>
            )}

            {step === 2 && (
              <>
                <CustomerProductsSection
                  products={availableProducts.filter((p) =>
                    selectedProducts.includes(p.id)
                  )}
                  availableProducts={availableProducts}
                  onAdd={(id) => setSelectedProducts((prev) => [...prev, id])}
                  onRemove={(id) =>
                    setSelectedProducts((prev) => prev.filter((p) => p !== id))
                  }
                  loading={loading}
                />

                <div className="mt-6 flex justify-between">
                  <button
                    className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                    onClick={() => setStep(1)}
                    disabled={loading}
                  >
                    Back
                  </button>

                  <button
                    className="px-6 py-3 rounded-xl bg-[#44C0CF] text-white hover:bg-[#3ab0bf] transition disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Create Customer"}
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#134C60] mb-4">
              Customer Created Successfully!
            </h2>
            <p>
              <strong>Name:</strong> {createdCustomer.customerName}
            </p>
            <p>
              <strong>BluLogix Account:</strong>{" "}
              {createdCustomer.bluLogixCustomerAccountNumber}
            </p>
            <p>
              <strong>Carrier Account:</strong>{" "}
              {createdCustomer.carrierAccountNumber}
            </p>
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded flex items-center justify-between">
              <span>
                <strong>Token:</strong> {createdCustomer.dacApiKey}
              </span>
              <button
                onClick={copyToken}
                className="flex items-center gap-1 text-sm text-[#44C0CF] hover:text-[#3ab0bf]"
                aria-label="Copy token"
              >
                <X size={16} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full px-6 py-3 rounded-xl bg-[#44C0CF] hover:bg-[#3ab0bf] text-white transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
