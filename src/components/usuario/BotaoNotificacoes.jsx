import { Bell } from 'lucide-react'

export default function BotaoNotificacoes() {
  return (
    <button
      type="button"
      aria-label="Notificações"
      className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white text-verde-petroleo shadow-sm"
    >
      <Bell size={22} aria-hidden="true" />
      <span className="absolute right-2 top-1 h-2.5 w-2.5 rounded-full bg-dourado" />
    </button>
  )
}
