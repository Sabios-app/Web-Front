import { MessageCircle, Send, UserRound } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { messageService } from '../../services/sabiosServices'

export default function PainelMensagens({ contatosIniciais }) {
  const [contatos, setContatos] = useState(contatosIniciais ?? [])
  const [contatoAtivo, setContatoAtivo] = useState(
    () => contatosIniciais?.[0]?.id ?? null,
  )
  const [texto, setTexto] = useState('')
  const [carregandoMensagens, setCarregandoMensagens] = useState(false)
  const listaRef = useRef(null)

  // Carrega conversas da API ao montar (se não foram passadas props)
  useEffect(() => {
    if (contatosIniciais && contatosIniciais.length > 0) return
    async function carregarConversas() {
      try {
        const data = await messageService.listConversations()
        const lista = Array.isArray(data) ? data : (data?.content ?? [])
        const mapeados = lista.map((c) => ({
          id: c.id ?? c.specialistId,
          nome: c.name ?? c.specialistName ?? 'Conselheiro',
          foto: c.avatarUrl ?? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(c.name ?? 'C')}`,
          descricao: c.description ?? c.specialty ?? '',
          ultimaMensagem: c.lastMessage ?? '',
          mensagens: [],
          specialistId: c.specialistId ?? c.id,
        }))
        setContatos(mapeados)
        setContatoAtivo(mapeados[0]?.id ?? null)
      } catch {
        // mantém lista vazia
      }
    }
    carregarConversas()
  }, [contatosIniciais])

  const contato = useMemo(
    () => contatos.find((item) => item.id === contatoAtivo) ?? contatos[0] ?? null,
    [contatos, contatoAtivo],
  )

  // Rola para o fim quando mensagens mudam
  useEffect(() => {
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight
    }
  }, [contato?.mensagens])

  // Carrega mensagens da conversa ao selecionar contato
  async function selecionarContato(id) {
    setContatoAtivo(id)
    const c = contatos.find((x) => x.id === id)
    if (!c || c.mensagens.length > 0) return
    setCarregandoMensagens(true)
    try {
      const data = await messageService.getConversation(id)
      const msgs = Array.isArray(data) ? data : (data?.messages ?? [])
      const mapeadas = msgs.map((m) => ({
        id: m.id,
        texto: m.content ?? m.text ?? '',
        propria: m.own ?? m.sentByMe ?? false,
        horario: m.createdAt
          ? new Date(m.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
          : '',
      }))
      setContatos((prev) =>
        prev.map((item) => (item.id === id ? { ...item, mensagens: mapeadas } : item)),
      )
    } catch {
      // mantém vazio
    } finally {
      setCarregandoMensagens(false)
    }
  }

  async function enviarMensagem(event) {
    event.preventDefault()
    const mensagem = texto.trim()
    if (!mensagem || !contato) return

    const novaMsg = { id: Date.now(), texto: mensagem, propria: true, horario: 'agora' }
    setContatos((atuais) =>
      atuais.map((item) =>
        item.id === contato.id
          ? { ...item, ultimaMensagem: mensagem, mensagens: [...item.mensagens, novaMsg] }
          : item,
      ),
    )
    setTexto('')

    try {
      await messageService.send({ specialistId: contato.specialistId ?? contato.id, content: mensagem })
    } catch {
      // silencia — mensagem já foi exibida otimisticamente
    }
  }

  return (
    <section className="grid min-h-128 overflow-hidden rounded-3xl border border-divisoria bg-white shadow-sm lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="border-b border-divisoria bg-campo/60 p-4 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 px-2">
          <MessageCircle size={20} className="text-dourado-escuro" aria-hidden="true" />
          <h2 className="font-titulo text-xl text-verde-titulo">Conversas</h2>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto lg:flex-col">
          {contatos.length === 0 && (
            <p className="px-2 text-sm text-texto-secundario">Nenhuma conversa ainda.</p>
          )}
          {contatos.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => selecionarContato(item.id)}
              className={`min-w-52 rounded-2xl p-3 text-left transition-colors lg:min-w-0 ${
                item.id === contato?.id ? 'bg-white shadow-sm' : 'hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={item.foto} alt="" className="h-11 w-11 rounded-full object-cover" />
                <span className="min-w-0">
                  <strong className="block truncate text-sm text-verde-titulo">{item.nome}</strong>
                  <span className="mt-1 block truncate text-xs text-texto-secundario">
                    {item.ultimaMensagem}
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {contato ? (
        <div className="flex min-h-128 min-w-0 flex-col">
          <header className="flex items-center gap-3 border-b border-divisoria px-5 py-4 sm:px-6">
            <img
              src={contato.foto}
              alt=""
              className="h-12 w-12 rounded-full border-2 border-verde-petroleo object-cover"
            />
            <div>
              <h2 className="font-titulo text-xl text-verde-titulo">{contato.nome}</h2>
              <p className="text-sm text-texto-secundario">{contato.descricao}</p>
            </div>
          </header>

          <div
            ref={listaRef}
            className="flex-1 space-y-4 overflow-y-auto bg-creme/60 p-5 sm:p-6"
          >
            {carregandoMensagens && (
              <p className="text-center text-sm text-texto-secundario">Carregando mensagens…</p>
            )}
            {contato.mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex ${mensagem.propria ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
                    mensagem.propria
                      ? 'rounded-br-sm bg-verde-petroleo text-white'
                      : 'rounded-bl-sm border border-divisoria bg-white text-verde-titulo'
                  }`}
                >
                  <p>{mensagem.texto}</p>
                  <span
                    className={`mt-1 block text-right text-[11px] ${
                      mensagem.propria ? 'text-white/70' : 'text-texto-secundario'
                    }`}
                  >
                    {mensagem.horario}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={enviarMensagem}
            className="flex gap-2 border-t border-divisoria bg-white p-4"
          >
            <label htmlFor="mensagem" className="sr-only">
              Escreva uma mensagem
            </label>
            <input
              id="mensagem"
              value={texto}
              onChange={(event) => setTexto(event.target.value)}
              placeholder="Escreva uma mensagem..."
              className="min-h-12 min-w-0 flex-1 rounded-full border border-divisoria bg-creme px-4 text-sm text-verde-titulo outline-none transition focus:border-dourado-foco focus:ring-2 focus:ring-dourado-foco/20"
            />
            <button
              type="submit"
              disabled={!texto.trim()}
              aria-label="Enviar mensagem"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dourado text-verde-escuro transition-colors hover:bg-dourado-claro disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center text-texto-secundario">
          <UserRound size={32} className="text-dourado-escuro" aria-hidden="true" />
          <p className="mt-3">Selecione uma conversa para começar.</p>
        </div>
      )}
    </section>
  )
}
