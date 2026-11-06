/** Caixa branca com título, usada nas seções da página de perfil. */
export default function CartaoSecao({ titulo, children }) {
  const idTitulo = `secao-${titulo.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <section aria-labelledby={idTitulo} className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 id={idTitulo} className="font-titulo text-2xl text-verde-titulo sm:text-3xl">
        {titulo}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
