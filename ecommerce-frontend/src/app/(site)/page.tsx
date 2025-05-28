import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hovet Lilicão | E-commerce",
  description: "O melhor lugar para comprar! Hovet Lilicão E-commerce",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
