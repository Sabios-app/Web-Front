import { ArrowRight } from 'lucide-react'

export default function ProfileCard({ icon, iconStyle, title, description, linkText }) {
  return (
    <button className="flex flex-col justify-center gap-3 rounded-3xl bg-white p-6 text-left shadow-sm transition hover:shadow-md">
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconStyle}`}>
        {icon}
      </span>
      <h2 className="font-titulo text-xl text-verde-titulo">{title}</h2>
      <p className="text-sm text-texto-secundario">{description}</p>
      <span className="flex items-center gap-2 text-sm font-semibold text-dourado-escuro">
        {linkText} <ArrowRight size={16} />
      </span>
    </button>
  )
}