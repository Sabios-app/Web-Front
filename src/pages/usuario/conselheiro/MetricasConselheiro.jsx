import { CalendarCheck, DollarSign, Star, Users } from 'lucide-react'
import { formatarNota, formatarReais } from '../../../data/especialistas'

export default function MetricasConselheiro({ metricas }) {
  const cards = [
    {
      titulo: 'Mentorias Realizadas',
      valor: metricas.totalSessoes,
      detalhe: 'Sessões completas de 1h',
      icone: CalendarCheck,
      corIcone: 'bg-emerald-50 text-emerald-800',
    },
    {
      titulo: 'Avaliação Média',
      valor: `${formatarNota(metricas.notaMedia)} ★`,
      detalhe: `${metricas.totalAvaliacoes} avaliações 5 estrelas`,
      icone: Star,
      corIcone: 'bg-dourado-aviso text-dourado-escuro',
    },
    {
      titulo: 'Negócios Apoiados',
      valor: metricas.empreendedoresApoiados,
      detalhe: 'Pequenos empreendedores',
      icone: Users,
      corIcone: 'bg-blue-50 text-blue-800',
    },
    {
      titulo: 'Ganhos no Mês',
      valor: formatarReais(metricas.ganhosMes),
      detalhe: 'R$ 180 por mentoria',
      icone: DollarSign,
      corIcone: 'bg-amber-50 text-amber-800',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icone = c.icone
        return (
          <div
            key={c.titulo}
            className="flex items-center gap-4 rounded-2xl border border-divisoria bg-white p-5 shadow-sm"
          >
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${c.corIcone}`}>
              <Icone size={26} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-texto-secundario">
                {c.titulo}
              </p>
              <p className="font-titulo text-2xl font-bold text-verde-titulo sm:text-3xl">
                {c.valor}
              </p>
              <p className="text-xs text-texto-secundario">{c.detalhe}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
