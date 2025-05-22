"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Toaster } from "sonner";
import LogoBranca from "@/components/LogoBranca";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <div className="flex flex-col md:flex-row h-screen mt-12 md:mt-0">
        {/* Black Section (Left) */}
        <div className="hidden md:flex w-full md:w-1/2 bg-black flex-col items-center justify-center p-8 md:p-12">
          <LogoBranca />
          <p className="text-white text-sm md:text-base lg:text-lg mt-4">Conteúdo que inspira</p>
        </div>

        {/* Form Section (Right) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/LoginPage" className="text-black hover:text-gray-600">
                <FiArrowLeft size={24} />
              </Link>
              <h1 className="text-[#1B1B1B] text-2xl md:text-3xl font-bold">Esqueci a senha</h1>
            </div>
            <p className="text-[#1B1B1B] text-sm md:text-base lg:text-lg leading-relaxed">
              Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
            </p>

            <div className="mt-10 md:mt-16 space-y-4">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Nova senha"
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirmar nova senha"
                className="w-full rounded-md text-black border-[#9E9E9E] p-3 md:p-4 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B] text-sm md:text-base"
              />
            </div>

            <div className="mt-8">
              <BotaoSubmit label="Alterar" />
            </div>

            <div className="flex items-center justify-center mt-4">
              <p className="text-black text-xs md:text-sm">
                Novo usuário?{" "}
                <Link href="/RegisterPage" className="underline hover:text-gray-600">
                  Clique aqui
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}