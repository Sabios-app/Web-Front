import { useContext } from 'react'
import { AcessibilidadeContext } from '../contexts/AcessibilidadeContext'

export function useAcessibilidade() {
  const contexto = useContext(AcessibilidadeContext)
  if (!contexto) {
    throw new Error('useAcessibilidade precisa estar dentro de <AcessibilidadeProvider>')
  }
  return contexto
}
