"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4">
      <div className="px-5 mt-12 w-full max-w-md">
        <h1 className="text-[#1B1B1B] text-3xl font-bold mt-10">Bem-vindo de volta!</h1>
        <p className="text-[#1B1B1B] pt-6">
          Acesse sua conta para acompanhar artigos exclusivos, favoritar e muito mais.
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
            className="w-full rounded-md border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>

        <div className="pt-2 text-right">
          <Link href="/ForgotPassword" className="text-sm text-[#1B1B1B] hover:underline">
            Esqueceu a senha?
          </Link>
        </div>

        <div>
            <BotaoSubmit label={`Login`}/>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-black text-[12px]">Novo usuario? <Link href={'/RegisterPage'}>Clique aqui</Link></p>
        </div>
      </div>
    </div>
  );
}