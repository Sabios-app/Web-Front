import { Route, Routes } from 'react-router-dom'
import CadastroClientePage from '../pages/CadastroClientePage'
import CadastroConselheiroPage from '../pages/CadastroConselheiroPage'
import EscolhaPerfilPage from '../pages/EscolhaPerfilPage'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NaoEncontradaPage from '../pages/NaoEncontradaPage'
import PerfilEspecialistaPage from '../pages/PerfilEspecialistaPage'
import UsuarioClientePage from '../pages/UsuarioClientePage'
import UsuarioConselheiroPage from '../pages/UsuarioConselheiroPage'
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
        <Route path="/cadastro/cliente" element={<CadastroClientePage />} />
        <Route path="/cadastro/conselheiro" element={<CadastroConselheiroPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Telas de Usuário: Conselheiro e Cliente */}
        <Route path="/usuario/conselheiro" element={<UsuarioConselheiroPage />} />
        <Route path="/painel/conselheiro" element={<UsuarioConselheiroPage />} />
        <Route path="/usuario/cliente" element={<UsuarioClientePage />} />
        <Route path="/painel/cliente" element={<UsuarioClientePage />} />

        {/* Rota 404 (Sempre no final) */}
        <Route path="*" element={<NaoEncontradaPage />} />
      </Routes>
    </>
  )
}
