'use client'

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

// Tipo do payload do token JWT
type JwtPayload = {
  sub: number;
  email: string;
};

export default function UpdateArticle() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get("id");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado.", {duration: 3000});
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

  useEffect(() => {
    if (articleId) {
      fetch(`http://localhost:3000/artigos/${articleId}`)
        .then(res => res.json())
        .then(data => {
          setTitulo(data.titulo);
          setConteudo(data.conteudo);
          setImagem(data.imagem);
        })
        .catch(err => {
          console.error("Erro ao carregar artigo:", err);
          toast.error("Erro ao carregar artigo.", {duration: 3000});
        });
    }
  }, [articleId]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    if (!token || !userId || !articleId) {
      toast.error("Dados insuficientes para atualizar o artigo.", {duration: 3000});
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/artigos/${articleId}`, {
        method: "PUT",
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
        toast.success("Artigo atualizado com sucesso!", {duration: 3000});
        router.push("/MyArticles"); // Redireciona de volta
      } else {
        const err = await response.json();
        toast.error("Erro ao atualizar artigo: " + err.message, {duration: 3000});
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
        <h1 className="font-semibold">Editar Artigo</h1>

        <div className="flex flex-row items-start mt-4 gap-4">
          <div className="flex-shrink-0">
            <img
              src={imagem || "/imagemteste.png"}
              alt="Banner"
              className="w-25 h-25 rounded-xl object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow">
            <h1 className="mb-2 text-[13px] ">Banner</h1>
            <input
              type="text"
              placeholder="imagem-de-perfil123.png"
              className="w-full rounded-md border border-gray-300 p-5 text-[13px]"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </div>
        </div>

        <h1 className="mt-3 text-[13px]">Título</h1>
        <input
          type="text"
          placeholder="Adicione um título"
          className="w-full rounded-md border border-gray-300 p-5 mt-2 text-[13px]"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          maxLength={80}
        />

        <h1 className="mt-3 text-[13px]">Texto</h1>
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
          onClick={handleUpdate}
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
