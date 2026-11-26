import assert from 'node:assert/strict'
import test from 'node:test'
import { criarTratadorErroResposta, ehRequisicaoDeLogin } from './apiInterceptor.js'

test('identifica corretamente requisições de login', () => {
  assert.equal(ehRequisicaoDeLogin('/auth/login'), true)
  assert.equal(ehRequisicaoDeLogin('http://localhost:8080/api/v1/auth/login'), true)
  assert.equal(ehRequisicaoDeLogin('/users/me'), false)
  assert.equal(ehRequisicaoDeLogin('/mentorings/next'), false)
})

test('401 em rota protegida limpa sessão, marca expiração e redireciona para /login', async () => {
  let limpou = false
  let marcou = false
  let notificou = false
  let redirecionouPara = null

  const tratador = criarTratadorErroResposta({
    limparSessao: () => { limpou = true },
    marcarExpiracao: () => { marcou = true },
    notificarExpiracao: () => { notificou = true },
    redirecionarParaLogin: (destino) => { redirecionouPara = destino },
    obterCaminhoAtual: () => '/usuario/cliente',
  })

  await assert.rejects(() =>
    tratador({
      response: { status: 401 },
      config: { url: '/users/me' },
    }),
  )

  assert.equal(limpou, true)
  assert.equal(marcou, true)
  assert.equal(notificou, true)
  assert.equal(redirecionouPara, '/login?motivo=sessao-expirada')
})

test('401 no próprio login com senha errada não limpa nem redireciona', async () => {
  let limpou = false
  let redirecionou = false

  const tratador = criarTratadorErroResposta({
    limparSessao: () => { limpou = true },
    marcarExpiracao: () => {},
    notificarExpiracao: () => {},
    redirecionarParaLogin: () => { redirecionou = true },
    obterCaminhoAtual: () => '/login',
  })

  await assert.rejects(() =>
    tratador({
      response: { status: 401 },
      config: { url: '/auth/login' },
    }),
  )

  assert.equal(limpou, false)
  assert.equal(redirecionou, false)
})
