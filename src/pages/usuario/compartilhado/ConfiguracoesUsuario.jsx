import { useState } from 'react'
import { useAcessibilidade } from '../../../hooks/useAcessibilidade'
import OpcaoConfiguracao from './OpcaoConfiguracao'

export default function ConfiguracoesUsuario({ perfil, usuario }) {
  const [notificacoes, setNotificacoes] = useState(true)
  const a11y = useAcessibilidade()

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4 border-b border-divisoria pb-6">
          <img src={usuario.foto} alt="" className="h-20 w-20 rounded-full object-cover" />
          <div>
            <h2 className="font-titulo text-2xl text-verde-titulo">{usuario.nome}</h2>
            <p className="text-texto-secundario">
              {perfil === 'cliente' ? usuario.negocio : usuario.cargo}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="font-titulo text-xl text-verde-titulo">Preferências da conta</h3>
          <OpcaoConfiguracao
            titulo="Receber notificações"
            descricao="Avisos sobre mentorias, mensagens e alterações na agenda."
            ativo={notificacoes}
            aoAlternar={() => setNotificacoes((valor) => !valor)}
          />
          <OpcaoConfiguracao
            titulo="Texto maior"
            descricao="Aumenta o tamanho dos textos e dos espaçamentos."
            ativo={a11y.textoMaior}
            aoAlternar={a11y.alternarTextoMaior}
          />
          <OpcaoConfiguracao
            titulo="Alto contraste"
            descricao="Reforça cores, contornos e contraste da interface."
            ativo={a11y.altoContraste}
            aoAlternar={a11y.alternarAltoContraste}
          />
          <OpcaoConfiguracao
            titulo="Modo simples"
            descricao="Oculta informações secundárias para facilitar a leitura."
            ativo={a11y.modoSimples}
            aoAlternar={a11y.alternarModoSimples}
          />
        </div>
      </section>

      <aside className="rounded-3xl bg-dourado-aviso p-6">
        <p className="text-sm font-bold uppercase tracking-widest text-dourado-escuro">Seus dados</p>
        <h2 className="mt-3 font-titulo text-2xl text-verde-titulo">Tudo sob controle</h2>
        <p className="mt-3 text-texto-secundario">
          Suas preferências ficam salvas neste dispositivo e podem ser alteradas quando quiser.
        </p>
      </aside>
    </div>
  )
}
