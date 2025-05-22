"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import LogoBranca from "@/components/LogoBranca";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        toast.success("Login realizado com sucesso!", { duration: 3000 });
        setTimeout(() => {
          router.push("/Home");
        });
      } else {
        toast.error("Credenciais inválidas.", { duration: 3000 });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao tentar fazer login.", { duration: 3000 });
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <div className="flex flex-col md:flex-row h-screen mt-12 md:mt-0">
        <div className="hidden md:flex w-full md:w-1/2 bg-black flex-col items-center justify-center p-8 md:p-12">
          <LogoBranca />
          <p className="text-white text-sm md:text-base lg:text-lg mt-4">Conteúdo que inspira</p>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <h1 className="text-[#1B1B1B] text-2xl md:text-3xl font-bold">Bem-vindo de volta!</h1>
            <p className="text-[#1B1B1B] text-sm md:text-base lg:text-lg mt-4 leading-relaxed">
              Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
            </p>

            <div className="mt-10 md:mt-16 space-y-4">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />

              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
            </div>

            <div className="pt-2 text-right">
              <Link href="/ForgotPassword" className="text-sm text-[#1B1B1B] hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            <div className="mt-8">
              <BotaoSubmit label="Login" />
            </div>

            <div className="flex items-center justify-center mt-4">
              <p className="text-black text-xs md:text-sm">
                Novo usuário?{" "}
                <Link href="/RegisterPage" className="underline hover:text-gray-600">
                  Clique aqui
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}