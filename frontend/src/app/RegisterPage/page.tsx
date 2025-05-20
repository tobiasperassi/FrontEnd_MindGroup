"use client";

import BotaoSubmit from "@/components/BotaoSubmit";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  return (
    <div className="min-h-screen flex flex-col items-center bg-white px-4">
      <div className="px-5 mt-12 w-full max-w-md">
        <h1 className="text-[#1B1B1B] text-3xl font-bold mt-10">Registrar</h1>
        <p className="text-[#1B1B1B] pt-6">
          Crie sua conta para explorar conteúdos incríveis, seguir autores e participar da comunidade.
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

        <div>
          
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Confirmar senha"
            className="w-full rounded-md border-[#9E9E9E] p-3 border placeholder-[#9E9E9E] focus:outline-none focus:ring-1 focus:ring-[#1B1B1B]"
          />
        </div>

        <div>
            <BotaoSubmit label={`login`}/>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-black">Já tem um cadastro? <Link href={'/LoginPage'}>Clique aqui</Link></p>
        </div>
      </div>
    </div>
  );
}