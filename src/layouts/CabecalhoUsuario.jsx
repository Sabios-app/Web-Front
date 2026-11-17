import BotaoNotificacoes from '../components/usuario/BotaoNotificacoes'
import LinkMenuUsuario from '../components/usuario/LinkMenuUsuario'

export default function CabecalhoUsuario({ usuario, tipoUsuario, menu }) {
  return (
    <header className="border-b border-divisoria bg-white/70">
      <div className="flex min-h-24 items-center justify-between px-5 lg:px-10">
        <p className="text-base text-texto-secundario">Área do {tipoUsuario.toLowerCase()}</p>
        <div className="flex items-center gap-4">
          <BotaoNotificacoes />
          <div className="hidden text-right sm:block">
            <p className="font-bold text-verde-titulo">{usuario.nome}</p>
            <p className="text-sm text-texto-secundario">Configurações</p>
          </div>
          <img src={usuario.foto} alt="" className="h-12 w-12 rounded-full object-cover" />
        </div>
      </div>
      <nav aria-label="Navegação rápida" className="sem-barra-rolagem flex gap-2 overflow-x-auto px-5 pb-3 lg:hidden">
        {menu.map((item) => (
          <LinkMenuUsuario key={`${item.texto}-mobile`} item={item} mobile />
        ))}
      </nav>
    </header>
  )
}
