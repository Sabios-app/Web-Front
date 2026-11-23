# Seta de Continuacao da Home Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Adicionar uma seta animada e acessivel que indique que a pagina continua para baixo.

**Architecture:** A mudanca sera concentrada em SecaoInicio.jsx, usando o componente ChevronDown do Lucide ja instalado e uma classe Tailwind com animacao de entrada/descida. A navegacao sera um link normal para `#como-funciona`, preservando o comportamento sem JavaScript adicional.

**Tech Stack:** React, Tailwind CSS, Lucide React.

**Spec:** Pedido aprovado pelo usuario na conversa de 2026-11-23.

## Global Constraints

- Preservar a composicao modular atual.
- Usar os nomes de cor e padroes visuais ja definidos no projeto.
- Respeitar `prefers-reduced-motion`.
- Manter o link acessivel por teclado e com rotulo claro.

## Review Focus

- Movimento reduzido: a seta nao deve continuar animada quando `prefers-reduced-motion` estiver ativo.
- Navegacao por teclado: o link deve ser descobrivel e receber foco visivel.
- Layout mobile: a seta nao pode sobrepor conteudo ou quebrar o grid.
- Estrutura sem semantica: o link deve apontar para uma secao existente.
- Contraste: o circulo e o icone devem permanecer legiveis nas cores existentes.

---

### Task 1: Adicionar a seta de continuidade

**Files:**
- Modify: `src/pages/home/SecaoInicio.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: secao `#como-funciona` existente.
- Produces: um link circular e animado com a rota visual `#como-funciona`.

- [ ] **Step 1: Importar `ChevronDown` no componente**

Adicionar `ChevronDown` ao import existente do Lucide.

- [ ] **Step 2: Registrar a animacao no tema Tailwind**

Adicionar uma animacao curta chamada `seta-scroll` ao bloco `@theme` em `src/index.css`, com os estados `0`, `50%` e `100%`.

- [ ] **Step 3: Adicionar o link apos o grid da secao**

Posicionar o link na parte inferior central da secao, com circulo, borda, fundo creme e icone dourado. O link deve:
- apontar para `#como-funciona`;
- usar `aria-label="Ir para a secao Como funciona"`;
- aplicar `motion-safe:animate-seta-scroll`;
- desativar movimento com `motion-reduce:animate-none`.

- [ ] **Step 4: Verificar build e lint**

Executar o build e o lint do projeto.

- [ ] **Step 5: Revisar o diff**

Confirmar que somente os arquivos relacionados foram alterados e que o link aponta para uma secao existente.
