import { Footer } from "@/components/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadastro de Produtos",
  description: "Cadastro simples de produtos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        {children} 
       <Footer label="Desenvolvido por Miqueias Rodrigues"/>
      </body>
    </html>
  );
}
