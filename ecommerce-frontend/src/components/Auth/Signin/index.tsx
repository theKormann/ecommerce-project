'use client';

import { useState } from "react";
import Link from "next/link";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { login } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";

const Signin = () => {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:8080/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: loginInput, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erro ao fazer login");
      }

      const { token, user } = data;
      
      dispatch(login({ user, token }));
      
      setMessage("Login realizado com sucesso!");
      
      window.location.href = "/"; 

    } catch (err: any) {
      setMessage(err.message);
      setIsError(true);
    }
  };


  return (
    <>
      <Breadcrumb title="Faça Login" pages={["Login"]} />
      <section className="overflow-hidden py-20 bg-gray-100">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-md p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-[#375d8a] mb-1.5">
                Entre com sua conta
              </h2>
              <p className="text-gray-600">Insira seus dados abaixo</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="login" className="block mb-2.5 text-[#375d8a]">Usuário ou E-mail</label>
                <input
                  type="text"
                  id="login"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Digite seu e-mail ou nome de usuário"
                  className="rounded-lg border border-gray-300 bg-gray-50 placeholder:text-gray-500 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#375d8a]"
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2.5 text-[#375d8a]">Senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                    className="rounded-lg border border-gray-300 bg-gray-50 placeholder:text-gray-500 w-full py-3 px-5 pr-20 outline-none focus:ring-2 focus:ring-[#375d8a]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sm text-[#375d8a] hover:text-[#376f8a]"
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
                className="w-full flex justify-center font-medium text-white bg-[#375d8a] py-3 px-6 rounded-lg hover:bg-[#376f8a] mt-7.5"
              >
                Entrar
              </button>

              <Link
                href="/forget-password"
                className="block text-center text-[#375d8a] mt-4.5 hover:text-[#376f8a]"
              >
                Esqueci minha senha
              </Link>

              <p className="text-center mt-6 text-gray-600">
                Não tem uma conta?
                <Link href="/signup" className="text-[#375d8a] hover:text-[#376f8a] pl-2">
                  Registre-se agora!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
