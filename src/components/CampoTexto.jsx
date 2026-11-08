export default function CampoTexto({ id, rotulo, placeholder, valor, aoMudar, obrigatorio }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-bold text-verde-titulo">
        {rotulo}
      </label>
      <input
        id={id}
        type="text"
        value={valor}
        onChange={aoMudar}
        placeholder={placeholder}
        required={obrigatorio}
        className="h-14 w-full rounded-xl border border-divisoria bg-white px-4 text-lg text-verde-petroleo placeholder:text-texto-secundario/70 focus:border-dourado-foco focus:outline-none focus:ring-2 focus:ring-dourado-foco/30"
      />
    </div>
  )
}