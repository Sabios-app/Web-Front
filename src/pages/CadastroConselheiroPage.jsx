import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SelecaoOpcoes from '../components/forms/SelecaoOpcoes'
import AuthLayout from '../layouts/AuthLayout'
import Botao from '../components/Botao'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import useAuth from '../hooks/useAuth'
import { specialistService } from '../services/sabiosServices'

const AREAS_DISPONIVEIS = [
  'Finanças & Gestão',
  'Vendas & Estratégia',
  'Liderança & Pessoas',
  'Operações & Logística',
  'Marketing & Clientes',
]

export default function CadastroConselheiroPage() {
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
    cargo: '',
    anos: '',
    areas: ['Finanças & Gestão'],
    cidade: '',
    sobre: '',
    valorSessao: '180',
  })

  // atualiza só o campo que mudou e mantém o resto
  function atualizar(campo, valor) {
    setDados({ ...dados, [campo]: valor })
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
          role: 'COUNSELOR',
          phone: dados.telefone,
        })

        // Tenta registrar o perfil de especialista do conselheiro no backend
        try {
          const valorNumerico = parseFloat(dados.valorSessao.replace(',', '.')) || 150.0
          await specialistService.createProfile({
            bio: dados.sobre,
            specialty: dados.areas.join(', '),
            hourlyRate: valorNumerico,
          })
        } catch (perfilErr) {
          console.warn('Perfil especialista será configurado no onboarding:', perfilErr)
        }

        navigate('/usuario/conselheiro')
      } catch (err) {
        const msg = err.response?.data?.message || 'Erro ao realizar cadastro de conselheiro.'
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
          perfil="Perfil de conselheiro"
          titulo={etapa === 1 ? 'Vamos começar pelo básico' : 'Conte-nos sobre sua trajetória'}
          subtitulo={
            etapa === 1
              ? 'Preencha seus dados de acesso e identificação.'
              : 'Essas informações ajudam clientes a encontrar a experiência certa.'
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
                className="w-full rounded-xl border border-divisoria bg-white p-4 text-base text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:border-dourado-foco focus:outline-none! focus:ring-2 focus:ring-dourado-foco/15 focus:ring-offset-0"
                required
              />
            </div>

            <CampoTexto
              id="valorSessao"
              rotulo="Valor sugerido por mentoria de 1 hora (R$)"
              placeholder="Ex.: 180"
              valor={dados.valorSessao}
              aoMudar={(e) => atualizar('valorSessao', e.target.value)}
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
