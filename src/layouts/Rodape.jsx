import { Link } from 'react-router-dom'

export default function Rodape() {
  return (
    <footer className="bg-verde-escuro text-white">
      <div className="mx-auto flex max-w-310 flex-col gap-5 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="flex items-center gap-3">
          <span className="font-titulo text-3xl font-semibold">sábios</span>
          <span aria-hidden="true" className="h-6 w-px bg-white/30" />
          <span className="text-white/80">Experiência que transforma</span>
        </p>
        <p className="text-white/80">© {new Date().getFullYear()} Sábios. Feito para aproximar gerações.</p>
        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
            <li>
              <Link to="/ajuda" className="text-white underline-offset-4 hover:underline">
                Ajuda
              </Link>
            </li>
            <li>
              <Link to="/privacidade" className="text-white underline-offset-4 hover:underline">
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
