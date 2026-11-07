import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import BotaoLink from '../components/BotaoLink'
import LogoSabios from '../components/LogoSabios'

const links = [
  { href: '/#como-funciona', texto: 'Como funciona' },
  { href: '/#especialistas', texto: 'Encontrar especialista' },
  { href: '/#para-mentores', texto: 'Para mentores' },
]

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-divisoria bg-creme/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link to="/" aria-label="Sábios, página inicial" className="rounded-full">
          <LogoSabios />
        </Link>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <ul className="flex gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-lg font-semibold text-verde-titulo underline-offset-8 hover:underline">
                  {link.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link to="/login" className="text-lg font-semibold text-verde-titulo underline-offset-8 hover:underline">
            Entrar
          </Link>
          <BotaoLink href="/cadastro" className="min-h-12 px-6">
            Criar conta
          </BotaoLink>
        </div>

        <button
          type="button"
          className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-verde-petroleo bg-white px-4 text-lg font-bold text-verde-petroleo lg:hidden"
          aria-expanded={menuAberto}
          aria-controls="menu-celular"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          {menuAberto ? 'Fechar' : 'Menu'}
        </button>
      </div>

      {menuAberto && (
        <nav id="menu-celular" aria-label="Menu principal" className="border-t border-divisoria bg-creme lg:hidden">
          <ul className="flex flex-col px-5 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuAberto(false)}
                  className="flex min-h-14 items-center border-b border-divisoria text-xl font-bold text-verde-titulo"
                >
                  {link.texto}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 px-5 pb-5 pt-2">
            <BotaoLink href="/login" variante="contorno">
              Entrar
            </BotaoLink>
            <BotaoLink href="/cadastro">Criar conta</BotaoLink>
          </div>
        </nav>
      )}
    </header>
  )
}
