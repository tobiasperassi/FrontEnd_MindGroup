'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";
import { AiFillHeart } from "react-icons/ai";

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

export default function Articles() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const isLoggedIn = true; // Replace with actual auth logic

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
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        {loading ? (
          <p className="text-center text-gray-600">Carregando artigos...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artigos.map((artigo) => (
              <div
                key={artigo.id}
                className="bg-white rounded-lg cursor-pointer hover:bg-gray-50 transition p-4"
                onClick={() => router.push(`/artigo/${artigo.id}`)}
              >
                <ImageWithFallback
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  width={300}
                  height={200}
                  className="rounded-t-lg w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-2">
                    {artigo.titulo}
                  </h2>
                  <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                    {artigo.conteudo.substring(0, 150)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-gray-500">
                    <span>
                      👤 Por {artigo.autor.nome} {artigo.autor.sobrenome} —{" "}
                      {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
                    </span>
                    <AiFillHeart className="text-red-500 text-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}