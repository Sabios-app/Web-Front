import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import Botao from '../components/Botao'

export default function CadastroClientePage() {
  const navigate = useNavigate()

  // em qual etapa a pessoa está (1 ou 2)
  const [etapa, setEtapa] = useState(1)

  // tudo o que a pessoa digitou
  const [dados, setDados] = useState({ nome: '', negocio: '', tempo: '' })

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
          perfil="Perfil de cliente"
          titulo={etapa === 1 ? 'Vamos começar pelo básico' : 'Conte-nos sobre seu negócio'}
          subtitulo={
            etapa === 1
              ? 'Preencha somente estas informações. Você poderá alterar tudo depois.'
              : 'Assim conseguimos indicar os conselheiros mais adequados para você.'
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
              id="negocio"
              rotulo="Nome do negócio"
              placeholder="Ex.: Café da Praça"
              valor={dados.negocio}
              aoMudar={(e) => atualizar('negocio', e.target.value)}
              obrigatorio
            />
            <CampoTexto
              id="tempo"
              rotulo="Há quanto tempo empreende?"
              placeholder="Ex.: 2 anos"
              valor={dados.tempo}
              aoMudar={(e) => atualizar('tempo', e.target.value)}
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