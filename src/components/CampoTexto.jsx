export default function CampoTexto({
  id,
  rotulo,
  placeholder,
  valor,
  aoMudar,
  obrigatorio,
  type = 'text',
  erro = '',
}) {
  const erroId = erro ? `${id}-erro` : undefined

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-bold text-verde-titulo">
        {rotulo}
      </label>
      <input
        id={id}
        type={type}
        value={valor}
        onChange={aoMudar}
        placeholder={placeholder}
        required={obrigatorio}
        aria-invalid={Boolean(erro)}
        aria-describedby={erroId}
        className={`h-14 w-full rounded-xl border bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 transition-all duration-200 focus:outline-none! focus:ring-2 focus:ring-offset-0 ${
          erro
            ? 'border-red-500 focus:border-red-600 focus:ring-red-200'
            : 'border-divisoria focus:border-dourado-foco focus:ring-dourado-foco/15'
        }`}
      />
      {erro && (
        <p id={erroId} role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
          {erro}
        </p>
      )}
    </div>
  )
}
