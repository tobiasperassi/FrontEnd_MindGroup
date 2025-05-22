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

export default function Home() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  if (loading) return <p>Carregando artigos...</p>;

  const principal = artigos[0];
  const newArticles = artigos.slice(1, 5); // próximos 4
  const carrossel = artigos.slice(5, 8); // próximos 3

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-2xl mx-auto px-2 pt-4">
        {principal && (
          <div
            className="cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition"
            onClick={() => router.push(`/artigo/${principal.id}`)}
          >
            <ImageWithFallback
              src={principal.imagem}
              alt={principal.titulo}
              width={800}
              height={450}
              className="rounded-lg w-full h-auto object-cover"
            />
            <h2 className="text-2xl font-bold mt-4 text-gray-900">
              {principal.titulo}
            </h2>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span className="flex items-center space-x-2">
                <img
                  src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740"
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Avatar"
                />
                <span>
                  Por {principal.autor.nome} {principal.autor.sobrenome} —{" "}
                  {new Date(principal.data_criacao).toLocaleDateString("pt-BR")}
                </span>
              </span>
              <AiFillHeart className="text-red-500 text-xl" />
            </div>
          </div>
        )}

        {/* Seção New */}
        <div className="bg-black text-white p-4 mt-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">New</h3>
          <ul className="space-y-3 text-sm">
            {newArticles.map((artigo) => (
              <li
                key={artigo.id}
                className="cursor-pointer hover:underline"
                onClick={() => router.push(`/artigo/${artigo.id}`)}
              >
                <strong>{artigo.titulo}</strong>
                <p className="text-gray-300">{artigo.conteudo.substring(0, 100)}...</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Carrossel de Artigos */}
        <div className="mt-6 overflow-x-auto">
          <div className="flex space-x-4">
            {carrossel.map((artigo) => (
              <div
                key={artigo.id}
                className="min-w-[250px] bg-white border rounded-lg shadow-md p-2 cursor-pointer"
                onClick={() => router.push(`/artigo/${artigo.id}`)}
              >
                <img
                  src={artigo.imagem}
                  alt={artigo.titulo}
                  className="rounded-lg w-full h-40 object-cover"
                />
                <h4 className="mt-2 font-semibold text-base">{artigo.titulo}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {new Date(artigo.data_criacao).toLocaleDateString("pt-BR")}
                </p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>{artigo.autor.nome}</span>
                  <AiFillHeart className="text-red-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
