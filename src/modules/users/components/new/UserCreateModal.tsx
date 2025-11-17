"use client";

import { useState, useEffect } from "react";
import { X, Copy } from "lucide-react";
import { UserFormData } from "@/modules/users/types/user.form.data";
import { UserCreated } from "../../types/user.created";
import { useRoles } from "@/modules/users/hooks/useRoles";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (data: UserFormData) => Promise<UserCreated>;
  loading?: boolean;
  createdUser?: UserCreated | null;
}

export function UserCreateModal({ open, onClose, onCreate, loading, createdUser }: Props) {
  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    roleId: 0,
  });

  const { roles, loading: rolesLoading, error: rolesError } = useRoles();

  const [copied, setCopied] = useState(false);

  // Limpa o formulário quando o modal abre ou fecha
  useEffect(() => {
    if (open && !createdUser) {
      setUserData({ name: "", email: "", roleId: 0 });
      setCopied(false);
    }
  }, [open, createdUser]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (userData.roleId === 0) {
      alert("Please select a role");
      return;
    }
    try {
      await onCreate(userData);
    } catch (error) {
      alert("Error creating user");
    }
  };

  const copyPassword = () => {
    if (createdUser) {
      navigator.clipboard.writeText(createdUser.password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-fadeIn">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {!createdUser ? (
          <>
            <h2 className="text-2xl font-bold text-[#134C60] mb-6">Create User</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="role">Role</label>
                {rolesLoading ? (
                  <p>Loading roles...</p>
                ) : rolesError ? (
                  <p className="text-red-600">Error loading roles</p>
                ) : (
                  <select
                    id="role"
                    value={userData.roleId}
                    onChange={(e) => setUserData({ ...userData, roleId: Number(e.target.value) })}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value={0} disabled>
                      Select a role
                    </option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 px-6 py-3 rounded-xl bg-[#44C0CF] hover:bg-[#3ab0bf] text-white transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Create User"}
              </button>
            </form>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#134C60] mb-4">User Created Successfully!</h2>
            <p><strong>Name:</strong> {createdUser.name}</p>
            <p><strong>Email:</strong> {createdUser.email}</p>
            <p><strong>Role:</strong> {createdUser.role}</p>
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded flex items-center justify-between">
              <span><strong>Password:</strong> {createdUser.password}</span>
              <button
                onClick={copyPassword}
                className="flex items-center gap-1 text-sm text-[#44C0CF] hover:text-[#3ab0bf]"
                aria-label="Copy password"
              >
                <Copy size={16} />
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