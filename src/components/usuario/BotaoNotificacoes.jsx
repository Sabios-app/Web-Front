import { Bell, CalendarDays, Check, MessageCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const notificacoesIniciais = [
  {
    id: 1,
    titulo: 'Nova mensagem',
    descricao: 'Você recebeu uma nova mensagem.',
    rota: 'mensagens',
    Icone: MessageCircle,
  },
  {
    id: 2,
    titulo: 'Mentoria agendada',
    descricao: 'Sua próxima mentoria foi confirmada.',
    rota: 'agenda',
    Icone: CalendarDays,
  },
]

export default function BotaoNotificacoes({ tipoUsuario }) {
  const [aberto, setAberto] = useState(false)
  const [naoLidas, setNaoLidas] = useState(notificacoesIniciais.map(({ id }) => id))
  const painelRef = useRef(null)
  const navigate = useNavigate()
  const perfil = tipoUsuario === 'Conselheiro' ? 'conselheiro' : 'cliente'

  useEffect(() => {
    function fecharAoClicarFora(event) {
      if (painelRef.current && !painelRef.current.contains(event.target)) {
        setAberto(false)
      }
    }

    function fecharComEscape(event) {
      if (event.key === 'Escape') {
        setAberto(false)
      }
    }

    document.addEventListener('mousedown', fecharAoClicarFora)
    document.addEventListener('keydown', fecharComEscape)
    return () => {
      document.removeEventListener('mousedown', fecharAoClicarFora)
      document.removeEventListener('keydown', fecharComEscape)
    }
  }, [])

  function abrirNotificacao(id, rota) {
    setNaoLidas((atuais) => atuais.filter((item) => item !== id))
    setAberto(false)
    navigate(`/usuario/${perfil}/${rota}`)
  }

  function marcarTodasComoLidas() {
    setNaoLidas([])
  }

  return (
    <div ref={painelRef} className="relative">
      <button
        type="button"
        aria-label={`Notificações${naoLidas.length ? `, ${naoLidas.length} não lidas` : ''}`}
        aria-expanded={aberto}
        aria-controls="painel-notificacoes"
        onClick={() => setAberto((valor) => !valor)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-verde-petroleo shadow-sm hover:bg-campo"
      >
        <Bell size={22} aria-hidden="true" />
        {naoLidas.length > 0 && (
          <span className="absolute right-1.5 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-dourado px-1 text-[11px] font-bold text-verde-escuro">
            {naoLidas.length}
          </span>
        )}
      </button>

      {aberto && (
        <div
          id="painel-notificacoes"
          role="region"
          aria-label="Painel de notificações"
          className="absolute right-0 top-14 z-50 w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-divisoria bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-divisoria px-4 py-3">
            <h2 className="font-titulo text-lg text-verde-titulo">Notificações</h2>
            {naoLidas.length > 0 && (
              <button
                type="button"
                onClick={marcarTodasComoLidas}
                className="inline-flex items-center gap-1 text-sm font-bold text-dourado-escuro hover:underline"
              >
                <Check size={16} aria-hidden="true" />
                Marcar todas como lidas
              </button>
            )}
          </div>

          <div className="p-2">
            {notificacoesIniciais.map(({ id, titulo, descricao, rota, Icone }) => {
              const naoLida = naoLidas.includes(id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => abrirNotificacao(id, rota)}
                  className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left hover:bg-campo ${
                    naoLida ? 'bg-dourado-aviso/50' : ''
                  }`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-dourado-escuro shadow-sm">
                    <Icone size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-sm text-verde-titulo">{titulo}</strong>
                    <span className="mt-1 block text-sm text-texto-secundario">{descricao}</span>
                  </span>
                  {naoLida && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-dourado" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
