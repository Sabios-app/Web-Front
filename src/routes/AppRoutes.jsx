import { Route, Routes } from "react-router-dom";
import CadastroClientePage from "../pages/CadastroClientePage";
import CadastroConselheiroPage from "../pages/CadastroConselheiroPage";
import AjudaPage from "../pages/AjudaPage";
import EspecialistasPage from "../pages/EspecialistasPage";
import EscolhaPerfilPage from "../pages/EscolhaPerfilPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NaoEncontradaPage from "../pages/NaoEncontradaPage";
import PerfilEspecialistaPage from "../pages/PerfilEspecialistaPage";
import PrivacidadePage from "../pages/PrivacidadePage";
import RecuperarSenhaPage from "../pages/RecuperarSenhaPage";
import AreaUsuarioSecaoPage from "../pages/AreaUsuarioSecaoPage";
import UsuarioClientePage from "../pages/UsuarioClientePage";
import UsuarioConselheiroPage from "../pages/UsuarioConselheiroPage";
import ControleDeRolagem from "./ControleDeRolagem";
import RotaProtegida from "./RotaProtegida";
import RedefinirSenhaPage from "../pages/RedefinirSenhaPage";

/** Todas as rotas do site ficam aqui. Para criar uma página nova, adicione uma <Route>. */
export default function AppRoutes() {
  return (
    <>
      <ControleDeRolagem />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/especialistas" element={<EspecialistasPage />} />
        <Route path="/especialistas/:id" element={<PerfilEspecialistaPage />} />
        <Route path="/cadastro" element={<EscolhaPerfilPage />} />
        <Route path="/cadastro/cliente" element={<CadastroClientePage />} />
        <Route
          path="/cadastro/conselheiro"
          element={<CadastroConselheiroPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recuperar-senha" element={<RecuperarSenhaPage />} />
        <Route path="/ajuda" element={<AjudaPage />} />
        <Route path="/privacidade" element={<PrivacidadePage />} />

        {/* Cada perfil possui uma área própria e não pode acessar a área do outro perfil. */}
        <Route path="/redefinir-senha" element={<RedefinirSenhaPage />} />

        <Route
          path="/usuario/conselheiro"
          element={
            <RotaProtegida perfil="conselheiro">
              <UsuarioConselheiroPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/painel/conselheiro"
          element={
            <RotaProtegida perfil="conselheiro">
              <UsuarioConselheiroPage />
            </RotaProtegida>
          }
        />
        <Route
          path="/usuario/cliente"
          element={
            <RotaProtegida perfil="cliente">
              <UsuarioClientePage />
            </RotaProtegida>
          }
        />
        <Route
          path="/painel/cliente"
          element={
            <RotaProtegida perfil="cliente">
              <UsuarioClientePage />
            </RotaProtegida>
          }
        />
        {["agenda", "plano", "avaliacoes", "mensagens", "perfil"].map(
          (secao) => (
            <Route
              key={`cliente-${secao}`}
              path="/usuario/cliente/:secao"
              element={
                <RotaProtegida perfil="cliente">
                  <AreaUsuarioSecaoPage perfil="cliente" />
                </RotaProtegida>
              }
            />
          ),
        )}
        {["agenda", "solicitacoes", "mensagens", "avaliacoes", "perfil"].map(
          (secao) => (
            <Route
              key={`conselheiro-${secao}`}
              path="/usuario/conselheiro/:secao"
              element={
                <RotaProtegida perfil="conselheiro">
                  <AreaUsuarioSecaoPage perfil="conselheiro" />
                </RotaProtegida>
              }
            />
          ),
        )}

        {/* Rota 404 (Sempre no final) */}
        <Route path="*" element={<NaoEncontradaPage />} />
      </Routes>
    </>
  );
}
