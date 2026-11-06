import { useEffect, useState } from 'react'
import { AcessibilidadeContext } from './AcessibilidadeContext'

function lerPreferencia(chave) {
  try {
    return localStorage.getItem(chave)
  } catch {
    return null
  }
}

function salvarPreferencia(chave, valor) {
  try {
    localStorage.setItem(chave, valor)
  } catch {
    // Sem localStorage (ex.: aba anônima): a preferência vale só nesta visita.
  }
}

/** Liga ou desliga um atributo data-* no <html>. O index.css usa esses atributos. */
function aplicarNoHtml(nome, ligado) {
  if (ligado) document.documentElement.setAttribute(`data-${nome}`, 'sim')
  else document.documentElement.removeAttribute(`data-${nome}`)
}

/**
 * Preferências de acessibilidade do site inteiro: texto maior, alto contraste
 * e modo simples. Ficam salvas no navegador da pessoa.
 */
export default function AcessibilidadeProvider({ children }) {
  const [textoMaior, setTextoMaior] = useState(() => lerPreferencia('sabios:texto-maior') === 'sim')
  const [altoContraste, setAltoContraste] = useState(() => lerPreferencia('sabios:alto-contraste') === 'sim')
  const [modoSimples, setModoSimples] = useState(() => lerPreferencia('sabios:modo-simples') === 'sim')

  useEffect(() => {
    aplicarNoHtml('texto-maior', textoMaior)
    salvarPreferencia('sabios:texto-maior', textoMaior ? 'sim' : 'nao')
  }, [textoMaior])

  useEffect(() => {
    aplicarNoHtml('alto-contraste', altoContraste)
    salvarPreferencia('sabios:alto-contraste', altoContraste ? 'sim' : 'nao')
  }, [altoContraste])

  useEffect(() => {
    aplicarNoHtml('modo-simples', modoSimples)
    salvarPreferencia('sabios:modo-simples', modoSimples ? 'sim' : 'nao')
  }, [modoSimples])

  const baixaVisaoAtiva = textoMaior && altoContraste && modoSimples

  const valor = {
    textoMaior,
    altoContraste,
    modoSimples,
    baixaVisaoAtiva,
    alternarTextoMaior: () => setTextoMaior((v) => !v),
    alternarAltoContraste: () => setAltoContraste((v) => !v),
    alternarModoSimples: () => setModoSimples((v) => !v),
    // "Modo baixa visão" liga (ou desliga) os três ajustes de uma vez.
    alternarBaixaVisao: () => {
      const ligar = !baixaVisaoAtiva
      setTextoMaior(ligar)
      setAltoContraste(ligar)
      setModoSimples(ligar)
    },
  }

  return <AcessibilidadeContext.Provider value={valor}>{children}</AcessibilidadeContext.Provider>
}
