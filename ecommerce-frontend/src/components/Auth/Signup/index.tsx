'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useAuth } from "@/app/context/AuthContext";

const Signup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao registrar");
      }

      const loginRes = await fetch("http://localhost:8080/auth/signIn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: email, password })
      });

      const loginData = await loginRes.json();
      if (!loginRes.ok) {
        throw new Error(loginData.message || "Erro ao fazer login após cadastro");
      }

      authLogin(loginData.token, loginData.user);
      setMessage("Cadastro realizado com sucesso!");

      setTimeout(() => {
        router.push("/");
      }, 1000);

    } catch (err: any) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <>
      <Breadcrumb title="Cadastro" pages={["Cadastro"]} />
      <section className="overflow-hidden py-20 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-[#375d8a] mb-1.5">
                Crie sua conta
              </h2>
              <p className="text-[#5c6e91]">Preencha os dados abaixo</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="nome" className="block mb-2.5 text-[#375d8a] font-medium">Nome</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="rounded-lg border border-gray-300 bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#376f8a]"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5 text-[#375d8a] font-medium">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu e-mail"
                  className="rounded-lg border border-gray-300 bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#376f8a]"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5 text-[#375d8a] font-medium">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Crie uma senha"
                    className="rounded-lg border border-gray-300 bg-gray-100 placeholder:text-gray-500 w-full py-3 px-5 pr-20 outline-none focus:ring-2 focus:ring-[#376f8a]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sm text-[#376f8a] hover:text-[#274766]"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              {message && (
                <p className={`text-center mb-4 text-sm ${isError ? "text-red-500" : "text-green-600"}`}>
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-[#375d8a] py-3 px-6 rounded-lg hover:bg-[#274766] transition"
              >
                Criar Conta
              </button>

              <p className="text-center mt-6 text-[#5c6e91]">
                Já tem uma conta?
                <Link href="/signin" className="text-[#375d8a] hover:text-[#274766] pl-2">
                  Faça login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
