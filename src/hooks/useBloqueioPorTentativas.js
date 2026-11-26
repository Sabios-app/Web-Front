import { useEffect, useState } from 'react'

export default function useBloqueioPorTentativas() {
  const [segundosRestantes, setSegundosRestantes] = useState(0)

  useEffect(() => {
    if (segundosRestantes <= 0) return undefined

    const timer = setInterval(() => {
      setSegundosRestantes((atual) => (atual <= 1 ? 0 : atual - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [segundosRestantes])

  function iniciarBloqueio(segundos) {
    if (Number.isFinite(segundos) && segundos > 0) {
      setSegundosRestantes(Math.ceil(segundos))
    }
  }

  function limparBloqueio() {
    setSegundosRestantes(0)
  }

  return {
    bloqueado: segundosRestantes > 0,
    segundosRestantes,
    iniciarBloqueio,
    limparBloqueio,
  }
}
