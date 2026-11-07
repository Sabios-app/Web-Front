import { Route, Routes } from 'react-router-dom'
import EscolhaPerfilPage from '../pages/EscolhaPerfilPage'
import HomePage from '../pages/HomePage'
import NaoEncontradaPage from '../pages/NaoEncontradaPage'
import PerfilEspecialistaPage from '../pages/PerfilEspecialistaPage'
import ControleDeRolagem from './ControleDeRolagem'

/** Todas as rotas do site ficam aqui. Para criar uma página nova, adicione uma <Route>. */
export default function AppRoutes() {
  return (
    <>
      <ControleDeRolagem />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/especialistas/:id" element={<PerfilEspecialistaPage />} />
        <Route path="/cadastro" element={<EscolhaPerfilPage />} />
        <Route path="*" element={<NaoEncontradaPage />} />
      </Routes>
    </>
  )
}
