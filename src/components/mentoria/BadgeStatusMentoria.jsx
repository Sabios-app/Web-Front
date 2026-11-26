import { obterInfoStatusMentoria } from '../../utils/mentoriaStatus'

export default function BadgeStatusMentoria({ status }) {
  if (!status) return null
  const info = obterInfoStatusMentoria(status)

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${info.classeBadge}`}
    >
      {info.rotulo}
    </span>
  )
}
