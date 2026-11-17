import { useNavigate } from 'react-router-dom'
import BotaoSair from '../components/usuario/BotaoSair'
import { menusUsuario } from '../data/menusUsuario'
import useAuth from '../hooks/useAuth'
import BarraLateralUsuario from './BarraLateralUsuario'
import CabecalhoUsuario from './CabecalhoUsuario'
import PainelAcessibilidade from './PainelAcessibilidade'

export default function AreaUsuarioLayout({ children, usuario }) {
  const navigate = useNavigate()
  const { perfil, sair } = useAuth()
  const menu = menusUsuario[perfil] ?? []
  const tipoUsuario = perfil === 'cliente' ? 'Cliente' : 'Conselheiro'

  function encerrarSessao() {
    sair()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-creme text-verde-petroleo">
      <BarraLateralUsuario
        usuario={usuario}
        tipoUsuario={tipoUsuario}
        menu={menu}
        onSair={encerrarSessao}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <CabecalhoUsuario usuario={usuario} tipoUsuario={tipoUsuario} menu={menu} />

        <main id="conteudo" className="flex-1 px-5 pb-24 pt-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-verde-petroleo p-3 lg:hidden">
        <BotaoSair onClick={encerrarSessao} mobile />
      </div>

      <PainelAcessibilidade />
    </div>
  )
}
