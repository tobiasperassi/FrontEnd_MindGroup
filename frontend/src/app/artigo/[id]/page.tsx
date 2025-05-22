// app/artigo/[id]/page.tsx
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

  if (loading) return <p className="p-4">Carregando artigo...</p>;
  if (!artigo) return <p className="p-4">Artigo não encontrado.</p>;

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto py-8 px-4">
        <ImageWithFallback
          src={artigo.imagem}
          alt={artigo.titulo}
          width={800}
          height={450}
          className="rounded-lg w-full h-auto object-cover"
        />
        <h1 className="text-3xl font-bold mt-4 text-gray-900">{artigo.titulo}</h1>
        <div className="mt-2 text-sm text-gray-500">
          Por {artigo.autor.nome} {artigo.autor.sobrenome} —{" "}
          {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
        </div>
        <p className="mt-6 text-base text-gray-800 leading-relaxed">{artigo.conteudo}</p>
      </div>
    </div>
  );
}
