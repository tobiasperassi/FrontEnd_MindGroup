'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Tipo do payload do token JWT
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
      alert("Você precisa estar logado para criar um artigo.");
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
      alert("Usuário não autenticado!");
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
        alert("Artigo criado com sucesso!");
        console.log("Artigo criado:", data);
        // Redirecionar ou limpar campos se quiser
      } else {
        const err = await response.json();
        alert("Erro ao criar artigo: " + err.message);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro ao conectar ao servidor.");
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
              src="/imagemteste.png"
              alt="Banner"
              className="w-25 h-25 rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <h1 className="mb-2">Banner</h1>
            <input
              type="text"
              placeholder="imagem-de-perfil123.png"
              className="w-full rounded-md border border-gray-300 p-5 text-[13px]"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>
        </div>

        <h1 className="mt-3">Título</h1>
        <input
          type="text"
          placeholder="Adicione um título"
          className="w-full rounded-md border border-gray-300 p-5 mt-2 text-[13px]"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          maxLength={80}
        />

        <h1 className="mt-3">Texto</h1>
        <textarea
          placeholder="Escreva seu artigo"
          className="w-full rounded-md border border-gray-300 p-5 mt-2 text-[13px] resize-none h-100"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          maxLength={999}
        />

        <button
          type="button"
          className="w-full bg-black text-white py-2 rounded-2xl hover:opacity-90 transition mt-4"
          onClick={handleSubmit}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
