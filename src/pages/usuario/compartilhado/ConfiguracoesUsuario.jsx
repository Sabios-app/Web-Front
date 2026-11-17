import { Bell, Eye, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import { useAcessibilidade } from '../../../hooks/useAcessibilidade'
import OpcaoConfiguracao from './OpcaoConfiguracao'

export default function ConfiguracoesUsuario({ perfil, usuario }) {
  const [notificacoes, setNotificacoes] = useState(true)
  const a11y = useAcessibilidade()

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6">
        <section className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4 border-b border-divisoria pb-6">
          <img src={usuario.foto} alt="" className="h-20 w-20 rounded-full border-2 border-verde-petroleo object-cover" />
          <div>
            <h2 className="font-titulo text-2xl text-verde-titulo">{usuario.nome}</h2>
            <p className="text-texto-secundario">
              {perfil === 'cliente' ? usuario.negocio : usuario.cargo}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="flex items-center gap-2 font-titulo text-xl text-verde-titulo">
            <UserRound size={20} className="text-dourado-escuro" aria-hidden="true" />
            Dados da conta
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-campo p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-texto-secundario">Nome</p>
              <p className="mt-1 font-semibold text-verde-titulo">{usuario.nome}</p>
            </div>
            <div className="rounded-2xl bg-campo p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-texto-secundario">Perfil</p>
              <p className="mt-1 font-semibold text-verde-titulo">
                {perfil === 'cliente' ? 'Cliente empreendedor' : 'Conselheiro sênior'}
              </p>
            </div>
          </div>
          <button type="button" className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-verde-petroleo px-5 text-sm font-bold text-verde-petroleo transition-colors hover:bg-campo">
            <LockKeyhole size={16} aria-hidden="true" />
            Alterar senha
          </button>
        </div>
      </section>

      <section className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-dourado-aviso text-dourado-escuro">
            <Bell size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-titulo text-xl text-verde-titulo">Comunicação</h3>
            <p className="mt-1 text-sm text-texto-secundario">Escolha quais avisos deseja receber da Sábios.</p>
          </div>
        </div>
        <div className="mt-5">
          <OpcaoConfiguracao
            titulo="Receber notificações"
            descricao="Avisos sobre mentorias, mensagens e alterações na agenda."
            ativo={notificacoes}
            aoAlternar={() => setNotificacoes((valor) => !valor)}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-dourado-claro/60 bg-dourado-aviso/40 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-dourado-escuro shadow-xs">
            <Eye size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-titulo text-xl text-verde-titulo">Acessibilidade</h3>
            <p className="mt-1 text-sm text-texto-secundario">
              Ajustes de leitura e contraste para deixar sua experiência mais confortável.
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-3">
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
      </div>

      <aside className="h-fit rounded-3xl border border-divisoria bg-white p-6 shadow-sm">
        <ShieldCheck className="text-dourado-escuro" aria-hidden="true" />
        <p className="text-sm font-bold uppercase tracking-widest text-dourado-escuro">Seus dados</p>
        <h2 className="mt-3 font-titulo text-2xl text-verde-titulo">Tudo sob controle</h2>
        <p className="mt-3 text-texto-secundario">
          Suas preferências ficam salvas neste dispositivo e podem ser alteradas quando quiser.
        </p>
      </aside>
    </div>
  )
}
