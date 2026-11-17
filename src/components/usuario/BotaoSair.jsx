import { LogOut } from 'lucide-react'

export default function BotaoSair({ onClick, mobile = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        mobile
          ? 'flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-white/10 text-base font-bold text-white hover:bg-white/20'
          : 'mt-auto flex min-h-14 shrink-0 items-center gap-4 border-t border-white/15 pt-6 text-base font-bold text-white/70 hover:text-white'
      }
    >
      <LogOut size={mobile ? 20 : 22} strokeWidth={1.8} aria-hidden="true" />
      Sair da conta
    </button>
  )
}
