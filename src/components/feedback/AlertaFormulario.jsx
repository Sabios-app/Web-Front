export default function AlertaFormulario({ tipo = 'erro', children }) {
  if (!children) return null

  const estilos =
    tipo === 'aviso'
      ? 'border-amber-300 bg-amber-50 text-amber-900'
      : 'border-red-200 bg-red-50 text-red-700'

  return (
    <div
      role={tipo === 'erro' ? 'alert' : 'status'}
      className={`mt-4 rounded-xl border p-3.5 text-sm font-medium ${estilos}`}
    >
      {children}
    </div>
  )
}
