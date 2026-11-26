import { CalendarCheck, DollarSign, Star, Users } from 'lucide-react'
import { formatarNota, formatarReais } from '../../../utils/formatadores'

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
    <dl
      aria-label="Métricas de desempenho"
      className="grid grid-cols-1 gap-2 rounded-2xl border border-divisoria bg-white p-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((c) => {
        const Icone = c.icone
        return (
          <div
            key={c.titulo}
            className="flex min-w-0 items-center gap-3 rounded-xl px-2 py-3"
          >
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.corIcone}`}>
              <Icone size={21} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <dt className="text-xs font-bold uppercase tracking-wider text-texto-secundario">
                {c.titulo}
              </dt>
              <dd className="font-titulo text-xl font-bold text-verde-titulo">
                {c.valor}
              </dd>
              <dd className="text-xs text-texto-secundario">{c.detalhe}</dd>
            </div>
          </div>
        )
      })}
    </dl>
  )
}
