import { NavLink } from 'react-router-dom'

export default function LinkMenuUsuario({ item, mobile = false }) {
  const { rota, texto, Icone, contador, externo } = item
  const classes = mobile
    ? 'flex min-h-12 shrink-0 items-center gap-3 rounded-xl bg-white px-4 text-sm font-bold text-verde-titulo shadow-sm transition hover:bg-campo'
    : 'flex min-h-14 items-center gap-4 rounded-2xl px-5 text-base font-bold transition'

  if (externo) {
    return (
      <a href={rota} className={`${classes} ${mobile ? '' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
        <Icone size={22} strokeWidth={1.8} aria-hidden="true" />
        <span className="flex-1">{texto}</span>
      </a>
    )
  }

  return (
    <NavLink
      to={rota}
      end={rota.split('/').length === 3}
      className={({ isActive }) =>
        `${classes} ${
          mobile
            ? ''
            : isActive
              ? 'bg-dourado-claro text-verde-escuro'
              : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`
      }
    >
      <Icone size={22} strokeWidth={1.8} aria-hidden="true" />
      <span className="flex-1">{texto}</span>
      {contador !== undefined && (
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-dourado px-2 text-xs font-bold text-verde-escuro">
          {contador}
        </span>
      )}
    </NavLink>
  )
}
