import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Ao trocar de página, volta para o topo.
 * Se o endereço tiver uma âncora (ex.: /#especialistas), rola até a seção.
 */
export default function ControleDeRolagem() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const secao = document.getElementById(hash.slice(1))
      if (secao) {
        secao.scrollIntoView()
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
