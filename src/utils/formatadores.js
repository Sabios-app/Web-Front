export function formatarReais(valor) {
  const numero = Number(valor)
  if (!Number.isFinite(numero)) return 'R$ 0'
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  })
}

export function formatarNota(nota) {
  const numero = Number(nota)
  if (!Number.isFinite(numero)) return '5,0'
  return numero.toFixed(1).replace('.', ',')
}

export function formatarDataBR(isoDate) {
  if (!isoDate) return 'Data a definir'
  const data = new Date(isoDate)
  if (Number.isNaN(data.getTime())) return 'Data a definir'
  return data.toLocaleDateString('pt-BR')
}

export function formatarHoraBR(isoDate) {
  if (!isoDate) return '--:--'
  const data = new Date(isoDate)
  if (Number.isNaN(data.getTime())) return '--:--'
  return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
