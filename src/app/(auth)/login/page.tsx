// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/modules/auth/components/AuthProviderClient"; // ajuste o caminho se necessário

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // useAuth.login chama authService.loginApi internamente e atualiza o contexto
      await login(email, password);
      // redireciona para a homepage ou dashboard
      router.push("/");
    } catch (err: any) {
      console.log("err:", err)
      // apiFetchJson lança error com err.body quando disponível (veja implementação do api.client)
      const message = err?.body?.message ?? err?.message ?? "Erro ao autenticar";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#134C60] to-[#44C0CF] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6 border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#134C60]">Welcome to DAC</h1>
          <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dac.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#44C0CF]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#44C0CF] hover:bg-[#3ab0bf] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? <span className="animate-pulse">Logging in...</span> : <>
              <LogIn size={18} /> Sign In
            </>}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Forgot Password? <a href="#" className="text-[#44C0CF] hover:underline">Reset Here</a>
        </p>
      </div>
    </div>
  );
}