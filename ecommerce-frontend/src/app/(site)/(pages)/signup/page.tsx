import Signup from "@/components/Auth/Signup";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Página de Cadastro | Hovet Lilicão e-commerce",
  description: "Esta é a página de cadastro para o e-commerce Hovet Lilicão",
};

const SignupPage = () => {
  return (
    <main>
      <Signup />
    </main>
  );
};

export default SignupPage;
