import assert from 'node:assert/strict'
import test from 'node:test'
import { aplicarTema, lerTema, salvarTema } from './TemaPreferencia.js'

function criarArmazenamento() {
  const valores = new Map()
  return {
    getItem(chave) {
      return valores.get(chave) ?? null
    },
    setItem(chave, valor) {
      valores.set(chave, valor)
    },
  }
}

test('carrega o tema escuro salvo no navegador', () => {
  const armazenamento = criarArmazenamento()
  armazenamento.setItem('sabios:tema', 'escuro')

  assert.equal(lerTema(armazenamento), 'escuro')
})

test('mantém o tema claro quando não há uma preferência escura válida', () => {
  const armazenamento = criarArmazenamento()
  armazenamento.setItem('sabios:tema', 'outro')

  assert.equal(lerTema(armazenamento), 'claro')
})

test('salva a escolha do tema para a próxima visita', () => {
  const armazenamento = criarArmazenamento()

  salvarTema('escuro', armazenamento)

  assert.equal(armazenamento.getItem('sabios:tema'), 'escuro')
})

test('aplica e remove o atributo do tema no elemento raiz', () => {
  const atributos = new Map()
  const raiz = {
    setAttribute(nome, valor) {
      atributos.set(nome, valor)
    },
    removeAttribute(nome) {
      atributos.delete(nome)
    },
  }

  aplicarTema(raiz, 'escuro')
  assert.equal(atributos.get('data-tema'), 'escuro')

  aplicarTema(raiz, 'claro')
  assert.equal(atributos.has('data-tema'), false)
})

test('continua com tema claro quando o navegador bloqueia o armazenamento', () => {
  const armazenamentoIndisponivel = {
    getItem() {
      throw new Error('Armazenamento indisponível')
    },
  }

  assert.equal(lerTema(armazenamentoIndisponivel), 'claro')
  assert.doesNotThrow(() => salvarTema('escuro', armazenamentoIndisponivel))
})
