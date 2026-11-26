import assert from 'node:assert/strict'
import test from 'node:test'
import {
  extrairErrosDeCampo,
  formatarTempoEspera,
  parseApiError,
  parseRetryAfterSeconds,
} from './apiError.js'

test('extrai erros de campo no formato padrão para status 400', () => {
  const err = {
    response: {
      status: 400,
      data: {
        status: 400,
        code: 'VALIDATION_ERROR',
        message: 'Dados inválidos',
        errors: [
          { field: 'email', message: 'E-mail inválido' },
          { field: 'password', message: 'Senha muito curta' },
        ],
      },
    },
  }

  const parsed = parseApiError(err)
  assert.equal(parsed.status, 400)
  assert.equal(parsed.code, 'VALIDATION_ERROR')

  const { errosCampos, mensagemGeral } = extrairErrosDeCampo(
    parsed,
    { password: 'senha' },
    ['email', 'senha'],
  )

  assert.deepEqual(errosCampos, {
    email: 'E-mail inválido',
    senha: 'Senha muito curta',
  })
  assert.equal(mensagemGeral, '')
})

test('exibe message geral quando status não é 400', () => {
  const err = {
    response: {
      status: 401,
      data: {
        status: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'E-mail ou senha incorretos.',
        errors: [],
      },
    },
  }

  const parsed = parseApiError(err)
  const { errosCampos, mensagemGeral } = extrairErrosDeCampo(
    parsed,
    { password: 'senha' },
    ['email', 'senha'],
  )

  assert.deepEqual(errosCampos, {})
  assert.equal(mensagemGeral, 'E-mail ou senha incorretos.')
})

test('interpreta Retry-After numérico e data HTTP em respostas 429', () => {
  assert.equal(parseRetryAfterSeconds({ 'retry-after': '900' }), 900)
  assert.equal(formatarTempoEspera(900), '15 minutos')

  const agora = Date.UTC(2026, 10, 26, 12, 0, 0)
  const futuro = new Date(agora + 45_000).toUTCString()
  assert.equal(parseRetryAfterSeconds({ 'Retry-After': futuro }, agora), 45)
  assert.equal(formatarTempoEspera(45), '45 segundos')

  const err429 = {
    response: {
      status: 429,
      headers: { 'retry-after': '120' },
      data: {
        status: 429,
        code: 'TOO_MANY_REQUESTS',
        message: 'Muitas tentativas. Aguarde antes de tentar novamente.',
        errors: [],
      },
    },
  }

  const parsed = parseApiError(err429)
  assert.equal(parsed.status, 429)
  assert.equal(parsed.retryAfterSeconds, 120)
  assert.equal(parsed.message, 'Muitas tentativas. Aguarde antes de tentar novamente.')
})
