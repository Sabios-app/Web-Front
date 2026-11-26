import { menusUsuario } from '../data/menusUsuario'
import useAuth from '../hooks/useAuth'
import BarraLateralUsuario from './BarraLateralUsuario'
import CabecalhoUsuario from './CabecalhoUsuario'
import BotaoTema from '../components/BotaoTema'
import PainelAcessibilidade from './PainelAcessibilidade'

export default function AreaUsuarioLayout({ children, usuario }) {
  const { perfil } = useAuth()
  const menu = menusUsuario[perfil] ?? []
  const tipoUsuario = perfil === 'cliente' ? 'Cliente' : 'Conselheiro'

  return (
    <div className="flex min-h-screen bg-creme text-verde-petroleo">
      <BarraLateralUsuario
        usuario={usuario}
        tipoUsuario={tipoUsuario}
        menu={menu}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <CabecalhoUsuario usuario={usuario} tipoUsuario={tipoUsuario} menu={menu} />

        <main id="conteudo" className="flex-1 px-5 pb-24 pt-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>

      <BotaoTema />
      <PainelAcessibilidade />
    </div>
  )
}
