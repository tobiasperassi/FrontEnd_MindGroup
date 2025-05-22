"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Toaster, toast } from "sonner";
import Logo from "@/components/Logo";
import LogoBranca from "@/components/LogoBranca";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", { duration: 3000 });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        toast.success("Cadastro realizado com sucesso!", { duration: 3000 });
        router.push("/LoginPage");
      } else {
        const data = await res.json();
        toast.error("Erro ao cadastrar: " + (data.message || "Erro desconhecido"), { duration: 3000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao conectar com a API.", { duration: 3000 });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="hidden md:flex w-full md:w-1/2 bg-black flex-col items-center justify-center p-8 md:p-12">
          <LogoBranca/>
          <p className="text-white text-sm md:text-base lg:text-lg mt-4">Conteúdo que inspira</p>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <form onSubmit={handleRegister} className="w-full max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/LoginPage" className="text-black hover:text-gray-600">
                <FiArrowLeft size={24} />
              </Link>
              <h1 className="text-[#1B1B1B] text-2xl md:text-3xl font-bold">Registrar</h1>
            </div>
            <p className="text-[#1B1B1B] text-sm md:text-base lg:text-lg leading-relaxed">
              Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
            </p>

            <div className="mt-10 md:mt-16 space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
              <input
                type="password"
                placeholder="Senha"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
              <input
                type="password"
                placeholder="Confirmar senha"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
            </div>

            <div className="flex items-center mt-6">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-[#9E9E9E] text-[#1B1B1B] focus:ring-[#1B1B1B]"
              />
              <label htmlFor="terms" className="ml-3 text-xs md:text-sm text-[#1B1B1B]">
                Li e concordo com os Termos de Uso e a Política de Privacidade
              </label>
            </div>

            <div className="mt-8">
              <BotaoSubmit label="Criar conta" />
            </div>

            <div className="flex items-center justify-center mt-4">
              <p className="text-black text-xs md:text-sm">
                Já tem um cadastro?{" "}
                <Link href={"/LoginPage"} className="underline hover:text-gray-600">
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