import { createContext } from 'react'

// Guarda as preferências de acessibilidade (tamanho da letra e contraste).
// O valor é fornecido por <AcessibilidadeProvider> e lido com useAcessibilidade().
export const AcessibilidadeContext = createContext(null)
