'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

type Artigo = {
  id: number;
  titulo: string;
  conteudo: string;
  imagem: string;
  data_criacao: string;
  data_atualizacao: string;
  autor: {
    nome: string;
    sobrenome: string;
    id: number;
  };
};

type JwtPayload = {
  sub: number;
};

export default function MyArticles() {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUsuarioId(decoded.sub);
    } catch (error) {
      console.error("Token inválido:", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (usuarioId === null) return;

    fetch("http://localhost:3000/artigos")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar artigos");
        return res.json();
      })
      .then((data: Artigo[]) => {
        const meusArtigos = data.filter(
          (artigo) => artigo.autor?.id === usuarioId
        );
        setArtigos(meusArtigos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar artigos:", err);
        setLoading(false);
      });
  }, [usuarioId]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h1 className="text-xl font-semibold mb-6">Meus Artigos</h1>

        {loading ? (
          <p className="text-gray-500">Carregando artigos...</p>
        ) : artigos.length === 0 ? (
          <p className="text-gray-500">Você ainda não publicou nenhum artigo.</p>
        ) : (
          <div className="flex flex-col gap-5">
            {artigos.map((artigo) => (
              <div
                key={artigo.id}
                className="flex flex-col bg-white rounded-xl p-4 items-start gap-4"
                >
                <div className="flex flex-row">
                    <ImageWithFallback
                        src={artigo.imagem}
                        width={96}
                        height={96}
                        className="w-22 h-24 rounded-lg object-cover"
                    />
                    <h2 className="text-sm font-semibold text-gray-800 mb-2 items-center p-4 leading-snug">
                        {artigo.titulo}
                    </h2>
                </div>
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between">
                        
                        <p className="text-[12px] text-gray-500">
                            Criado em: {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
                        </p>
                        <p className="text-[12px] text-gray-500">
                            Alterado em: {new Date(artigo.data_atualizacao).toLocaleDateString("pt-BR")}
                        </p>
                    </div>
                    <div className="flex justify-around w-1/2 items-center">
                    <div className="flex items-center text-red-500 text-sm gap-x-1">
                            <FaHeart size={14} />
                            <span className="text-[13px]">16</span>
                        </div>

                    <div className="flex flex-row items-center gap-3">
                        
                        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition">
                            <FaTrash size={14} />
                        </button>
                        <button className="bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-lg transition">
                            <FaEdit size={14} />
                        </button>
                    </div>
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
