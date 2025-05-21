'use client';
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";
import { AiFillHeart } from "react-icons/ai"; // ❤️ Ícone de coração

type Artigo = {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string;
  data_criacao: string;
  autor: {
    nome: string;
    sobrenome: string;
  };
};

export default function Home() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/artigos")
      .then((res) => res.json())
      .then((data) => {
        setArtigos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar artigos:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4">
        {loading ? (
          <p>Carregando artigos...</p>
        ) : (
          artigos.map((artigo) => (
            <div key={artigo.id} className="mb-12 pb-6">
              {/* Imagem */}
              <ImageWithFallback
                src={artigo.imagem}
                alt={artigo.titulo}
                width={800}
                height={450}
                className="rounded-lg w-full h-auto object-cover"
              />

              {/* Título */}
              <h2 className="text-2xl font-bold mt-4 text-gray-900">
                {artigo.titulo}
              </h2>

              {/* Conteúdo */}
              <p className="mt-2 text-base text-gray-700 leading-relaxed">
                {artigo.conteudo.substring(0, 300)}
              </p>

              {/* Autor, Data e Coração */}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                  👤 Por {artigo.autor.nome} {artigo.autor.sobrenome} —{" "}
                  {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
                </span>
                <AiFillHeart className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
