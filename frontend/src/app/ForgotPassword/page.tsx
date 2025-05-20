"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function ForgotPassword() {

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4">
      <div className="px-5 mt-12 w-full max-w-md">
        <div className="flex items-center gap-4 mb-2">
          <Link href="/LoginPage" className="text-black hover:text-gray-600 mr-6">
            <FiArrowLeft size={24} />
          </Link>
          <h1 className="text-[#1B1B1B] text-3xl font-bold">Esqueci a senha</h1>
        </div>
        <p className="text-[#1B1B1B] pt-6">
          Sem problemas! Informe seu e-mail e enviaremos um link para redefinir sua senha.
        </p>
      </div>

      <div className=" px-5 mt-20 w-full max-w-md space-y-4">
        <div>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-md text-black border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Nova senha"
            className="w-full rounded-md text-black border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Confirmar nova senha"
            className="w-full rounded-md text-black border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>

        <div className="mt-8">
            <BotaoSubmit label={`Alterar`}/>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-black text-[12px]">Novo usuário? <Link href={'/RegisterPage'}>Clique aqui</Link></p>
        </div>
      </div>
    </div>
  );
}