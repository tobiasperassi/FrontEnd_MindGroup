"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Tipo do payload do token JWT
type JwtPayload = {
  sub: number;
  email: string;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState(""); // <- novo estado para o e-mail
  const router = useRouter();


  // Decodifica o token e extrai o userId
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      router.push("/LoginPage");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserId(decoded.sub);
      setEmail(decoded.email);
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      localStorage.removeItem("token");
      router.push("/LoginPage");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!userId) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      setLoading(true);

      const updateData: any = {};
      if (nome) updateData.nome = nome;
      if (sobrenome) updateData.sobrenome = sobrenome;
      if (senha) updateData.password = senha;

      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:3000/auth/update/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Perfil atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-7 my-4">
      <Navbar />

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-1">
        <h2 className="font-semibold text-[#1B1B1B]">Perfil</h2>

        <div className="flex items-center space-x-4">
          <img
            src="/imagemteste.png"
            alt="Avatar"
            className="w-20 h-20 mt-4 rounded-full object-cover"
          />
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Avatar</label>
            <input
              type="text"
              placeholder="imagem-de-perfil123.png"
              className="w-full rounded-md border border-gray-300 p-2"
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-4">Nome</label>
          <input
            type="text"
            placeholder="John"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-2">Sobrenome</label>
          <input
            type="text"
            placeholder="Doe"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <hr className="border-gray-200 my-8" />

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="w-full rounded-md border border-gray-300 p-2 bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-4">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-4">Confirmar senha</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-2xl hover:opacity-90 transition mt-4"
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
