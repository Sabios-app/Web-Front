import { CalendarDays, Loader2, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import AlertaFormulario from '../../../components/feedback/AlertaFormulario'
import { reviewService } from '../../../services/sabiosServices'
import { parseApiError } from '../../../utils/apiError'

function EstrelaRating({ valor, onChange, leitura = false }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1" role={leitura ? 'img' : 'group'} aria-label={`Nota ${valor} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={leitura}
          aria-label={`${n} estrela${n > 1 ? 's' : ''}`}
          onClick={() => !leitura && onChange(n)}
          onMouseEnter={() => !leitura && setHover(n)}
          onMouseLeave={() => !leitura && setHover(0)}
          className={`transition-colors ${leitura ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star
            size={28}
            className={`${
              n <= (hover || valor)
                ? 'fill-dourado text-dourado-escuro'
                : 'fill-transparent text-divisoria'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function ModalAvaliar({ mentoria, aoSalvar, aoFechar }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function salvar(e) {
    e.preventDefault()
    if (rating === 0) {
      setErro('Selecione uma nota de 1 a 5 estrelas.')
      return
    }
    if (comment.length > 1000) {
      setErro('O comentário pode ter no máximo 1000 caracteres.')
      return
    }
    setErro('')
    setSalvando(true)
    try {
      const criada = await reviewService.create({
        mentoringId: mentoria.id,
        rating,
        comment: comment.trim() || undefined,
      })
      aoSalvar(criada)
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível salvar a avaliação.')
      setErro(
        parsed.status === 409
          ? 'Essa mentoria já foi avaliada.'
          : parsed.message,
      )
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-titulo" className="font-titulo text-2xl text-verde-titulo">
              Avaliar mentoria
            </h2>
            <p className="mt-1 text-sm text-texto-secundario">{mentoria.titulo}</p>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar modal"
            className="rounded-full p-1.5 hover:bg-campo"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={salvar} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-verde-titulo">Sua nota *</label>
            <EstrelaRating valor={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="comentario" className="mb-1 block text-sm font-bold text-verde-titulo">
              Comentário <span className="font-normal text-texto-secundario">(opcional)</span>
            </label>
            <textarea
              id="comentario"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Conte como foi sua experiência..."
              className="w-full rounded-xl border border-divisoria px-4 py-3 text-sm text-verde-titulo focus:outline-none focus:ring-2 focus:ring-dourado-foco resize-none"
            />
            <p className="mt-1 text-right text-xs text-texto-secundario">
              {comment.length}/1000
            </p>
          </div>

          <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

          <button
            type="submit"
            disabled={salvando}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-verde-petroleo px-6 py-3 font-bold text-white transition-colors hover:bg-verde-hover disabled:opacity-60"
          >
            {salvando && <Loader2 size={16} className="animate-spin" />}
            {salvando ? 'Salvando…' : 'Enviar avaliação'}
          </button>
        </form>
      </div>
    </div>
  )
}

function CardReview({ review, aoEditar, aoRemover }) {
  return (
    <div className="rounded-2xl border border-divisoria bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-verde-titulo">{review.mentoringTitle ?? 'Mentoria'}</p>
          <div className="mt-1">
            <EstrelaRating valor={review.rating} leitura />
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            type="button"
            onClick={() => aoEditar(review)}
            className="rounded-lg p-1.5 text-texto-secundario hover:bg-campo hover:text-verde-petroleo text-xs font-bold"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => aoRemover(review.id)}
            className="rounded-lg p-1.5 text-texto-secundario hover:bg-red-50 hover:text-red-600 text-xs font-bold"
          >
            Remover
          </button>
        </div>
      </div>
      {review.comment && (
        <p className="mt-3 text-sm text-texto-secundario">{review.comment}</p>
      )}
    </div>
  )
}

function ModalEditar({ review, aoSalvar, aoFechar }) {
  const [rating, setRating] = useState(review.rating)
  const [comment, setComment] = useState(review.comment ?? '')
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)

  async function salvar(e) {
    e.preventDefault()
    if (comment.length > 1000) {
      setErro('O comentário pode ter no máximo 1000 caracteres.')
      return
    }
    setErro('')
    setSalvando(true)
    try {
      const atualizado = await reviewService.update(review.id, {
        rating,
        comment: comment.trim() || undefined,
      })
      aoSalvar(atualizado ?? { ...review, rating, comment })
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível editar a avaliação.')
      setErro(parsed.message)
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-editar-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-editar-titulo" className="font-titulo text-2xl text-verde-titulo">
            Editar avaliação
          </h2>
          <button type="button" onClick={aoFechar} aria-label="Fechar" className="rounded-full p-1.5 hover:bg-campo">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={salvar} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-verde-titulo">Nota *</label>
            <EstrelaRating valor={rating} onChange={setRating} />
          </div>
          <div>
            <label htmlFor="comentario-edit" className="mb-1 block text-sm font-bold text-verde-titulo">
              Comentário
            </label>
            <textarea
              id="comentario-edit"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
              className="w-full rounded-xl border border-divisoria px-4 py-3 text-sm text-verde-titulo focus:outline-none focus:ring-2 focus:ring-dourado-foco resize-none"
            />
          </div>
          <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>
          <button
            type="submit"
            disabled={salvando}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-verde-petroleo px-6 py-3 font-bold text-white hover:bg-verde-hover disabled:opacity-60"
          >
            {salvando && <Loader2 size={16} className="animate-spin" />}
            {salvando ? 'Salvando…' : 'Salvar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AvaliacoesCliente() {
  const [pendentes, setPendentes] = useState([])
  const [minhasAvaliacoes, setMinhasAvaliacoes] = useState([])
  const [modalAvaliar, setModalAvaliar] = useState(null) // mentoria a avaliar
  const [modalEditar, setModalEditar] = useState(null)  // review a editar
  const [aba, setAba] = useState('pendentes')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      const [pendRes, minhasRes] = await Promise.allSettled([
        reviewService.getPending(),
        reviewService.getMy(),
      ])
      if (pendRes.status === 'fulfilled') {
        const lista = Array.isArray(pendRes.value)
          ? pendRes.value
          : (pendRes.value?.content ?? [])
        setPendentes(lista)
      }
      if (minhasRes.status === 'fulfilled') {
        const lista = Array.isArray(minhasRes.value)
          ? minhasRes.value
          : (minhasRes.value?.content ?? [])
        setMinhasAvaliacoes(lista)
      }
      setCarregando(false)
    }
    carregar()
  }, [])

  function aoSalvarAvaliacao(criada) {
    // Remove da lista de pendentes
    setPendentes((prev) => prev.filter((m) => m.id !== modalAvaliar.id))
    // Adiciona às minhas avaliações
    setMinhasAvaliacoes((prev) => [criada, ...prev])
    setModalAvaliar(null)
    setAba('minhas')
  }

  function aoSalvarEdicao(atualizada) {
    setMinhasAvaliacoes((prev) =>
      prev.map((r) => (r.id === atualizada.id ? atualizada : r)),
    )
    setModalEditar(null)
  }

  async function removerAvaliacao(id) {
    if (!window.confirm('Remover esta avaliação?')) return
    setErro('')
    const anterior = minhasAvaliacoes
    setMinhasAvaliacoes((prev) => prev.filter((r) => r.id !== id))
    try {
      await reviewService.delete(id)
    } catch (err) {
      const parsed = parseApiError(err, 'Não foi possível remover a avaliação.')
      setErro(parsed.message)
      setMinhasAvaliacoes(anterior)
    }
  }

  return (
    <div className="rounded-3xl border border-divisoria bg-white p-6 shadow-sm sm:p-8">
      <h2 className="font-titulo text-2xl font-bold text-verde-titulo">Avaliações</h2>
      <p className="mt-1 text-sm text-texto-secundario">
        Avalie suas mentorias concluídas e gerencie suas avaliações anteriores.
      </p>

      {/* Abas */}
      <div className="mt-5 flex gap-2">
        {[
          { id: 'pendentes', label: `Avaliar (${pendentes.length})` },
          { id: 'minhas', label: `Minhas avaliações (${minhasAvaliacoes.length})` },
        ].map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setAba(id)}
            className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
              aba === id
                ? 'border-verde-petroleo bg-verde-petroleo text-white'
                : 'border-divisoria bg-white text-verde-petroleo hover:bg-campo'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <AlertaFormulario tipo="erro">{erro}</AlertaFormulario>

      {carregando ? (
        <div className="mt-8 flex justify-center">
          <Loader2 className="animate-spin text-verde-petroleo" size={28} />
        </div>
      ) : aba === 'pendentes' ? (
        <div className="mt-5 space-y-4">
          {pendentes.length === 0 ? (
            <p className="text-center text-sm text-texto-secundario py-6">
              Nenhuma mentoria aguardando avaliação.
            </p>
          ) : (
            pendentes.map((mentoria) => (
              <div
                key={mentoria.id}
                className="flex items-center justify-between gap-4 rounded-2xl border border-divisoria p-5"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-verde-titulo truncate">
                    {mentoria.titulo ?? mentoria.title ?? 'Mentoria'}
                  </p>
                  <p className="mt-0.5 text-xs text-texto-secundario flex items-center gap-1">
                    <CalendarDays size={12} />
                    {mentoria.scheduledAt
                      ? new Date(mentoria.scheduledAt).toLocaleDateString('pt-BR')
                      : '—'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalAvaliar(mentoria)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-dourado px-4 py-2 text-sm font-bold text-verde-escuro hover:bg-dourado-claro"
                >
                  <Star size={15} />
                  Avaliar
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {minhasAvaliacoes.length === 0 ? (
            <p className="text-center text-sm text-texto-secundario py-6">
              Você ainda não fez nenhuma avaliação.
            </p>
          ) : (
            minhasAvaliacoes.map((r) => (
              <CardReview
                key={r.id}
                review={r}
                aoEditar={setModalEditar}
                aoRemover={removerAvaliacao}
              />
            ))
          )}
        </div>
      )}

      {/* Modais */}
      {modalAvaliar && (
        <ModalAvaliar
          mentoria={modalAvaliar}
          aoSalvar={aoSalvarAvaliacao}
          aoFechar={() => setModalAvaliar(null)}
        />
      )}
      {modalEditar && (
        <ModalEditar
          review={modalEditar}
          aoSalvar={aoSalvarEdicao}
          aoFechar={() => setModalEditar(null)}
        />
      )}
    </div>
  )
}
