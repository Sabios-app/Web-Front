import {
  Bell,
  BookCheck,
  CalendarCheck,
  CalendarDays,
  CalendarX,
  Check,
  CheckSquare,
  Star,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notificationService } from '../../services/sabiosServices'

const POLL_INTERVAL_MS = 45_000 // 45 s

const TIPO_CONFIG = {
  MENTORING_REQUESTED: {
    Icone: CalendarDays,
    rota: (perfil) => `/usuario/${perfil}/solicitacoes`,
  },
  MENTORING_ACCEPTED: {
    Icone: CalendarCheck,
    rota: (perfil) => `/usuario/${perfil}/agenda`,
  },
  MENTORING_REJECTED: {
    Icone: CalendarX,
    rota: (perfil) => `/usuario/${perfil}/agenda`,
  },
  MENTORING_CANCELED: {
    Icone: CalendarX,
    rota: (perfil) => `/usuario/${perfil}/agenda`,
  },
  ACTION_PLAN_ASSIGNED: {
    Icone: CheckSquare,
    rota: (perfil) => `/usuario/${perfil}/plano`,
  },
  REVIEW_RECEIVED: {
    Icone: Star,
    rota: (perfil) => `/usuario/${perfil}/avaliacoes`,
  },
}

const DEFAULT_TIPO = { Icone: BookCheck, rota: (perfil) => `/usuario/${perfil}` }

export default function BotaoNotificacoes({ tipoUsuario }) {
  const [aberto, setAberto] = useState(false)
  const [notificacoes, setNotificacoes] = useState([])
  const [contador, setContador] = useState(0)
  const painelRef = useRef(null)
  const navigate = useNavigate()
  const perfil = tipoUsuario === 'Conselheiro' ? 'conselheiro' : 'cliente'

  // Busca o contador de não-lidas (leve, pode ser polled)
  const atualizarContador = useCallback(async () => {
    try {
      const data = await notificationService.getUnreadCount()
      setContador(data?.count ?? 0)
    } catch {
      // silencia erros de polling
    }
  }, [])

  // Busca a lista de notificações (só ao abrir o painel)
  async function carregarNotificacoes() {
    try {
      const data = await notificationService.list({ page: 0, size: 20 })
      const lista = Array.isArray(data) ? data : (data?.content ?? [])
      setNotificacoes(lista)
      setContador(lista.filter((n) => !n.read).length)
    } catch {
      // mantém a lista anterior
    }
  }

  // Polling de contador
  useEffect(() => {
    async function checar() {
      await atualizarContador()
    }
    checar()
    const id = setInterval(checar, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [atualizarContador])

  // Fecha ao clicar fora / Escape
  useEffect(() => {
    function fecharAoClicarFora(e) {
      if (painelRef.current && !painelRef.current.contains(e.target)) setAberto(false)
    }
    function fecharComEscape(e) {
      if (e.key === 'Escape') setAberto(false)
    }
    document.addEventListener('mousedown', fecharAoClicarFora)
    document.addEventListener('keydown', fecharComEscape)
    return () => {
      document.removeEventListener('mousedown', fecharAoClicarFora)
      document.removeEventListener('keydown', fecharComEscape)
    }
  }, [])

  function abrirPainel() {
    setAberto((v) => {
      if (!v) carregarNotificacoes()
      return !v
    })
  }

  async function abrirNotificacao(notif) {
    // Marca como lida localmente e na API
    setNotificacoes((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)))
    setContador((c) => Math.max(0, c - (notif.read ? 0 : 1)))
    setAberto(false)

    try {
      await notificationService.markRead(notif.id)
    } catch {
      // silencia
    }

    const config = TIPO_CONFIG[notif.type] ?? DEFAULT_TIPO
    navigate(config.rota(perfil))
  }

  async function marcarTodasComoLidas() {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, read: true })))
    setContador(0)
    try {
      await notificationService.markAllRead()
    } catch {
      // silencia
    }
  }

  return (
    <div ref={painelRef} className="relative">
      <button
        type="button"
        aria-label={`Notificações${contador ? `, ${contador} não lidas` : ''}`}
        aria-expanded={aberto}
        aria-controls="painel-notificacoes"
        onClick={abrirPainel}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-verde-petroleo shadow-sm hover:bg-campo"
      >
        <Bell size={22} aria-hidden="true" />
        {contador > 0 && (
          <span className="absolute right-1.5 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-dourado px-1 text-[11px] font-bold text-verde-escuro">
            {contador > 99 ? '99+' : contador}
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
            {contador > 0 && (
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

          <div className="max-h-96 overflow-y-auto p-2">
            {notificacoes.length === 0 ? (
              <p className="py-6 text-center text-sm text-texto-secundario">
                Nenhuma notificação.
              </p>
            ) : (
              notificacoes.map((notif) => {
                const config = TIPO_CONFIG[notif.type] ?? DEFAULT_TIPO
                const { Icone } = config
                const naoLida = !notif.read
                return (
                  <button
                    key={notif.id}
                    type="button"
                    onClick={() => abrirNotificacao(notif)}
                    className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left hover:bg-campo ${
                      naoLida ? 'bg-dourado-aviso/50' : ''
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-dourado-escuro shadow-sm">
                      <Icone size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm text-verde-titulo">{notif.title}</strong>
                      <span className="mt-1 block text-sm text-texto-secundario line-clamp-2">
                        {notif.message}
                      </span>
                    </span>
                    {naoLida && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-dourado" />}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
