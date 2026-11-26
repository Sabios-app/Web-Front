import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import LogoSabios from "../components/LogoSabios";

export default function AuthLayout({ children, imagem }) {
  return (
    <div className="flex min-h-screen">
      <aside className="relative hidden w-2/5 flex-col justify-between overflow-hidden bg-verde-petroleo p-9 text-white lg:flex">
        {imagem && (
          <>
            <img
              src={imagem}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-verde-escuro/95 via-verde-petroleo/70 to-verde-petroleo/60"
            />
          </>
        )}

        <LogoSabios claro className="relative self-start" />

        <div className="relative">
          <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-dourado-claro">
            <Heart size={24} aria-hidden="true" />
          </span>
          <blockquote className="font-titulo text-4xl leading-tight">
            “Experiência compartilhada vira caminho para quem está começando.”
          </blockquote>
        </div>

        <p className="relative text-sm text-white/85">
          © 2026 Sábios. Experiência que transforma.
        </p>
      </aside>

      <main className="relative flex flex-1 items-center justify-center bg-creme p-5 sm:p-9">
        <Link
          to="/"
          className="absolute left-5 top-5 inline-flex min-h-12 items-center gap-2 rounded-full border border-divisoria bg-white px-4 font-bold text-verde-titulo shadow-sm hover:bg-campo sm:left-9 sm:top-7"
        >
          <ArrowLeft size={20} aria-hidden="true" />
          Voltar ao inicio
        </Link>
        <div className="flex w-full justify-center pt-16 sm:pt-12">
          {children}
        </div>
      </main>
    </div>
  );
}
