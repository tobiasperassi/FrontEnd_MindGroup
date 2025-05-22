'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import Logo from './Logo';

interface DesktopNavbarProps {
  isLoggedIn?: boolean; 
}

export default function DesktopNavbar({ isLoggedIn = false }: DesktopNavbarProps) {
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const abrirSidebar = () => {
    setSidebarAberta(!sidebarAberta);
  };

  return (
    <div>
      <nav className="flex items-center justify-between p-4 bg-white">
        <Logo/>

        <div className="flex space-x-6">
          <Link href="/Home" className="text-gray-800 hover:text-gray-600 font-medium">
            Home
          </Link>
          <Link href="/Articles" className="text-gray-800 hover:text-gray-600 font-medium">
            Artigos
          </Link>
          <Link href="/CreateArticle" className="text-gray-800 hover:text-gray-600 font-medium">
            Publicar
          </Link>
        </div>

        <div>
          {isLoggedIn ? (
            <div onClick={abrirSidebar} className="cursor-pointer">
              <img
                src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/LoginPage">
                <button className="text-gray-800 font-medium hover:text-gray-600">
                  Entrar
                </button>
              </Link>
              <Link href="/Register">
                <button className="bg-black text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition">
                  Registrar
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {isLoggedIn && (
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white text-white transform ${
            sidebarAberta ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
        >
          <div className="flex justify-between items-center p-4">
            <Logo/>

            <button onClick={abrirSidebar} className="text-2xl">
              <FiX className="text-xl text-black hover:text-black cursor-pointer" size={24} />
            </button>
          </div>
          <div className="flex flex-col space-y-4 p-4 text-right">
            <Link href="/Perfil" className="text-black text-xl" onClick={abrirSidebar}>
              Perfil
            </Link>
            <Link href="/MyArticles" className="text-black text-xl" onClick={abrirSidebar}>
              Meus Artigos
            </Link>
            <Link href="/CreateArticle" className="text-black text-xl" onClick={abrirSidebar}>
              Criar novo Artigo
            </Link>
          </div>
          <div className="text-right mr-4 h-full">
            <Link href="/LoginPage" className="text-black text-xl align-text-bottom" onClick={abrirSidebar}>
              Sair
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}