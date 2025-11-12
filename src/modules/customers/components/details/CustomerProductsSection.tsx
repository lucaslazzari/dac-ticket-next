import { Search, Plus } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import type { Product } from '@/modules/customers/types/product';

interface CustomerProductsSectionProps {
  products: Product[];
  availableProducts: Product[];
  onAdd: (productId: number) => Promise<void> | void;
  onRemove: (productId: number) => void;
  onAddBulk?: (productIds: number[]) => Promise<void> | void;
  loading?: boolean;
}

export function CustomerProductsSection({
  products,
  availableProducts,
  onAdd,
  onRemove,
  onAddBulk,
  loading,
}: CustomerProductsSectionProps) {
  const [filter, setFilter] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedAdd, setSelectedAdd] = useState<Set<number>>(new Set());

  // Debounced search term for the add panel
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(filter), 200); // 200ms debounce
    return () => clearTimeout(t);
  }, [filter]);

  // products currently associated with the customer (table filter)
  const filteredProducts = useMemo(() => {
    if (!filter) return products;
    const q = filter.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q)
    );
  }, [products, filter]);

  const usedIds = useMemo(() => new Set(products.map((p) => p.id)), [products]);

  // products available to add (exclude already used)
  const addOptions = useMemo(() => {
    return availableProducts.filter((p) => !usedIds.has(p.id));
  }, [availableProducts, usedIds]);

  // filtered view inside the add panel (uses debounced searchTerm)
  const addOptionsFiltered = useMemo(() => {
    if (!searchTerm) return addOptions;
    const q = searchTerm.toLowerCase();
    return addOptions.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q)
    );
  }, [addOptions, searchTerm]);

  const toggleSelect = (id: number) => {
    setSelectedAdd((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddSelected = async () => {
    if (selectedAdd.size === 0) return;
    const ids = Array.from(selectedAdd);
    try {
      if (onAddBulk) {
        await onAddBulk(ids);
      } else {
        for (const id of ids) {
          await Promise.resolve(onAdd(id));
        }
      }
      setSelectedAdd(new Set());
      setPanelOpen(false);
    } catch (err) {
      console.error('Error adding products', err);
    }
  };

  const isSelected = (id: number) => selectedAdd.has(id);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-lg font-semibold">Products</h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter products..."
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
            />
          </div>

          {/* Botão que abre painel de seleção com checkboxes */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setPanelOpen((v) => !v)}
              className="border px-3 py-2 rounded-xl bg-white hover:bg-gray-50 flex items-center gap-2"
            >
              <Plus size={14} />
              <span className="text-sm">Select products</span>
            </button>

            {panelOpen && (
              <div
                role="dialog"
                aria-label="Select products to add"
                className="absolute right-0 mt-2 w-[360px] max-h-80 overflow-auto bg-white border rounded-xl shadow-lg p-3 z-20 animate-fadeIn"
              >
                <div className="mb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  Showing {addOptionsFiltered.length} / {addOptions.length} available
                </div>

                <div className="divide-y divide-gray-100">
                  {addOptionsFiltered.length === 0 ? (
                    <div className="text-sm text-gray-500 p-2">No products found.</div>
                  ) : (
                    addOptionsFiltered.map((p) => (
                      <label
                        key={p.id}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isSelected(p.id)}
                          onChange={() => toggleSelect(p.id)}
                          className="h-4 w-4 mt-1"
                        />
                        <div className="text-sm">
                          <div className="font-medium">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.productCode} • {p.provider}</div>
                        </div>
                      </label>
                    ))
                  )}
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAdd(new Set());
                      setPanelOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleAddSelected}
                    disabled={selectedAdd.size === 0 || loading}
                    className="px-3 py-1.5 rounded-xl bg-[#44C0CF] hover:bg-[#3ab0bf] text-white text-sm disabled:opacity-50"
                  >
                    Add selected ({selectedAdd.size})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabela de produtos já associados */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Product Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Term (months)</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4">{p.productCode}</td>
                <td className="px-6 py-4">{p.termLength}</td>
                <td className="px-6 py-4">{p.provider}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onRemove(p.id)}
                    disabled={loading}
                    className="text-red-600 hover:underline disabled:opacity-50"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}