import { Navigate } from 'react-router-dom'
import EstadoInterface from '../components/EstadoInterface'
import useAuth from '../hooks/useAuth'

const rotasPorPerfil = {
  cliente: '/usuario/cliente',
  conselheiro: '/usuario/conselheiro',
}

export default function RotaProtegida({ perfil: perfilEsperado, children }) {
  const { perfil, carregando } = useAuth()

  if (carregando) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16">
        <EstadoInterface
          tipo="carregando"
          titulo="Validando sua sessão"
          descricao="Aguarde um instante enquanto confirmamos seus dados."
        />
      </div>
    )
  }

  if (!perfil) {
    return <Navigate to="/login" replace />
  }

  if (perfil !== perfilEsperado) {
    return <Navigate to={rotasPorPerfil[perfil]} replace />
  }

  return children
}
