import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelecaoOpcoes from '../components/forms/SelecaoOpcoes'
import AuthLayout from '../layouts/AuthLayout'
import Botao from '../components/Botao'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import useAuth from '../hooks/useAuth'

const DESAFIOS_DISPONIVEIS = [
  'Organizar o fluxo de caixa',
  'Aumentar vendas e clientes',
  'Precificar produtos e serviços',
  'Contratar e liderar pessoas',
  'Planejar a expansão do negócio',
]

export default function CadastroClientePage() {
  const navigate = useNavigate()
  const { cadastrar } = useAuth()

  // em qual etapa a pessoa está (1 ou 2)
  const [etapa, setEtapa] = useState(1)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // tudo o que a pessoa digitou
  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
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

  async function continuar(e) {
    e.preventDefault() // impede a página de recarregar
    if (etapa === 1) {
      setEtapa(2)
    } else {
      setErro('')
      setCarregando(true)
      try {
        await cadastrar({
          name: dados.nome,
          email: dados.email,
          password: dados.senha,
          role: 'CLIENT',
          phone: dados.telefone,
        })
        navigate('/usuario/cliente')
      } catch (err) {
        const msg = err.response?.data?.message || 'Erro ao realizar cadastro. Verifique os dados.'
        setErro(msg)
      } finally {
        setCarregando(false)
      }
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
              ? 'Preencha seus dados de acesso e identificação.'
              : 'Assim conseguimos indicar os conselheiros mais adequados para você.'
          }
          aoVoltar={voltar}
        />

        {erro && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
            {erro}
          </div>
        )}

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
              id="email"
              rotulo="E-mail de acesso"
              placeholder="seuemail@exemplo.com"
              valor={dados.email}
              aoMudar={(e) => atualizar('email', e.target.value)}
              obrigatorio
            />
            <div>
              <label htmlFor="senha" className="mb-2 block text-base font-bold text-verde-titulo">
                Senha de acesso
              </label>
              <input
                id="senha"
                type="password"
                required
                value={dados.senha}
                onChange={(e) => atualizar('senha', e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:border-dourado-foco focus:outline-none! focus:ring-2 focus:ring-dourado-foco/15 focus:ring-offset-0"
              />
            </div>
            <CampoTexto
              id="telefone"
              rotulo="Telefone / WhatsApp"
              placeholder="(11) 99999-9999"
              valor={dados.telefone}
              aoMudar={(e) => atualizar('telefone', e.target.value)}
            />
            <CampoTexto
              id="negocio"
              rotulo="Nome do negócio"
              placeholder="Ex.: Café da Praça"
              valor={dados.negocio}
              aoMudar={(e) => atualizar('negocio', e.target.value)}
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
              <SelecaoOpcoes
                opcoes={DESAFIOS_DISPONIVEIS}
                selecionadas={dados.desafios}
                aoAlternar={alternarDesafio}
              />
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
                className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:border-dourado-foco focus:outline-none! focus:ring-2 focus:ring-dourado-foco/15 focus:ring-offset-0"
              >
                <option value="Apenas eu (autônomo/MEI)">Apenas eu (autônomo/MEI)</option>
                <option value="1 a 5 pessoas">1 a 5 pessoas</option>
                <option value="6 a 15 pessoas">6 a 15 pessoas</option>
                <option value="Mais de 15 pessoas">Mais de 15 pessoas</option>
              </select>
            </div>

            <Botao type="submit" desabilitado={carregando}>
              {carregando ? 'Cadastrando...' : 'Concluir cadastro e acessar meu painel'}
            </Botao>
          </div>
        )}
      </form>
    </AuthLayout>
  )
}
