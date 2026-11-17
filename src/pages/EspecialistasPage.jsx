import { Filter, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CartaoEspecialista from '../components/CartaoEspecialista'
import EstadoInterface from '../components/EstadoInterface'
import { especialistas } from '../data/especialistas'
import MainLayout from '../layouts/MainLayout'

const areas = ['Todas as áreas', ...new Set(especialistas.map((especialista) => especialista.area))]

export default function EspecialistasPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const buscaInicial = searchParams.get('busca') ?? ''
  const [busca, setBusca] = useState(buscaInicial)
  const [area, setArea] = useState('Todas as áreas')
  const [ordenacao, setOrdenacao] = useState('relevancia')
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  const resultados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase('pt-BR')
    const filtrados = especialistas.filter((especialista) => {
      const correspondeArea = area === 'Todas as áreas' || especialista.area === area
      const texto = [
        especialista.nome,
        especialista.area,
        especialista.cidade,
        especialista.descricao,
        ...especialista.temas,
      ]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
      return correspondeArea && (!termo || texto.includes(termo))
    })

    return [...filtrados].sort((a, b) => {
      if (ordenacao === 'avaliacao') return b.avaliacao - a.avaliacao
      if (ordenacao === 'menor-preco') return a.valorSessao - b.valorSessao
      return a.id - b.id
    })
  }, [area, busca, ordenacao])

  function pesquisar(event) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (busca.trim()) params.set('busca', busca.trim())
    setSearchParams(params)
  }

  function limparFiltros() {
    setBusca('')
    setArea('Todas as áreas')
    setOrdenacao('relevancia')
    setSearchParams({})
  }

  return (
    <MainLayout>
      <section className="bg-verde-petroleo text-white">
        <div className="mx-auto max-w-310 px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
          <Link to="/" className="text-sm font-bold text-white/80 underline-offset-4 hover:text-white hover:underline">
            ← Voltar para o início
          </Link>
          <p className="mt-8 text-sm font-extrabold uppercase tracking-[.18em] text-dourado-claro">
            Experiência comprovada
          </p>
          <h1 className="mt-3 max-w-3xl font-titulo text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Encontre a experiência certa para o seu próximo passo.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            Pesquise por desafio, área ou nome e conheça profissionais que podem ajudar seu negócio.
          </p>

          <form onSubmit={pesquisar} role="search" className="mt-8 flex flex-col gap-2 rounded-2xl bg-white p-2 sm:flex-row">
            <label htmlFor="busca-especialistas" className="sr-only">Buscar especialistas</label>
            <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
              <Search aria-hidden="true" size={22} className="shrink-0 text-dourado-escuro" />
              <input
                id="busca-especialistas"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Ex.: fluxo de caixa, vendas ou liderança"
                className="w-full bg-transparent text-lg text-verde-titulo placeholder:text-texto-secundario focus:outline-none"
              />
            </div>
            <button type="submit" className="min-h-14 rounded-xl bg-dourado px-6 text-lg font-bold text-verde-escuro transition-colors hover:bg-dourado-claro">
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-310 px-5 py-10 sm:py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 border-b border-divisoria pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-titulo text-3xl text-verde-titulo sm:text-4xl">Especialistas disponíveis</h2>
            <p className="mt-2 text-texto-secundario">
              {resultados.length} {resultados.length === 1 ? 'especialista encontrado' : 'especialistas encontrados'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMostrarFiltros((aberto) => !aberto)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-verde-petroleo px-5 font-bold text-verde-petroleo transition-colors hover:bg-campo sm:hidden"
            aria-expanded={mostrarFiltros}
          >
            <SlidersHorizontal aria-hidden="true" size={18} />
            Filtros
          </button>
        </div>

        <div className={`${mostrarFiltros ? 'flex' : 'hidden'} mt-6 flex-col gap-4 rounded-2xl bg-campo p-4 sm:flex sm:flex-row sm:items-end sm:justify-between`}>
          <label className="flex flex-1 flex-col gap-2 font-bold text-verde-titulo">
            <span className="inline-flex items-center gap-2"><Filter aria-hidden="true" size={18} /> Área de atuação</span>
            <select value={area} onChange={(event) => setArea(event.target.value)} className="min-h-12 rounded-xl border border-divisoria bg-white px-4 font-normal">
              {areas.map((opcao) => <option key={opcao}>{opcao}</option>)}
            </select>
          </label>
          <label className="flex flex-1 flex-col gap-2 font-bold text-verde-titulo">
            <span>Ordenar resultados</span>
            <select value={ordenacao} onChange={(event) => setOrdenacao(event.target.value)} className="min-h-12 rounded-xl border border-divisoria bg-white px-4 font-normal">
              <option value="relevancia">Mais relevantes</option>
              <option value="avaliacao">Melhor avaliação</option>
              <option value="menor-preco">Menor preço</option>
            </select>
          </label>
          {(busca || area !== 'Todas as áreas' || ordenacao !== 'relevancia') && (
            <button type="button" onClick={limparFiltros} className="inline-flex min-h-12 items-center justify-center gap-2 px-2 font-bold text-dourado-escuro hover:underline">
              <X aria-hidden="true" size={18} /> Limpar filtros
            </button>
          )}
        </div>

        <div className="mt-8" aria-live="polite">
          {resultados.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {resultados.map((especialista) => <CartaoEspecialista key={especialista.id} especialista={especialista} />)}
            </div>
          ) : (
            <EstadoInterface tipo="vazio" />
          )}
        </div>
      </section>
    </MainLayout>
  )
}
