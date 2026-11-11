import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import Botao from '../components/Botao'

const DESAFIOS_DISPONIVEIS = [
  'Organizar o fluxo de caixa',
  'Aumentar vendas e clientes',
  'Precificar produtos e serviços',
  'Contratar e liderar pessoas',
  'Planejar a expansão do negócio',
]

export default function CadastroClientePage() {
  const navigate = useNavigate()

  // em qual etapa a pessoa está (1 ou 2)
  const [etapa, setEtapa] = useState(1)

  // tudo o que a pessoa digitou
  const [dados, setDados] = useState({
    nome: '',
    negocio: '',
    tempo: '',
    desafios: ['Organizar o fluxo de caixa'],
    cidade: '',
    segmento: '',
    tamanhoEquipe: '1 a 5 pessoas',
  })

  // atualiza só o campo que mudou e mantém o resto
  function atualizar(campo, valor) {
    setDados({ ...dados, [campo]: valor })
  }

  function alternarDesafio(desafio) {
    if (dados.desafios.includes(desafio)) {
      if (dados.desafios.length > 1) {
        atualizar('desafios', dados.desafios.filter((d) => d !== desafio))
      }
    } else {
      atualizar('desafios', [...dados.desafios, desafio])
    }
  }

  function voltar() {
    if (etapa === 1) navigate('/cadastro')
    else setEtapa(1)
  }

  function continuar(e) {
    e.preventDefault() // impede a página de recarregar
    if (etapa === 1) {
      setEtapa(2)
    } else {
      // Cadastro finalizado: vai para o painel de cliente
      navigate('/usuario/cliente')
    }
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

        {etapa === 2 && (
          <div className="mt-8 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-base font-bold text-verde-titulo">
                Qual seu maior desafio no momento?
              </label>
              <div className="flex flex-wrap gap-2">
                {DESAFIOS_DISPONIVEIS.map((desafio) => {
                  const ativa = dados.desafios.includes(desafio)
                  return (
                    <button
                      key={desafio}
                      type="button"
                      onClick={() => alternarDesafio(desafio)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        ativa
                          ? 'bg-verde-petroleo text-white shadow-xs'
                          : 'border border-divisoria bg-white text-verde-petroleo hover:bg-campo'
                      }`}
                    >
                      {desafio}
                    </button>
                  )
                })}
              </div>
            </div>

            <CampoTexto
              id="segmento"
              rotulo="Ramo ou segmento do negócio"
              placeholder="Ex.: Panificação / Padaria"
              valor={dados.segmento}
              aoMudar={(e) => atualizar('segmento', e.target.value)}
              obrigatorio
            />

            <CampoTexto
              id="cidade"
              rotulo="Cidade e Estado onde seu negócio atua"
              placeholder="Ex.: Aracaju, SE"
              valor={dados.cidade}
              aoMudar={(e) => atualizar('cidade', e.target.value)}
              obrigatorio
            />

            <div>
              <label htmlFor="tamanhoEquipe" className="mb-2 block text-base font-bold text-verde-titulo">
                Tamanho da equipe
              </label>
              <select
                id="tamanhoEquipe"
                value={dados.tamanhoEquipe}
                onChange={(e) => atualizar('tamanhoEquipe', e.target.value)}
                className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-base text-verde-petroleo focus:border-dourado-foco focus:outline-none focus:ring-2 focus:ring-dourado-foco/30"
              >
                <option value="Apenas eu (autônomo/MEI)">Apenas eu (autônomo/MEI)</option>
                <option value="1 a 5 pessoas">1 a 5 pessoas</option>
                <option value="6 a 15 pessoas">6 a 15 pessoas</option>
                <option value="Mais de 15 pessoas">Mais de 15 pessoas</option>
              </select>
            </div>

            <Botao type="submit">Concluir cadastro e acessar meu painel</Botao>
          </div>
        )}
      </form>
    </AuthLayout>
  )
}
