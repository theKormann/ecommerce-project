import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página de Wishlist | Hovet Lilicão e-commerce",
  description: "Esta é a página de wishlist para o e-commerce Hovet Lilicão",
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
