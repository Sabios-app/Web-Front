import { Link } from 'react-router-dom'

const variantes = {
  primario: 'bg-verde-petroleo text-white hover:bg-verde-hover',
  contorno: 'border-2 border-verde-petroleo bg-white text-verde-petroleo hover:bg-campo',
  dourado: 'bg-dourado text-verde-escuro hover:bg-dourado-claro',
  claro: 'border-2 border-white text-white hover:bg-white/10',
}

/**
 * Link com aparência de botão. Altura mínima de 56px e texto grande:
 * fácil de ler e de acertar com o mouse ou com o dedo.
 * Rotas internas ("/especialistas/1") usam o <Link> do React Router,
 * que troca de página sem recarregar o site.
 */
export default function BotaoLink({ variante = 'primario', className = '', href, children, ...props }) {
  const classes = `inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-center text-lg font-bold transition-colors ${variantes[variante]} ${className}`
  const rotaInterna = href?.startsWith('/') && !href.includes('#')

  if (rotaInterna) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  )
}
