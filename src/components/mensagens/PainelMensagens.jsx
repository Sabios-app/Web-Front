import { MessageCircle, Send, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function PainelMensagens({ contatosIniciais }) {
  const [contatos, setContatos] = useState(contatosIniciais)
  const [contatoAtivo, setContatoAtivo] = useState(contatosIniciais[0]?.id)
  const [texto, setTexto] = useState('')

  const contato = useMemo(
    () => contatos.find((item) => item.id === contatoAtivo) ?? contatos[0],
    [contatos, contatoAtivo],
  )

  function enviarMensagem(event) {
    event.preventDefault()
    const mensagem = texto.trim()
    if (!mensagem || !contato) return

    setContatos((atuais) =>
      atuais.map((item) =>
        item.id === contato.id
          ? {
              ...item,
              ultimaMensagem: mensagem,
              mensagens: [...item.mensagens, { id: Date.now(), texto: mensagem, propria: true, horario: 'agora' }],
            }
          : item,
      ),
    )
    setTexto('')
  }

  return (
    <section className="grid min-h-[32rem] overflow-hidden rounded-3xl border border-divisoria bg-white shadow-sm lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="border-b border-divisoria bg-campo/60 p-4 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 px-2">
          <MessageCircle size={20} className="text-dourado-escuro" aria-hidden="true" />
          <h2 className="font-titulo text-xl text-verde-titulo">Conversas</h2>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto lg:flex-col">
          {contatos.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setContatoAtivo(item.id)}
              className={`min-w-52 rounded-2xl p-3 text-left transition-colors lg:min-w-0 ${
                item.id === contato?.id ? 'bg-white shadow-sm' : 'hover:bg-white/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={item.foto} alt="" className="h-11 w-11 rounded-full object-cover" />
                <span className="min-w-0">
                  <strong className="block truncate text-sm text-verde-titulo">{item.nome}</strong>
                  <span className="mt-1 block truncate text-xs text-texto-secundario">{item.ultimaMensagem}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {contato ? (
        <div className="flex min-h-[32rem] min-w-0 flex-col">
          <header className="flex items-center gap-3 border-b border-divisoria px-5 py-4 sm:px-6">
            <img src={contato.foto} alt="" className="h-12 w-12 rounded-full border-2 border-verde-petroleo object-cover" />
            <div>
              <h2 className="font-titulo text-xl text-verde-titulo">{contato.nome}</h2>
              <p className="text-sm text-texto-secundario">{contato.descricao}</p>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-creme/60 p-5 sm:p-6">
            {contato.mensagens.map((mensagem) => (
              <div key={mensagem.id} className={`flex ${mensagem.propria ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
                  mensagem.propria
                    ? 'rounded-br-sm bg-verde-petroleo text-white'
                    : 'rounded-bl-sm border border-divisoria bg-white text-verde-titulo'
                }`}>
                  <p>{mensagem.texto}</p>
                  <span className={`mt-1 block text-right text-[11px] ${mensagem.propria ? 'text-white/70' : 'text-texto-secundario'}`}>
                    {mensagem.horario}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={enviarMensagem} className="flex gap-2 border-t border-divisoria bg-white p-4">
            <label htmlFor="mensagem" className="sr-only">Escreva uma mensagem</label>
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
