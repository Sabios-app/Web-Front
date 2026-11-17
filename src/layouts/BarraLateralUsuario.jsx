import { NavLink } from 'react-router-dom'
import LogoSabios from '../components/LogoSabios'
import BotaoSair from '../components/usuario/BotaoSair'
import CartaoUsuario from '../components/usuario/CartaoUsuario'
import LinkMenuUsuario from '../components/usuario/LinkMenuUsuario'

export default function BarraLateralUsuario({ usuario, tipoUsuario, menu, onSair }) {
  return (
    <aside className="sticky top-0 hidden h-screen w-84 shrink-0 flex-col bg-verde-petroleo px-6 py-7 text-white lg:flex">
      <NavLink to="/" aria-label="Sábios, página inicial" className="mb-12 flex items-center gap-3">
        <LogoSabios claro />
      </NavLink>
      <CartaoUsuario usuario={usuario} tipoUsuario={tipoUsuario} />
      <nav aria-label={`Menu da área do ${tipoUsuario.toLowerCase()}`} className="flex flex-col gap-2">
        {menu.map((item) => (
          <LinkMenuUsuario key={`${item.texto}-${item.rota}`} item={item} />
        ))}
      </nav>
      <BotaoSair onClick={onSair} />
    </aside>
  )
}
