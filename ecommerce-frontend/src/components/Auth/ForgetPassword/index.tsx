'use client';

import { useState } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:8080/auth/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.text(); 

      if (!res.ok) {
        throw new Error(data || "Erro ao solicitar recuperação de senha");
      }

      setMessage("E-mail de recuperação enviado com sucesso!");
    } catch (err: any) {
      setMessage(err.message);
      setIsError(true);
    }
  };

  return (
    <>
      <Breadcrumb title="Recuperar Senha" pages={["Recuperar Senha"]} />
      <section className="overflow-hidden py-20 bg-gray-100">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-md p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-[#375d8a] mb-1.5">
                Esqueceu sua senha?
              </h2>
              <p className="text-gray-600">Insira seu e-mail para receber o link de recuperação</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2.5 text-[#375d8a]">E-mail</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="rounded-lg border border-gray-300 bg-gray-50 placeholder:text-gray-500 w-full py-3 px-5 outline-none focus:ring-2 focus:ring-[#375d8a]"
                  required
                />
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
                Enviar e-mail de recuperação
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
