'use client';

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/Common/Breadcrumb";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!token) {
      setError("Token de redefinição inválido ou expirado.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/auth/reset-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          token: token,
          newPassword: newPassword 
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao redefinir senha.");
      }

      setMessage("Sua senha foi alterada com sucesso!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro ao processar sua solicitação.");
    }
  };

  return (
    <>
      <Breadcrumb title="Escolher nova senha" pages={["Login", "Escolher nova senha"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[570px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-11">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Escolha uma nova senha
              </h2>
              <p>Insira uma nova senha e confirme-a</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="newPassword" className="block mb-2.5">Nova senha</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Digite sua nova senha"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                  minLength={6}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="confirmPassword" className="block mb-2.5">Confirmar nova senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirme sua nova senha"
                  className="rounded-lg border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                  required
                  minLength={6}
                />
              </div>

              {message && (
                <div className="text-green-600 text-center mb-4 p-3 bg-green-50 rounded-lg">
                  {message}
                </div>
              )}

              {error && (
                <div className="text-red-500 text-center mb-4 p-3 bg-red-50 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                disabled={!newPassword || !confirmPassword}
              >
                Redefinir senha
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;