import { AlertCircle, Inbox, LoaderCircle } from 'lucide-react'

const configuracoes = {
  carregando: {
    icone: LoaderCircle,
    titulo: 'Carregando especialistas',
    descricao: 'Estamos preparando as melhores experiências para você.',
  },
  vazio: {
    icone: Inbox,
    titulo: 'Nenhum especialista encontrado',
    descricao: 'Tente remover alguns filtros ou buscar por outro desafio.',
  },
  erro: {
    icone: AlertCircle,
    titulo: 'Não foi possível carregar os dados',
    descricao: 'Tente novamente em alguns instantes.',
  },
}

export default function EstadoInterface({ tipo, acao, rotuloAcao = 'Tentar novamente' }) {
  const estado = configuracoes[tipo]
  if (!estado) return null

  const Icone = estado.icone

  return (
    <div
      role={tipo === 'erro' ? 'alert' : 'status'}
      className="flex min-h-56 flex-col items-center justify-center rounded-3xl border border-divisoria bg-white px-6 py-10 text-center shadow-sm"
    >
      <Icone
        aria-hidden="true"
        size={34}
        className={`mb-4 text-dourado-escuro ${tipo === 'carregando' ? 'animate-spin motion-reduce:animate-none' : ''}`}
      />
      <h2 className="font-titulo text-2xl text-verde-titulo">{estado.titulo}</h2>
      <p className="mt-2 max-w-md text-texto-secundario">{estado.descricao}</p>
      {acao && tipo === 'erro' && (
        <button
          type="button"
          onClick={acao}
          className="mt-5 min-h-12 rounded-full bg-verde-petroleo px-6 font-bold text-white transition-colors hover:bg-verde-hover"
        >
          {rotuloAcao}
        </button>
      )}
    </div>
  )
}
