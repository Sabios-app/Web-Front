import { useLayoutEffect, useState } from 'react'
import { aplicarTema, lerTema, salvarTema } from './TemaPreferencia'
import { TemaContext } from './TemaContext'

export default function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => lerTema())

  useLayoutEffect(() => {
    aplicarTema(document.documentElement, tema)
    salvarTema(tema)
  }, [tema])

  const valor = {
    temaEscuro: tema === 'escuro',
    alternarTema: () => setTema((atual) => (atual === 'escuro' ? 'claro' : 'escuro')),
  }

  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>
}
