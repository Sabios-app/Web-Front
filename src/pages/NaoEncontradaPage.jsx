import BotaoLink from '../components/BotaoLink'
import MainLayout from '../layouts/MainLayout'

export default function NaoEncontradaPage({ mensagem = 'Esta página não existe.' }) {
  return (
    <MainLayout>
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-24 text-center">
        <h1 className="font-titulo text-4xl text-verde-titulo">Página não encontrada</h1>
        <p className="text-xl text-texto-secundario">{mensagem}</p>
        <BotaoLink href="/" className="mt-4">
          Voltar para o início
        </BotaoLink>
      </div>
    </MainLayout>
  )
}
