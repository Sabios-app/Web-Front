import { Check, Clock, X } from 'lucide-react'
import { useState } from 'react'

export default function SolicitacoesPendentesConselheiro({ solicitacoesIniciais }) {
  const [solicitacoes, setSolicitacoes] = useState(solicitacoesIniciais || [])
  const [mensagemSucesso, setMensagemSucesso] = useState('')

  function responder(id, acao) {
    const alvo = solicitacoes.find((s) => s.id === id)
    setSolicitacoes(solicitacoes.filter((s) => s.id !== id))
    if (acao === 'aceitar') {
      setMensagemSucesso(`Sessão com ${alvo.clienteNome} confirmada e adicionada à sua agenda!`)
    } else {
      setMensagemSucesso(`Solicitação de ${alvo.clienteNome} recusada com aviso educado.`)
    }
    setTimeout(() => setMensagemSucesso(''), 4000)
  }

  return (
    <div>
      {mensagemSucesso && (
        <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-300 p-4 text-sm font-semibold text-emerald-900 flex items-center gap-2">
          <Check size={18} className="text-emerald-700" />
          {mensagemSucesso}
        </div>
      )}

      {solicitacoes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-divisoria p-8 text-center text-texto-secundario">
          Tudo em dia! Nenhuma solicitação pendente no momento.
        </div>
      ) : (
        <div className="space-y-4">
          {solicitacoes.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl border border-divisoria bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={s.clienteFoto}
                    alt={s.clienteNome}
                    className="h-14 w-14 rounded-full border border-divisoria object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-titulo text-lg font-bold text-verde-titulo">
                        {s.clienteNome}
                      </h3>
                      <span className="rounded-full bg-campo px-2.5 py-0.5 text-xs font-bold text-verde-petroleo">
                        {s.clienteNegocio}
                      </span>
                    </div>

                    <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-dourado-escuro">
                      <Clock size={14} />
                      Horário sugerido: {s.dataSugerida}
                    </p>

                    <p className="mt-2 text-sm font-medium text-verde-titulo">
                      <strong>Tema:</strong> {s.tema}
                    </p>

                    <blockquote className="mt-2 rounded-xl bg-campo/60 p-3 text-sm italic text-texto-secundario">
                      “{s.mensagem}”
                    </blockquote>
                  </div>
                </div>

                <div className="flex flex-row gap-2 sm:flex-col sm:items-end">
                  <button
                    type="button"
                    onClick={() => responder(s.id, 'aceitar')}
                    className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-verde-petroleo px-5 text-sm font-bold text-white transition hover:bg-verde-hover sm:flex-initial"
                  >
                    <Check size={16} />
                    Aceitar sessão
                  </button>
                  <button
                    type="button"
                    onClick={() => responder(s.id, 'recusar')}
                    className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-divisoria bg-white px-4 text-sm font-bold text-texto-secundario transition hover:bg-campo hover:text-red-700"
                  >
                    <X size={15} />
                    Recusar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
