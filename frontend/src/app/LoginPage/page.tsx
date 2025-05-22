"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
        // Armazene o token no localStorage, cookie ou state global
        localStorage.setItem("token", data.access_token);

        toast.success("Login realizado com sucesso!", {  duration: 3000})

        setTimeout(() => {
          
          router.push("/Home");
        })

        // Redirecionar para a home ou dashboard
        
      } else {
        toast.error("Credenciais inválidas.", {duration: 3000});
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao tentar fazer login.", {duration: 3000});
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4">
      <div className="px-5 mt-12 w-full max-w-md">
        <h1 className="text-[#1B1B1B] text-3xl font-bold mt-10">Bem-vindo de volta!</h1>
        <p className="text-[#1B1B1B] pt-6">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="px-5 mt-20 w-full max-w-md space-y-4"
      >
        <div>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>

        <div>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>

        <div className="pt-2 text-right">
          <Link href="/ForgotPassword" className="text-sm text-[#1B1B1B] hover:underline">
            Esqueceu a senha?
          </Link>
        </div>

        <div>
          <BotaoSubmit label="Login" />
        </div>

        <div className="flex items-center justify-center">
          <p className="text-black text-[12px]">
            Novo usuário? <Link href="/RegisterPage">Clique aqui</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
