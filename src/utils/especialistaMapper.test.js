import assert from 'node:assert/strict'
import test from 'node:test'
import {
  mapearAvaliacaoApi,
  mapearEspecialistaApi,
  mapearMentoriaApi,
} from './especialistaMapper.js'

test('mapeia specialist.user e review.client sem ler email, phone ou role', () => {
  const specialistDto = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    specialty: 'Finanças & Gestão, Precificação',
    bio: 'Apoio a pequenos negócios.',
    hourlyRate: 180,
    rating: 4.9,
    totalReviews: 12,
    user: {
      id: 'user-uuid-1',
      name: 'Helena Martins',
      avatarUrl: 'https://example.com/helena.jpg',
    },
    reviews: [
      {
        id: 'rev-1',
        rating: 5,
        comment: 'Excelente mentoria!',
        client: {
          name: 'Marcos Ribeiro',
          avatarUrl: 'https://example.com/marcos.jpg',
        },
      },
    ],
  }

  const mapped = mapearEspecialistaApi(specialistDto)
  assert.equal(mapped.id, '550e8400-e29b-41d4-a716-446655440000')
  assert.equal(mapped.userId, 'user-uuid-1')
  assert.equal(mapped.nome, 'Helena Martins')
  assert.equal(mapped.foto, 'https://example.com/helena.jpg')
  assert.equal(mapped.avaliacoes.length, 1)
  assert.equal(mapped.avaliacoes[0].autor, 'Marcos Ribeiro')
  assert.equal(mapped.avaliacoes[0].avatarUrl, 'https://example.com/marcos.jpg')

  const reviewOnly = mapearAvaliacaoApi({
    rating: 4,
    comment: 'Muito bom',
    client: { name: 'Ana', avatarUrl: null },
  })
  assert.equal(reviewOnly.autor, 'Ana')
})

test('mantém linkChamada como null quando meetingLink vem null da API', () => {
  const mentoria = mapearMentoriaApi({
    id: 'ment-uuid-1',
    status: 'EXPIRED',
    scheduledAt: '2026-11-26T14:00:00Z',
    meetingLink: null,
    title: 'Fluxo de caixa',
    specialist: {
      id: 'spec-uuid-1',
      specialty: 'Finanças',
      user: {
        id: 'user-uuid-1',
        name: 'Helena Martins',
        avatarUrl: 'https://example.com/helena.jpg',
      },
    },
  })

  assert.equal(mentoria.linkChamada, null)
  assert.equal(mentoria.status, 'EXPIRED')
  assert.equal(mentoria.statusRotulo, 'Expirada')
  assert.equal(mentoria.especialistaNome, 'Helena Martins')
})
