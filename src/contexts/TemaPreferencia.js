const CHAVE_TEMA = 'sabios:tema'

export function lerTema(armazenamento) {
  try {
    return (armazenamento ?? localStorage).getItem(CHAVE_TEMA) === 'escuro' ? 'escuro' : 'claro'
  } catch {
    return 'claro'
  }
}

export function salvarTema(tema, armazenamento) {
  try {
    const armazenamentoAtual = armazenamento ?? localStorage
    armazenamentoAtual.setItem(CHAVE_TEMA, tema === 'escuro' ? 'escuro' : 'claro')
  } catch {
    // Sem armazenamento disponível, a preferência vale apenas durante esta visita.
  }
}

export function aplicarTema(raiz, tema) {
  if (tema === 'escuro') raiz.setAttribute('data-tema', 'escuro')
  else raiz.removeAttribute('data-tema')
}
