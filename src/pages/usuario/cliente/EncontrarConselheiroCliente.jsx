import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import CartaoEspecialista from "../../../components/CartaoEspecialista";
import EstadoInterface from "../../../components/EstadoInterface";
import { specialistService } from "../../../services/sabiosServices";
import { parseApiError } from "../../../utils/apiError";
import {
  extrairListaPaginada,
  mapearEspecialistaApi,
} from "../../../utils/especialistaMapper";

const AREAS_PADRAO = [
  "Todas as áreas",
  "Finanças & Gestão",
  "Vendas & Estratégia",
  "Liderança & Pessoas",
  "Operações & Logística",
  "Marketing & Clientes",
];

/** Busca de conselheiros dentro do painel do cliente (mesma lista da página pública /especialistas). */
export default function EncontrarConselheiroCliente() {
  const [busca, setBusca] = useState("");
  const [termoBusca, setTermoBusca] = useState("");
  const [area, setArea] = useState("Todas as áreas");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [listaEspecialistas, setListaEspecialistas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let ativo = true;
    const params = {};
    if (termoBusca) params.search = termoBusca;
    if (area !== "Todas as áreas") params.specialty = area;

    specialistService
      .listSpecialists(params)
      .then((response) => {
        if (!ativo) return;
        setListaEspecialistas(
          extrairListaPaginada(response).map(mapearEspecialistaApi),
        );
        setErro("");
        setCarregando(false);
      })
      .catch((err) => {
        if (!ativo) return;
        const parsed = parseApiError(
          err,
          "Não foi possível carregar os especialistas no momento.",
        );
        setListaEspecialistas([]);
        setErro(parsed.message);
        setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, [termoBusca, area, tentativa]);

  function recarregar() {
    setCarregando(true);
    setErro("");
    setTentativa((atual) => atual + 1);
  }

  const resultados = useMemo(() => {
    const termo = termoBusca.toLocaleLowerCase("pt-BR");
    const filtrados = listaEspecialistas.filter((especialista) => {
      const correspondeArea =
        area === "Todas as áreas" || especialista.area.includes(area);
      const texto = [
        especialista.nome,
        especialista.area,
        especialista.cidade,
        especialista.descricao,
        ...(especialista.temas || []),
      ]
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      return correspondeArea && (!termo || texto.includes(termo));
    });

    return [...filtrados].sort((a, b) => {
      if (ordenacao === "avaliacao") return b.avaliacao - a.avaliacao;
      if (ordenacao === "menor-preco") return a.valorSessao - b.valorSessao;
      return 0;
    });
  }, [listaEspecialistas, area, termoBusca, ordenacao]);

  function pesquisar(event) {
    event.preventDefault();
    setTermoBusca(busca.trim());
  }

  function limparFiltros() {
    setBusca("");
    setTermoBusca("");
    setArea("Todas as áreas");
    setOrdenacao("relevancia");
  }

  const temFiltro =
    termoBusca || area !== "Todas as áreas" || ordenacao !== "relevancia";

  return (
    <div>
      <p className="max-w-2xl text-lg text-texto-secundario motion-safe:animate-aparecer">
        Pesquise por desafio, área ou nome e conheça profissionais que podem
        ajudar seu negócio.
      </p>

      <form
        onSubmit={pesquisar}
        role="search"
        className="mt-6 flex flex-col gap-2 rounded-2xl border border-divisoria bg-white p-2 shadow-sm motion-safe:animate-aparecer [animation-delay:100ms] sm:flex-row"
      >
        <label htmlFor="busca-conselheiros" className="sr-only">
          Buscar conselheiros
        </label>
        <div className="flex min-h-14 flex-1 items-center gap-3 px-4">
          <Search
            aria-hidden="true"
            size={22}
            className="shrink-0 text-dourado-escuro"
          />
          <input
            id="busca-conselheiros"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Ex.: fluxo de caixa, vendas ou liderança"
            className="w-full bg-transparent text-lg text-verde-titulo placeholder:text-texto-secundario focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="min-h-14 rounded-xl bg-dourado px-6 text-lg font-bold text-verde-escuro transition-colors hover:bg-dourado-claro"
        >
          Buscar
        </button>
      </form>

      <div className="mt-8 flex flex-col gap-4 border-b border-divisoria pb-6 motion-safe:animate-aparecer [animation-delay:200ms] sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-titulo text-3xl text-verde-titulo">
            Conselheiros disponíveis
          </h2>
          <p className="mt-2 text-texto-secundario" aria-live="polite">
            {carregando
              ? "Carregando conselheiros..."
              : erro
                ? "Erro ao carregar conselheiros"
                : `${resultados.length} ${resultados.length === 1 ? "conselheiro encontrado" : "conselheiros encontrados"}`}
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

      <div
        className={`${mostrarFiltros ? "flex" : "hidden"} mt-6 flex-col gap-4 rounded-2xl bg-campo p-4 sm:flex sm:flex-row sm:items-end sm:justify-between`}
      >
        <label className="flex flex-1 flex-col gap-2 font-bold text-verde-titulo">
          <span className="inline-flex items-center gap-2">
            <Filter aria-hidden="true" size={18} /> Área de atuação
          </span>
          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            className="min-h-12 rounded-xl border border-divisoria bg-white px-4 font-normal"
          >
            {AREAS_PADRAO.map((opcao) => (
              <option key={opcao}>{opcao}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-2 font-bold text-verde-titulo">
          <span>Ordenar resultados</span>
          <select
            value={ordenacao}
            onChange={(event) => setOrdenacao(event.target.value)}
            className="min-h-12 rounded-xl border border-divisoria bg-white px-4 font-normal"
          >
            <option value="relevancia">Mais relevantes</option>
            <option value="avaliacao">Melhor avaliação</option>
            <option value="menor-preco">Menor preço</option>
          </select>
        </label>
        {temFiltro && (
          <button
            type="button"
            onClick={limparFiltros}
            className="inline-flex min-h-12 items-center justify-center gap-2 px-2 font-bold text-dourado-texto hover:underline"
          >
            <X aria-hidden="true" size={18} /> Limpar filtros
          </button>
        )}
      </div>

      <div className="mt-8">
        {carregando ? (
          <EstadoInterface tipo="carregando" />
        ) : erro ? (
          <EstadoInterface tipo="erro" descricao={erro} acao={recarregar} />
        ) : resultados.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {resultados.map((especialista, indice) => (
              <div
                key={especialista.id}
                className="motion-safe:animate-aparecer"
                style={{ animationDelay: `${Math.min(indice, 8) * 80}ms` }}
              >
                <CartaoEspecialista especialista={especialista} />
              </div>
            ))}
          </div>
        ) : (
          <EstadoInterface tipo="vazio" />
        )}
      </div>
    </div>
  );
}
