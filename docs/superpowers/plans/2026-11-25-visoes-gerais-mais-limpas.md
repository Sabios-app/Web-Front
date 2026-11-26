# Cleaner Overview Screens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce visual overload on the logged-in client and counselor overview pages while preserving their content and making motion calmer.

**Architecture:** Keep the existing page/component split. Use native disclosure elements for secondary information, compact the counselor metrics in their current component, and tune the shared entry animation and reduced-motion handling in the global stylesheet.

**Tech Stack:** React, Tailwind CSS 4, CSS, Vite.

**Spec:** `docs/superpowers/specs/2026-11-25-visoes-gerais-mais-limpas-design.md`

## Global Constraints

- Preservar dados, ações e navegação atuais; alterar apenas sua hierarquia e apresentação nas visões gerais.
- Não alterar autenticação, conteúdo de negócio, rotas ou o comportamento das demais páginas.
- Usar os componentes e estilos existentes, sem adicionar dependências.
- Manter os blocos secundários recolhidos inicialmente, sem ocultar controles essenciais de ação.
- Expansões devem continuar navegáveis por teclado e identificáveis por leitores de tela.

## Review Focus

- A ausência de mentoria/sessão não pode impedir a renderização dos resumos ou das abas.
- Em telas estreitas, resumos, contadores e controles não devem transbordar nem ficar ilegíveis.
- Conteúdo recolhido deve continuar acessível por teclado e com semântica anunciável.
- A preferência por movimento reduzido deve desativar deslocamentos/entradas, não apenas transições.
- Métricas e interações existentes (tarefas, perguntas, disponibilidade e abas) devem manter seus dados e ações.

---

### Task 1: Shared details and motion

**Files:**
- Modify: `src/components/feedback/BlocoDicas.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Keep the existing `BlocoDicas({ titulo, dicas })` interface.
- Keep the existing `animate-aparecer` utility name for current callers.

- [x] **Step 1: Make tips a native, initially closed disclosure**

Wrap the tips heading and list in `<details>` with a `<summary>` named by the existing `titulo`. Preserve the existing `dicas` rendering and visual theme. Use focus-visible styling consistent with the project.

- [x] **Step 2: Tune the shared entry motion**

Set `--animate-aparecer` to a restrained 0.5-second fade with a 6px maximum vertical offset and the existing `--ease-suave` curve. Under `prefers-reduced-motion: reduce`, disable animations as well as transitions and set scrolling to auto.

- [x] **Step 3: Run static validation**

Run: `npm run lint` and `npm run build`
Expected: both commands exit successfully.

### Task 2: Client overview hierarchy

**Files:**
- Modify: `src/pages/UsuarioClientePage.jsx`
- Modify: `src/pages/usuario/cliente/ProximaMentoriaCliente.jsx`
- Modify: `src/pages/usuario/cliente/PlanoDeAcaoCliente.jsx`

**Interfaces:**
- Keep existing component props unchanged.
- Keep the client’s recommendations and history in their existing tabs.

- [x] **Step 1: Keep the next mentorship primary and collapse preparation details**

Keep the counselor, date/time, topic, and call/profile actions visible. Put the annotated-question list and add-question form in a native `<details>` initially closed, with its summary indicating the number of saved questions.

- [x] **Step 2: Make the action plan a compact summary**

Show the title and completed/total progress by default. Put the task list, progress bar, and add-task form inside an initially closed native `<details>`. Keep task completion and addition behavior unchanged.

- [x] **Step 3: Reduce client entry animation staggering**

Use the shared `motion-safe:animate-aparecer` utility on the page’s major sections with no more than 100ms between successive sections. Keep content visible when motion is reduced.

- [x] **Step 4: Validate client interactions and responsiveness**

Run: `npm run lint` and `npm run build`, then inspect the client overview at desktop and narrow viewport widths.
Expected: summaries begin closed, expand with keyboard and pointer, and the next-session call action remains visible; no overflow or content loss.

### Task 3: Counselor overview hierarchy

**Files:**
- Modify: `src/pages/UsuarioConselheiroPage.jsx`
- Modify: `src/pages/usuario/conselheiro/MetricasConselheiro.jsx`

**Interfaces:**
- Keep existing props and the counselor’s existing management tabs unchanged.
- Keep all four metric values, labels, and detail captions.

- [x] **Step 1: Compact the four metric cards**

Replace the four prominent cards with a visually compact, responsive summary that retains each metric’s label, value, and detail caption. Reduce visual weight through a lighter layout, not by removing information.

- [x] **Step 2: Apply restrained entry motion to counselor overview sections**

Apply the shared entry utility to the counselor’s major sections with at most 100ms between successive sections. Leave the existing next-session notes disclosure and management tabs intact.

- [x] **Step 3: Validate counselor interactions and responsiveness**

Run: `npm run lint` and `npm run build`, then inspect the counselor overview at desktop and narrow viewport widths.
Expected: all four metric values remain readable; availability controls, next-session actions, and all management tabs continue working; reduced-motion mode has no entry movement.
