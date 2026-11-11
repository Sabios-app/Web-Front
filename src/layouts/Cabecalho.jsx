import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BotaoLink from '../components/BotaoLink'
import LogoSabios from '../components/LogoSabios'

const linksPublicos = [
  { href: '/#como-funciona', texto: 'Como funciona' },
  { href: '/#especialistas', texto: 'Encontrar especialista' },
  { href: '/#para-mentores', texto: 'Para mentores' },
]

export default function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false)
  const location = useLocation()

  const estaNoPainelConselheiro = location.pathname.includes('/conselheiro')
  const estaNoPainelCliente = location.pathname.includes('/cliente') && !location.pathname.includes('/cadastro')
  const estaNaAreaUsuario = estaNoPainelConselheiro || estaNoPainelCliente

  return (
    <header className="sticky top-0 z-30 border-b border-divisoria bg-creme/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link to="/" aria-label="Sábios, página inicial" className="rounded-full">
          <LogoSabios />
        </Link>

        {/* Menu quando está no Painel de Usuário */}
        {estaNaAreaUsuario ? (
          <nav aria-label="Navegação da área logada" className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 rounded-full border border-divisoria bg-white p-1 shadow-2xs">
              <Link
                to="/usuario/conselheiro"
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  estaNoPainelConselheiro
                    ? 'bg-verde-petroleo text-white shadow-xs'
                    : 'text-texto-secundario hover:text-verde-petroleo'
                }`}
              >
                Área do Conselheiro
              </Link>
              <Link
                to="/usuario/cliente"
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  estaNoPainelCliente
                    ? 'bg-verde-petroleo text-white shadow-xs'
                    : 'text-texto-secundario hover:text-verde-petroleo'
                }`}
              >
                Área do Cliente
              </Link>
            </div>

            <Link
              to="/"
              className="text-base font-semibold text-verde-titulo hover:underline"
            >
              Ir para o site
            </Link>
          </nav>
        ) : (
          /* Menu padrão do site público */
          <nav aria-label="Menu principal" className="hidden lg:block">
            <ul className="flex gap-8">
              {linksPublicos.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-lg font-semibold text-verde-titulo underline-offset-8 hover:underline">
                    {link.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="hidden items-center gap-4 lg:flex">
          {estaNaAreaUsuario ? (
            <Link
              to="/login"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-divisoria bg-white px-5 text-sm font-bold text-texto-secundario hover:bg-campo hover:text-red-700"
            >
              Sair
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-lg font-semibold text-verde-titulo underline-offset-8 hover:underline">
                Entrar
              </Link>
              <BotaoLink href="/cadastro" className="min-h-12 px-6">
                Criar conta
              </BotaoLink>
            </>
          )}
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
          {estaNaAreaUsuario ? (
            <div className="flex flex-col gap-2 p-5">
              <Link
                to="/usuario/conselheiro"
                onClick={() => setMenuAberto(false)}
                className={`flex min-h-12 items-center rounded-xl px-4 text-lg font-bold ${
                  estaNoPainelConselheiro ? 'bg-verde-petroleo text-white' : 'text-verde-titulo hover:bg-campo'
                }`}
              >
                Área do Conselheiro
              </Link>
              <Link
                to="/usuario/cliente"
                onClick={() => setMenuAberto(false)}
                className={`flex min-h-12 items-center rounded-xl px-4 text-lg font-bold ${
                  estaNoPainelCliente ? 'bg-verde-petroleo text-white' : 'text-verde-titulo hover:bg-campo'
                }`}
              >
                Área do Cliente
              </Link>
              <Link
                to="/"
                onClick={() => setMenuAberto(false)}
                className="flex min-h-12 items-center rounded-xl px-4 text-base font-semibold text-texto-secundario hover:bg-campo"
              >
                Ir para a página inicial
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuAberto(false)}
                className="mt-2 flex min-h-12 items-center justify-center rounded-xl border border-divisoria bg-white text-base font-bold text-red-700"
              >
                Sair
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex flex-col px-5 py-2">
                {linksPublicos.map((link) => (
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
            </>
          )}
        </nav>
      )}
    </header>
  )
}
