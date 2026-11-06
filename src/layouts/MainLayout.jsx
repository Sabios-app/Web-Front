import Cabecalho from './Cabecalho'
import PainelAcessibilidade from './PainelAcessibilidade'
import Rodape from './Rodape'

/** Estrutura das páginas públicas: cabeçalho, conteúdo, rodapé e botão de acessibilidade. */
export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-creme text-verde-petroleo">
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-verde-petroleo px-5 py-3 font-bold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
      >
        Ir direto para o conteúdo
      </a>
      <Cabecalho />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Rodape />
      <PainelAcessibilidade />
    </div>
  )
}
