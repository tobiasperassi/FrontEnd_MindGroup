'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type JwtPayload = {
  sub: number;
  email: string;
};

export default function CreateArticle() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado para criar um artigo.", {duration: 3000});
      router.push("/LoginPage");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserId(decoded.sub);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      localStorage.removeItem("token");
      router.push("/LoginPage");
    }
  }, [router]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token || !userId) {
      toast.error("Usuário não autenticado!", {duration: 3000});
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/artigos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo,
          conteudo,
          imagem,
          autor_id: userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Artigo criado com sucesso!", {duration: 3000});
        console.log("Artigo criado:", data);
      } else {
        const err = await response.json();
        toast.error("Erro ao criar artigo: " + err.message, {duration: 3000});
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      toast.error("Erro ao conectar ao servidor.", {duration: 3000});
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-5 flex flex-col">
        <h1>Criar Artigo</h1>
        
        <div className="flex flex-row items-start mt-4 gap-4">
          <div className="flex-shrink-0">
            <img
              src="https://st2.depositphotos.com/1001599/7241/v/950/depositphotos_72418305-stock-illustration-camera-thin-line-icon.jpg"
              alt="Banner"
              className="w-25 h-25 rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <h1 className="mb-2">Banner</h1>
            <input
              type="text"
              placeholder="imagem-de-perfil123.png"
              className="w-full rounded-md border border-gray-500 p-5 text-[13px]"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>
        </div>

        <h1 className="mt-3">Título</h1>
        <input
          type="text"
          placeholder="Adicione um título"
          className="w-full rounded-md border border-gray-500 p-5 mt-2 text-[13px]"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          maxLength={100}
        />

        <h1 className="mt-3">Texto</h1>
        <textarea
          placeholder="Escreva seu artigo"
          className="w-full rounded-md border border-gray-500 p-5 mt-2 text-[13px] resize-none h-100"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          maxLength={2999}
        />

        <button
          type="button"
          className="w-full bg-black text-white py-4 rounded-2xl hover:opacity-90 transition mt-8"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
