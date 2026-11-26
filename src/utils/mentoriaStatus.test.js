import assert from 'node:assert/strict'
import test from 'node:test'
import {
  OPCOES_FILTRO_MENTORIA,
  STATUS_MENTORIA,
  filtrarMentoriasPorStatus,
  obterInfoStatusMentoria,
} from './mentoriaStatus.js'

test('inclui EXPIRED junto com todos os demais status nos rótulos e filtros', () => {
  const valoresFiltro = OPCOES_FILTRO_MENTORIA.map((o) => o.valor)
  assert.deepEqual(valoresFiltro, [
    'ALL',
    'REQUESTED',
    'CONFIRMED',
    'COMPLETED',
    'REJECTED',
    'CANCELED',
    'EXPIRED',
  ])

  assert.equal(obterInfoStatusMentoria(STATUS_MENTORIA.REQUESTED).rotulo, 'Solicitada')
  assert.equal(obterInfoStatusMentoria(STATUS_MENTORIA.CONFIRMED).rotulo, 'Confirmada')
  assert.equal(obterInfoStatusMentoria(STATUS_MENTORIA.COMPLETED).rotulo, 'Concluída')
  assert.equal(obterInfoStatusMentoria(STATUS_MENTORIA.REJECTED).rotulo, 'Recusada')
  assert.equal(obterInfoStatusMentoria(STATUS_MENTORIA.CANCELED).rotulo, 'Cancelada')

  const expiredInfo = obterInfoStatusMentoria(STATUS_MENTORIA.EXPIRED)
  assert.equal(expiredInfo.rotulo, 'Expirada')
  assert.equal(expiredInfo.encerrada, true)
})

test('filtra mentorias por status incluindo EXPIRED', () => {
  const mentorias = [
    { id: '1', status: 'REQUESTED' },
    { id: '2', status: 'CONFIRMED' },
    { id: '3', status: 'EXPIRED' },
    { id: '4', status: 'COMPLETED' },
  ]

  assert.equal(filtrarMentoriasPorStatus(mentorias, 'ALL').length, 4)
  assert.deepEqual(
    filtrarMentoriasPorStatus(mentorias, 'EXPIRED').map((m) => m.id),
    ['3'],
  )
})
