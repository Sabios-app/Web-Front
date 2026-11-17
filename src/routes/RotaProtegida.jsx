import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const rotasPorPerfil = {
  cliente: '/usuario/cliente',
  conselheiro: '/usuario/conselheiro',
}

export default function RotaProtegida({ perfil: perfilEsperado, children }) {
  const { perfil } = useAuth()

  if (!perfil) {
    return <Navigate to="/login" replace />
  }

  if (perfil !== perfilEsperado) {
    return <Navigate to={rotasPorPerfil[perfil]} replace />
  }

  return children
}
