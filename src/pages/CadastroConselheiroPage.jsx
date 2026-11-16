import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import CabecalhoEtapa from '../components/CabecalhoEtapa'
import CampoTexto from '../components/CampoTexto'
import Botao from '../components/Botao'

const AREAS_DISPONIVEIS = [
  'Finanças & Gestão',
  'Vendas & Estratégia',
  'Liderança & Pessoas',
  'Operações & Logística',
  'Marketing & Clientes',
]

export default function CadastroConselheiroPage() {
  const navigate = useNavigate()

  // em qual etapa a pessoa está (1 ou 2)
  const [etapa, setEtapa] = useState(1)

  // tudo o que a pessoa digitou
  const [dados, setDados] = useState({
    nome: '',
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

  function continuar(e) {
    e.preventDefault() // impede a página de recarregar
    if (etapa === 1) {
      setEtapa(2)
    } else {
      // Cadastro finalizado: vai para o painel de conselheiro
      navigate('/usuario/conselheiro')
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

        {etapa === 2 && (
          <div className="mt-8 flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-base font-bold text-verde-titulo">
                Áreas em que você pode aconselhar
              </label>
              <div className="flex flex-wrap gap-2">
                {AREAS_DISPONIVEIS.map((area) => {
                  const ativa = dados.areas.includes(area)
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => alternarArea(area)}
                      className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                        ativa
                          ? 'bg-verde-petroleo text-white shadow-xs'
                          : 'border border-divisoria bg-white text-verde-petroleo hover:bg-campo'
                      }`}
                    >
                      {area}
                    </button>
                  )
                })}
              </div>
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
                className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:border-dourado-foco focus:outline-none! focus:ring-2 focus:ring-dourado-foco/15 focus:ring-offset-0"
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

            <Botao type="submit">Concluir cadastro e acessar meu painel</Botao>
          </div>
        )}
      </form>
    </AuthLayout>
  )
}
