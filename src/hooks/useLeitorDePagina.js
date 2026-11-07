import { useEffect, useState } from 'react'

/**
 * Lê em voz alta o texto de um elemento usando a voz do próprio navegador
 * (Web Speech API). Não precisa de internet nem de chave de API.
 */
export function useLeitorDePagina(idDoConteudo) {
  const suportado = typeof window !== 'undefined' && 'speechSynthesis' in window
  const [lendo, setLendo] = useState(false)

  // Para a leitura se o componente sair da tela.
  useEffect(() => {
    return () => {
      if (suportado) window.speechSynthesis.cancel()
    }
  }, [suportado])

  function parar() {
    if (!suportado) return
    window.speechSynthesis.cancel()
    setLendo(false)
  }

  function ler() {
    if (!suportado) return
    const elemento = document.getElementById(idDoConteudo)
    if (!elemento) return

    window.speechSynthesis.cancel()
    const fala = new SpeechSynthesisUtterance(elemento.innerText)
    fala.lang = 'pt-BR'
    fala.rate = 0.95 // um pouco mais devagar, para ficar mais claro

    const vozBrasileira = window.speechSynthesis.getVoices().find((voz) => voz.lang === 'pt-BR')
    if (vozBrasileira) fala.voice = vozBrasileira

    fala.onend = () => setLendo(false)
    fala.onerror = () => setLendo(false)

    window.speechSynthesis.speak(fala)
    setLendo(true)
  }

  return { suportado, lendo, alternar: () => (lendo ? parar() : ler()) }
}
