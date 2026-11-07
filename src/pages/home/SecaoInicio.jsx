import { Search, Star } from 'lucide-react'
import { buscasFrequentes, imagens } from './dadosHome'

export default function SecaoInicio() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Círculo decorativo do fundo, como no Figma */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 hidden h-80 w-80 rounded-full border border-divisoria lg:block"
      />

      <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pb-16 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
        <div className="relative z-10">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-dourado/50 bg-dourado-aviso px-4 py-2 text-sm font-extrabold uppercase tracking-[.16em] text-dourado-texto">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-dourado" />
            Experiência que transforma
          </p>

          <h1 className="max-w-[680px] font-titulo text-5xl font-medium leading-[1.06] tracking-tight text-verde-titulo sm:text-6xl lg:text-[72px]">
            Quem já viveu,
            <br />
            <em className="font-normal text-dourado-escuro">sabe o caminho.</em>
          </h1>

          <p className="mt-6 max-w-[590px] text-xl leading-relaxed text-texto-secundario">
            Conectamos você a profissionais sêniores que transformam décadas de experiência em decisões melhores
            para o seu negócio.
          </p>

          <form
            action="/especialistas"
            role="search"
            className="mt-8 flex max-w-[630px] flex-col gap-2 rounded-2xl bg-white p-2 shadow-[0_18px_55px_rgba(23,59,58,.13)] sm:flex-row sm:items-center"
          >
            <label htmlFor="busca-desafio" className="sr-only">
              Qual desafio você quer resolver?
            </label>
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search aria-hidden="true" size={22} className="shrink-0 text-dourado-escuro" />
              <input
                id="busca-desafio"
                name="busca"
                type="search"
                placeholder="Qual desafio você quer resolver?"
                className="min-h-14 w-full bg-transparent text-lg text-verde-titulo placeholder:text-texto-secundario focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="min-h-14 rounded-xl bg-dourado px-6 text-lg font-bold text-verde-escuro transition-colors hover:bg-dourado-claro"
            >
              Buscar especialista
            </button>
          </form>

          <div className="so-completo mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-bold text-verde-titulo">Buscas frequentes:</span>
            {buscasFrequentes.map((termo) => (
              <a
                key={termo}
                href={`/especialistas?busca=${encodeURIComponent(termo)}`}
                className="text-texto-secundario underline decoration-divisoria underline-offset-[6px] hover:text-verde-titulo hover:decoration-verde-titulo"
              >
                {termo}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:mr-0">
          {/* Forma dourada atrás da foto */}
          <div
            aria-hidden="true"
            className="absolute -right-5 -top-5 h-[88%] w-[88%] rounded-[44%_56%_45%_55%/52%_42%_58%_48%] bg-dourado-areia"
          />
          <div className="relative ml-auto aspect-[.88] w-[88%] overflow-hidden rounded-[46%_54%_48%_52%/40%_43%_57%_60%] bg-campo">
            <img
              src={imagens.hero}
              alt="Profissionais conversando durante uma mentoria"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-0 top-[15%] rounded-xl bg-verde-petroleo px-4 py-3 text-white shadow-xl">
            <p className="flex items-center gap-1.5 text-2xl font-bold text-dourado-claro">
              <Star aria-hidden="true" size={20} />
              4,9
            </p>
            <p className="text-sm text-white/85">avaliação média</p>
          </div>
        </div>
      </div>
    </section>
  )
}
