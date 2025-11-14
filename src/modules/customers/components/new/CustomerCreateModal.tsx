"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CustomerEditForm } from "../details/CustomerEditForm";
import { CustomerProductsSection } from "../details/CustomerProductsSection";
import type { Product } from "@/modules/customers/types/product";

export interface CustomerFormData {
  name: string;
  blulogixAccountNumber: string;
  carrierAccountNumber: string;
  status: "Active" | "Inactive";
}

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: CustomerFormData, productIds: number[]) => Promise<void>;
  availableProducts: Product[];
}

export function CustomerCreateModal({
  open,
  onClose,
  onCreate,
  availableProducts
}: Props) {
  const [step, setStep] = useState<1 | 2>(1);

  const [customerData, setCustomerData] = useState<CustomerFormData>({
    name: "",
    blulogixAccountNumber: "",
    carrierAccountNumber: "",
    status: "Active",
  });

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    setLoading(true);
    await onCreate(customerData, selectedProducts);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Step Header */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#134C60]">
            Create Customer
          </h2>

          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${step === 1 ? "bg-[#44C0CF]" : "bg-gray-300"}`} />
            <div className={`h-2 w-2 rounded-full ${step === 2 ? "bg-[#44C0CF]" : "bg-gray-300"}`} />
          </div>
        </div>

        {/* STEP 1 - CUSTOMER DATA */}
        {step === 1 && (
          <CustomerEditForm
            customer={customerData}
            onSave={setCustomerData}
            showActions={false}
          />
        )}

        {/* STEP 2 - PRODUCTS */}
        {step === 2 && (
          <CustomerProductsSection
            products={availableProducts.filter((p) => selectedProducts.includes(p.id))}
            availableProducts={availableProducts}
            onAdd={(id) => setSelectedProducts((prev) => [...prev, id])}
            onRemove={(id) =>
              setSelectedProducts((prev) => prev.filter((p) => p !== id))
            }
            onAddBulk={(ids) =>
              setSelectedProducts((prev) => [...prev, ...ids])
            }
          />
        )}

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-between">

          {step > 1 && (
            <button
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              Back
            </button>
          )}

          {step < 2 ? (
            <button
              className="ml-auto px-6 py-3 rounded-xl bg-[#44C0CF] hover:bg-[#3ab0bf] text-white transition"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          ) : (
            <button
              className="ml-auto px-6 py-3 rounded-xl bg-[#44C0CF] hover:bg-[#3ab0bf] text-white transition disabled:opacity-50"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Create Customer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
