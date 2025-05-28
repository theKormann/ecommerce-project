import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Página de Login | Hovet Lilicão e-commerce",
  description: "Esta é a página de login para o e-commerce Hovet Lilicão",
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
