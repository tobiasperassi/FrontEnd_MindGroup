'use client';

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ImageWithFallback from "@/components/ImageWithFallback";
import { FaHeart, FaTrash, FaEdit } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';

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
  const [showModal, setShowModal] = useState(false);
  const [selectedArtigo, setSelectedArtigo] = useState<Artigo | null>(null);

  const router = useRouter();

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

  const abrirModal = (artigo: Artigo) => {
    setSelectedArtigo(artigo);
    setShowModal(true);
  };

  const fecharModal = () => {
    setSelectedArtigo(null);
    setShowModal(false);
  };

  const excluirArtigo = async () => {
    if (!selectedArtigo) return;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:3000/artigos/${selectedArtigo.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao excluir");

      setArtigos(artigos.filter(a => a.id !== selectedArtigo.id));
      fecharModal();
    } catch (error) {
      console.error("Erro ao excluir artigo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="ml-3">
        <Navbar />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-semibold mb-4 mx-4 text-[12px]">Meus Artigos</h1>

        {loading ? (
          <p className="text-gray-500">Carregando artigos...</p>
        ) : artigos.length === 0 ? (
          <p className="text-gray-500">Você ainda não publicou nenhum artigo.</p>
        ) : (
          <div className="flex flex-col">
            {artigos.map((artigo) => (
              <div
                key={artigo.id}
                onClick={() => router.push(`/artigo/${artigo.id}`)}
                className="flex flex-col bg-white rounded-xl px-4 py-2 items-start gap-2 cursor-pointer hover:bg-gray-50 transition"
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModal(artigo);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg transition"
                      >
                        <FaTrash size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/UpdateArticle?id=${artigo.id}`);
                        }}
                        className="bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-lg transition"
                      >
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

      {showModal && selectedArtigo && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Excluir artigo?</h2>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 mb-4">
              <p className="text-base font-semibold">{selectedArtigo.titulo}</p>
              <p className="text-sm text-gray-600">
                Criado em: {new Date(selectedArtigo.data_criacao).toLocaleDateString("pt-BR")}
              </p>
              <p className="text-sm text-gray-600">
                Atualizado em: {new Date(selectedArtigo.data_atualizacao).toLocaleDateString("pt-BR")}
              </p>
            </div>

            <p className="text-sm text-gray-700 mb-6">
              Você tem certeza que deseja excluir este artigo? Essa ação não poderá ser desfeita.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={fecharModal}
                className="text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={excluirArtigo}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-2"
              >
                <FaTrash size={14} /> Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
