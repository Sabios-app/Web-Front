import { Check, Eye, Play, Square, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAcessibilidade } from '../hooks/useAcessibilidade'
import { useLeitorDePagina } from '../hooks/useLeitorDePagina'

function OpcaoAcessibilidade({ ativo, onAlternar, titulo, descricao }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ativo}
      onClick={onAlternar}
      className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${
        ativo ? 'border-verde-petroleo bg-campo' : 'border-divisoria bg-white hover:border-verde-petroleo'
      }`}
    >
      <span
        aria-hidden="true"
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border-2 ${
          ativo ? 'border-verde-petroleo bg-verde-petroleo text-white' : 'border-verde-petroleo bg-white'
        }`}
      >
        {ativo && <Check size={18} strokeWidth={3} />}
      </span>
      <span className="flex flex-col">
        <span className="text-lg font-bold text-verde-titulo">{titulo}</span>
        <span className="text-texto-secundario">{descricao}</span>
      </span>
    </button>
  )
}

/** Botão flutuante "Acessibilidade" com o painel de ajustes, como no protótipo do Figma. */
export default function PainelAcessibilidade() {
  const [aberto, setAberto] = useState(false)
  const painelRef = useRef(null)
  const a11y = useAcessibilidade()
  const leitor = useLeitorDePagina('conteudo')

  // Fecha com a tecla Esc.
  useEffect(() => {
    if (!aberto) return
    const aoApertarTecla = (evento) => {
      if (evento.key === 'Escape') setAberto(false)
    }
    window.addEventListener('keydown', aoApertarTecla)
    painelRef.current?.focus()
    return () => window.removeEventListener('keydown', aoApertarTecla)
  }, [aberto])

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {aberto && (
        <div
          id="painel-acessibilidade"
          ref={painelRef}
          tabIndex={-1}
          role="dialog"
          aria-label="Ajustes de acessibilidade"
          className="flex max-h-[75vh] w-[min(22rem,calc(100vw-2rem))] flex-col gap-3 overflow-y-auto rounded-3xl border-2 border-verde-petroleo bg-white p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <p className="font-titulo text-xl font-semibold text-verde-titulo">Acessibilidade</p>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar ajustes de acessibilidade"
              className="flex h-11 w-11 items-center justify-center rounded-full text-verde-petroleo hover:bg-campo"
            >
              <X aria-hidden="true" size={24} />
            </button>
          </div>

          <button
            type="button"
            aria-pressed={a11y.baixaVisaoAtiva}
            onClick={a11y.alternarBaixaVisao}
            className="flex items-center gap-3 rounded-2xl bg-verde-petroleo p-4 text-left text-white hover:bg-verde-hover"
          >
            <Eye aria-hidden="true" size={26} className="shrink-0" />
            <span className="flex flex-col">
              <span className="text-lg font-bold">
                {a11y.baixaVisaoAtiva ? 'Desativar modo baixa visão' : 'Ativar modo baixa visão'}
              </span>
              <span className="text-white/85">Texto maior, contraste forte e tela simplificada</span>
            </span>
          </button>

          <OpcaoAcessibilidade
            ativo={a11y.textoMaior}
            onAlternar={a11y.alternarTextoMaior}
            titulo="Texto maior"
            descricao="Aumenta letras e espaçamentos"
          />
          <OpcaoAcessibilidade
            ativo={a11y.altoContraste}
            onAlternar={a11y.alternarAltoContraste}
            titulo="Alto contraste"
            descricao="Deixa textos e contornos mais fortes"
          />
          <OpcaoAcessibilidade
            ativo={a11y.modoSimples}
            onAlternar={a11y.alternarModoSimples}
            titulo="Modo simples"
            descricao="Esconde informações menos importantes"
          />

          {leitor.suportado && (
            <button
              type="button"
              aria-pressed={leitor.lendo}
              onClick={leitor.alternar}
              className="flex w-full items-center gap-3 rounded-2xl border-2 border-divisoria bg-white p-3 text-left hover:border-verde-petroleo"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-verde-petroleo text-white">
                {leitor.lendo ? <Square aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={18} />}
              </span>
              <span className="flex flex-col">
                <span className="text-lg font-bold text-verde-titulo">
                  {leitor.lendo ? 'Parar leitura' : 'Ler página em voz alta'}
                </span>
                <span className="text-texto-secundario">Para quem tem pouca ou nenhuma visão</span>
              </span>
            </button>
          )}

          <p className="rounded-2xl bg-campo p-3 text-texto-secundario">
            Compatível com leitores de tela e navegação por teclado.
          </p>
        </div>
      )}

      <button
        type="button"
        aria-expanded={aberto}
        aria-controls="painel-acessibilidade"
        onClick={() => setAberto((v) => !v)}
        className="flex min-h-14 items-center gap-2 rounded-full border-2 border-white bg-verde-petroleo px-5 text-lg font-bold text-white shadow-xl hover:bg-verde-hover"
      >
        <span aria-hidden="true" className="font-titulo text-xl">
          Aa
        </span>
        Acessibilidade
      </button>
    </div>
  )
}
