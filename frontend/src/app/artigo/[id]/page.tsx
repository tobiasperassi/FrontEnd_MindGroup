'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";

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

export default function ArtigoPage() {
  const { id } = useParams();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = true; 

  useEffect(() => {
    fetch(`http://localhost:3000/artigos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar artigo");
        return res.json();
      })
      .then((data) => {
        setArtigo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4 text-center text-gray-600">Carregando artigo...</p>;
  if (!artigo) return <p className="p-4 text-center text-gray-600">Artigo não encontrado.</p>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} />
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <ImageWithFallback
          src={artigo.imagem}
          alt={artigo.titulo}
          width={800}
          height={450}
          className="rounded-lg w-full h-64 md:h-96 object-cover"
        />
        <div className="mt-6 md:mt-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{artigo.titulo}</h1>
          <div className="mt-2 text-sm md:text-base text-gray-500">
            Por {artigo.autor.nome} {artigo.autor.sobrenome} —{" "}
            {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
          </div>
          <p className="mt-6 text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed">{artigo.conteudo}</p>
        </div>
      </div>
    </div>
  );
}