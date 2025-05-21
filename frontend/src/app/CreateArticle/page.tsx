import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="mx-7 my-4">
      <Navbar />

      <div className="max-w-md mx-auto mt-1">
        <h2 className="font-semibold color-[#1B1B1B]">Perfil</h2>

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
              className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-4">Nome</label>
          <input
            type="text"
            placeholder="John"
            className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-2">Sobrenome</label>
          <input
            type="text"
            placeholder="Doe"
            className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <hr className="border-gray-200 my-8" />

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value="johndoe@gmail.com"
            disabled
            className="w-full rounded-md border border-gray-300 p-2 bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-4">Senha</label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 mt-4">Confirmar senha</label>
          <input
            type="password"
            className="w-full rounded-md border border-gray-300 p-2 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-2xl hover:opacity-90 transition mt-4"
        >
          Salvar
        </button>
      </div>
    </div>
  );
}
