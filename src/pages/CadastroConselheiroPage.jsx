import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Botao from '../components/Botao'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import AlertaFormulario from '../components/feedback/AlertaFormulario'
import SelecaoOpcoes from '../components/forms/SelecaoOpcoes'
import useAuth from '../hooks/useAuth'
import AuthLayout from '../layouts/AuthLayout'
import { specialistService } from '../services/sabiosServices'
import { extrairErrosDeCampo, parseApiError } from '../utils/apiError'

const AREAS_DISPONIVEIS = [
  'Finanças & Gestão',
  'Vendas & Estratégia',
  'Liderança & Pessoas',
  'Operações & Logística',
  'Marketing & Clientes',
]

const ALIASES_CADASTRO_CONSELHEIRO = {
  name: 'nome',
  password: 'senha',
  phone: 'telefone',
  bio: 'sobre',
  specialty: 'areas',
  hourlyRate: 'valorSessao',
}

const CAMPOS_ETAPA_1 = ['nome', 'email', 'senha', 'telefone']
const CAMPOS_CONSELHEIRO = [...CAMPOS_ETAPA_1, 'sobre', 'areas', 'valorSessao']

export default function CadastroConselheiroPage() {
  const navigate = useNavigate()
  const { cadastrar } = useAuth()

  const [etapa, setEtapa] = useState(1)
  const [contaCriada, setContaCriada] = useState(false)
  const [erro, setErro] = useState('')
  const [errosCampos, setErrosCampos] = useState({})
  const [carregando, setCarregando] = useState(false)

  const [dados, setDados] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
    cargo: '',
    anos: '',
    areas: ['Finanças & Gestão'],
    cidade: '',
    sobre: '',
    valorSessao: '180',
  })

  function atualizar(campo, valor) {
    setDados((atual) => ({ ...atual, [campo]: valor }))
    if (errosCampos[campo]) {
      setErrosCampos((atual) => ({ ...atual, [campo]: '' }))
    }
  }

  function alternarArea(area) {
    if (dados.areas.includes(area)) {
      if (dados.areas.length > 1) {
        atualizar('areas', dados.areas.filter((a) => a !== area))
      }
    } else {
      atualizar('areas', [...dados.areas, area])
    }
  }

  function voltar() {
    if (etapa === 1) navigate('/cadastro')
    else setEtapa(1)
  }

  async function continuar(e) {
    e.preventDefault()
    if (etapa === 1) {
      setErro('')
      setEtapa(2)
      return
    }

    setErro('')
    setErrosCampos({})
    setCarregando(true)
    try {
      if (!contaCriada) {
        await cadastrar({
          name: dados.nome,
          email: dados.email,
          password: dados.senha,
          role: 'COUNSELOR',
          phone: dados.telefone,
        })
        setContaCriada(true)
      }

      const valorNumerico = parseFloat(dados.valorSessao.replace(',', '.')) || 150.0
      await specialistService.createProfile({
        bio: dados.sobre,
        specialty: dados.areas.join(', '),
        hourlyRate: valorNumerico,
      })

      navigate('/usuario/conselheiro')
    } catch (err) {
      const parsed = parseApiError(err, 'Erro ao realizar cadastro de conselheiro.')
      const { errosCampos: campos, mensagemGeral } = extrairErrosDeCampo(
        parsed,
        ALIASES_CADASTRO_CONSELHEIRO,
        CAMPOS_CONSELHEIRO,
      )
      setErrosCampos(campos)
      setErro(mensagemGeral)
      if (CAMPOS_ETAPA_1.some((campo) => campos[campo])) {
        setEtapa(1)
      }
    } finally {
      setCarregando(false)
    }
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
              ? 'Preencha seus dados de acesso e identificação.'
              : 'Essas informações ajudam clientes a encontrar a experiência certa.'
          }
          aoVoltar={voltar}
        />

        <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

        {etapa === 1 && (
          <div className="mt-8 flex flex-col gap-5">
            <CampoTexto
              id="nome"
              rotulo="Nome completo"
              placeholder="Digite seu nome completo"
              valor={dados.nome}
              aoMudar={(e) => atualizar('nome', e.target.value)}
              erro={errosCampos.nome}
              obrigatorio
            />
            <CampoTexto
              id="email"
              type="email"
              rotulo="E-mail de acesso"
              placeholder="seuemail@exemplo.com"
              valor={dados.email}
              aoMudar={(e) => atualizar('email', e.target.value)}
              erro={errosCampos.email}
              obrigatorio
            />
            <CampoTexto
              id="senha"
              type="password"
              rotulo="Senha de acesso"
              placeholder="Mínimo 6 caracteres"
              valor={dados.senha}
              aoMudar={(e) => atualizar('senha', e.target.value)}
              erro={errosCampos.senha}
              obrigatorio
            />
            <CampoTexto
              id="telefone"
              rotulo="Telefone / WhatsApp"
              placeholder="(11) 99999-9999"
              valor={dados.telefone}
              aoMudar={(e) => atualizar('telefone', e.target.value)}
              erro={errosCampos.telefone}
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

        {etapa === 2 && (
          <div className="mt-8 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-base font-bold text-verde-titulo">
                Áreas em que você pode aconselhar
              </label>
              <SelecaoOpcoes
                opcoes={AREAS_DISPONIVEIS}
                selecionadas={dados.areas}
                aoAlternar={alternarArea}
              />
              {errosCampos.areas && (
                <p role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
                  {errosCampos.areas}
                </p>
              )}
            </div>

            <CampoTexto
              id="cidade"
              rotulo="Cidade e Estado"
              placeholder="Ex.: Aracaju, SE"
              valor={dados.cidade}
              aoMudar={(e) => atualizar('cidade', e.target.value)}
              obrigatorio
            />

            <div>
              <label htmlFor="sobre" className="mb-2 block text-base font-bold text-verde-titulo">
                Resumo sobre sua experiência prática
              </label>
              <textarea
                id="sobre"
                rows={3}
                value={dados.sobre}
                onChange={(e) => atualizar('sobre', e.target.value)}
                placeholder="Ex.: Fui diretora financeira por 32 anos. Hoje ajudo pequenos negócios a organizar o fluxo de caixa..."
                aria-invalid={Boolean(errosCampos.sobre)}
                aria-describedby={errosCampos.sobre ? 'sobre-erro' : undefined}
                className={`w-full rounded-xl border bg-white p-4 text-base text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:outline-none! focus:ring-2 focus:ring-offset-0 ${
                  errosCampos.sobre
                    ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
                    : 'border-divisoria focus:border-dourado-foco focus:ring-dourado-foco/15'
                }`}
                required
              />
              {errosCampos.sobre && (
                <p id="sobre-erro" role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
                  {errosCampos.sobre}
                </p>
              )}
            </div>

            <CampoTexto
              id="valorSessao"
              rotulo="Valor sugerido por mentoria de 1 hora (R$)"
              placeholder="Ex.: 180"
              valor={dados.valorSessao}
              aoMudar={(e) => atualizar('valorSessao', e.target.value)}
              erro={errosCampos.valorSessao}
              obrigatorio
            />

            <Botao type="submit" desabilitado={carregando}>
              {carregando ? 'Cadastrando...' : 'Concluir cadastro e acessar meu painel'}
            </Botao>
          </div>
        )}
      </form>
    </AuthLayout>
  )
}
