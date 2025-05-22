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
  const router = useRouter(); // <- Adicionado aqui

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
      <div className="ml-2">
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto px-2">
        {loading ? (
          <p>Carregando artigos...</p>
        ) : (
          artigos.map((artigo) => (
            <div
              key={artigo.id}
              className=" pb-6 cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition"
              onClick={() => router.push(`/artigo/${artigo.id}`)}
            >
              <ImageWithFallback
                src={artigo.imagem}
                alt={artigo.titulo}
                width={800}
                height={450}
                className="rounded-lg w-full h-auto object-cover"
              />

              <h2 className="text-2xl font-bold mt-4 text-gray-900">
                {artigo.titulo}
              </h2>

              <p className="mt-2 text-base text-gray-700 leading-relaxed">
                {artigo.conteudo.substring(0, 300)}...
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>
                  👤 Por {artigo.autor.nome} {artigo.autor.sobrenome} —{" "}
                  {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
                </span>
                <AiFillHeart className="text-red-500 text-xl" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
