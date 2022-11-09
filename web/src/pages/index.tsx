import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import usersAvatarsImg from "../assets/users-avatar-example.png";
import logoImg from "../assets/logo.svg";
import iconCheckImg from "../assets/icon-check.svg";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");
  const [poolsNumber, setPoolsNumber] = useState(2034)

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      toast.success('Bolão criado com sucesso!')
      setPoolsNumber(poolsNumber + 1)
    } catch (error) {
      console.log(error);
      alert("Falha ao criar o bolão, tente novamente!");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto gap-28 grid grid-cols-2 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarsImg} alt="" quality={100} className="w-[150px]" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+12.592</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
          <ToastContainer theme="dark" position="top-center"/>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 text-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolsNumber.toLocaleString('pt-BR')}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-16 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  );
}
