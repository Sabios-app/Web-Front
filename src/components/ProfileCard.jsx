import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function ProfileCard({
  icon,
  iconStyle,
  title,
  description,
  linkText,
  to,
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`group flex flex-col justify-center gap-3 rounded-3xl border border-transparent bg-white p-6 text-left shadow-sm transition duration-500 ease-suave will-change-transform hover:-translate-y-2 hover:border-dourado hover:shadow-lg focus-visible:border-dourado ${className}`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconStyle}`}
      >
        {icon}
      </span>
      <h2 className="font-titulo text-xl text-verde-titulo">{title}</h2>
      <p className="text-sm text-texto-secundario">{description}</p>
      <span className="flex items-center gap-2 text-sm font-semibold text-dourado-texto">
        {linkText}
        <ArrowRight
          size={16}
          className="shrink-0 transition-transform duration-500 ease-suave group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      </span>
    </Link>
  );
}