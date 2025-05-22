'use client';
import Link from 'next/link';
import Image from "next/image";
import { useState } from "react";
import { FiX } from 'react-icons/fi';
import DesktopNavbar from './DesktopNavbar';
import Logo from './Logo';

export default function Navbar({ isLoggedIn = false }) { // Accept isLoggedIn as a prop
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const abrirSidebar = () => {
    setSidebarAberta(!sidebarAberta);
  };

  return (
    <div>
      {/* Desktop Navbar - Visible on medium screens and above */}
      <div className="hidden md:block">
        <DesktopNavbar isLoggedIn={isLoggedIn} />
      </div>

      {/* Mobile Navbar - Visible on smaller screens */}
      <div className="md:hidden">
        <nav className="flex items-center justify-between p-6">
          <div className="flex space-x-6">
            <Link href="/Home" className="text-gray-800 hover:text-gray-600 font-medium text-[10px] pr-5">
              Home
            </Link>
            <Link href="/Articles" className="text-gray-800 hover:text-gray-600 text-[10px] font-medium">
              Artigos
            </Link>
          </div>
          <div onClick={abrirSidebar} className="cursor-pointer">
            <img
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </nav>
        <div
          className={`fixed top-0 left-0 h-full w-full bg-white text-white transform ${
            sidebarAberta ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex justify-between items-center p-4">
            <Logo/>

            <button onClick={abrirSidebar} className="text-2xl">
              <FiX className="text-xl text-black hover:text-black cursor-pointer" size={24}/>
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
      </div>
    </div>
  );
}