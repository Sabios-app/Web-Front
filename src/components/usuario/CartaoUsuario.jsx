export default function CartaoUsuario({ usuario, tipoUsuario }) {
  return (
    <div className="mb-8 flex items-center gap-3 rounded-3xl bg-white/10 p-4">
      <img src={usuario.foto} alt="" className="h-14 w-14 rounded-full object-cover" />
      <div className="min-w-0">
        <p className="truncate font-bold">{usuario.nome}</p>
        <p className="truncate text-sm text-white/65">
          {tipoUsuario} {usuario.negocio ? `• ${usuario.negocio}` : `• ${usuario.area}`}
        </p>
      </div>
    </div>
  )
}
