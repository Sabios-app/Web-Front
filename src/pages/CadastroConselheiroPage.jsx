import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import Botao from '../components/Botao'

export default function CadastroConselheiroPage() {
  const navigate = useNavigate()

  // em qual etapa a pessoa está (1 ou 2)
  const [etapa, setEtapa] = useState(1)

  // tudo o que a pessoa digitou
  const [dados, setDados] = useState({ nome: '', cargo: '', anos: '' })

  // atualiza só o campo que mudou e mantém o resto
  function atualizar(campo, valor) {
    setDados({ ...dados, [campo]: valor })
  }

  function voltar() {
    if (etapa === 1) navigate('/cadastro')
    else setEtapa(1)
  }

  function continuar(e) {
    e.preventDefault() // impede a página de recarregar
    setEtapa(2)
  }

  return (
    <AuthLayout>
      <form onSubmit={continuar} className="w-full max-w-xl">
        <CabecalhoEtapa
          etapa={etapa}
          perfil="Perfil de conselheiro"
          titulo={etapa === 1 ? 'Vamos começar pelo básico' : 'Conte-nos sobre sua trajetória'}
          subtitulo={
            etapa === 1
              ? 'Preencha somente estas informações. Você poderá alterar tudo depois.'
              : 'Essas informações ajudam clientes a encontrar a experiência certa.'
          }
          aoVoltar={voltar}
        />

        {etapa === 1 && (
          <div className="mt-8 flex flex-col gap-5">
            <CampoTexto
              id="nome"
              rotulo="Nome completo"
              placeholder="Digite seu nome completo"
              valor={dados.nome}
              aoMudar={(e) => atualizar('nome', e.target.value)}
              obrigatorio
            />
            <CampoTexto
              id="cargo"
              rotulo="Último cargo profissional"
              placeholder="Ex.: Diretor financeiro"
              valor={dados.cargo}
              aoMudar={(e) => atualizar('cargo', e.target.value)}
              obrigatorio
            />
            <CampoTexto
              id="anos"
              rotulo="Anos de experiência"
              placeholder="Ex.: 30 anos"
              valor={dados.anos}
              aoMudar={(e) => atualizar('anos', e.target.value)}
              obrigatorio
            />
            <Botao type="submit">Continuar</Botao>
          </div>
        )}

        {etapa === 2 && <p className="mt-8 text-lg text-texto-secundario">Etapa 2 em construção</p>}
      </form>
    </AuthLayout>
  )
}