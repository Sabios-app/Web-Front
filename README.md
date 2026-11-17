# Sábios App - Web Frontend

Aplicação web desenvolvida com **React 19**, **Vite** e **Tailwind CSS**, estruturada com arquitetura modular para desenvolvimento colaborativo em equipe.

---

## 📚 Documentação do projeto

Consulte os documentos abaixo para acompanhar o estado atual e a integração planejada:

- [Atualização do projeto](./update.md) — alterações realizadas, pendências e próximas tarefas do frontend.
- [Integração Web, Mobile e Backend](./integracao-web-mobile-backend.md) — funcionamento das rotas, API Spring Boot, autenticação e responsabilidades de cada aplicação.

---

## 🚀 Tecnologias

- **React 19**
- **Vite 8**
- **Tailwind CSS v4** (com `@tailwindcss/postcss`)
- **ESLint** (com regras para React Hooks e React Refresh)

---

## 🎨 Tailwind CSS (Configuração Global)

> **Importante para a equipe:**
> O **Tailwind CSS já está 100% configurado globalmente** no projeto através do arquivo `src/index.css` (`@import "tailwindcss";`) e integrado ao PostCSS.
> 
> **Não é necessário instalar nem configurar nada adicional de estilos.** Todos os membros da equipe podem utilizar diretamente as classes utilitárias do Tailwind em qualquer componente JSX (`className="..."`).

### Exemplo de uso:
```jsx
export function ActionCard({ title, description, onClick }) {
  return (
    <div className="flex flex-col gap-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      <button
        onClick={onClick}
        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
      >
        Acessar
      </button>
    </div>
  );
}
```

---

## 📁 Estrutura de Pastas e Arquitetura

O projeto já conta com diretórios pré-configurados que definem a separação de responsabilidades. A equipe deve seguir rigorosamente essa estrutura:

```text
Web-Front/
├── public/                 # Arquivos públicos estáticos (ícones SVG, favicons)
├── src/
│   ├── assets/             # Imagens locais, ilustrações e recursos estáticos importados no código
│   ├── components/         # Componentes reutilizáveis e modulares
│   │   ├── feedback/       # Alertas, mensagens e blocos informativos
│   │   ├── forms/          # Campos, seleções e controles de formulário
│   │   ├── layout/         # Container e estruturas visuais reutilizáveis
│   │   └── navigation/     # Abas, links e controles de navegação
│   ├── layouts/            # Estruturas base de layout (Header, Sidebar, Footer, MainLayout, AuthLayout)
│   ├── pages/              # Páginas e telas da aplicação, organizadas por fluxo e perfil
│   │   ├── home/            # Seções exclusivas da página inicial
│   │   ├── perfil/          # Componentes exclusivos do perfil do especialista
│   │   └── usuario/         # Componentes exclusivos das áreas de usuário
│   ├── contexts/           # Estado global compartilhado por provedores React
│   ├── data/                # Mocks, dados locais e funções de formatação
│   ├── hooks/               # Hooks reutilizáveis
│   ├── routes/             # Definição e configuração de rotas e navegação da aplicação
│   ├── App.jsx             # Componente raiz / casca da aplicação
│   ├── index.css           # Estilos globais e importação do Tailwind CSS (@import "tailwindcss";)
│   └── main.jsx            # Ponto de entrada React (renderização no DOM)
├── eslint.config.js        # Regras de linting do projeto
├── package.json            # Dependências e scripts do projeto
├── postcss.config.js       # Configuração do PostCSS para Tailwind
└── vite.config.js          # Configurações do Vite
```

### Organização da área de usuário

A área autenticada segue uma separação por responsabilidade:

```text
src/
├── components/usuario/     # Itens reutilizáveis da navegação e conta
├── data/menusUsuario.js    # Menus e metadados de navegação por perfil
├── layouts/                # Composição da barra lateral e cabeçalho autenticado
└── pages/usuario/
    ├── cliente/            # Conteúdos exclusivos do cliente
    ├── conselheiro/        # Conteúdos exclusivos do conselheiro
    └── compartilhado/      # Conteúdos usados pelos dois perfis
```

`AreaUsuarioLayout` deve apenas compor o layout e controlar a sessão. A regra de
menu fica em `data/menusUsuario.js`, enquanto cada conteúdo de seção deve ficar
em sua pasta de perfil ou em `pages/usuario/compartilhado/` quando for comum.

### Áreas autenticadas

Cliente e conselheiro possuem áreas independentes:

- `/usuario/cliente`: acessível somente para o perfil `cliente`.
- `/usuario/conselheiro`: acessível somente para o perfil `conselheiro`.
- `src/contexts/AuthContext.js` mantém o perfil da sessão.
- `src/routes/RotaProtegida.jsx` bloqueia acesso à área do perfil incorreto.

Ao adicionar uma nova tela autenticada, ela deve ser registrada em `src/routes/`
com `RotaProtegida` e o perfil esperado. O cabeçalho não deve oferecer links
para trocar diretamente de área; a troca de perfil deve ocorrer por logout e
novo login.

### Regra de decisão: `components/` ou `pages/`

- Coloque em `src/components/` tudo que puder ser utilizado por duas ou mais páginas
  ou que represente um padrão visual do produto.
- Coloque em uma subpasta de `src/pages/` os componentes exclusivos de um fluxo ou
  de uma tela, como uma seção da home ou um bloco específico do painel.
- Uma página deve montar o fluxo e o estado da tela. Ela não deve concentrar markup
  repetido que possa ser extraído para um componente reutilizável.
- Dados mockados e funções de formatação ficam em `src/data/`. Hooks ficam em
  `src/hooks/` e contextos globais ficam em `src/contexts/`.

### Organização dos componentes compartilhados

Os componentes compartilhados devem ser agrupados por responsabilidade:

```text
src/components/
├── feedback/      # BlocoDicas, Alertas e estados de retorno
├── forms/         # CampoTexto, SelecaoOpcoes e controles de entrada
├── layout/        # Container e componentes de composição visual
└── navigation/    # NavegacaoAbas e componentes de navegação
```

Use `PascalCase` para o nome do arquivo e do componente. Prefira props descritivas
e mantenha o componente sem conhecimento de regras específicas de uma página.

---

## 🛡️ Boas Práticas Obrigatórias do Projeto

Todos os 3 desenvolvedores devem seguir os padrões já aplicados no repositório:

### 1. Componentização e Nomenclatura
- **PascalCase** para componentes e seus arquivos: `Button.jsx`, `UserCard.jsx`, `DashboardPage.jsx`.
- **camelCase** para funções utilitárias, hooks e variáveis: `useAuth.js`, `formatCurrency.js`.
- Componentes funcionais com Hooks (`useState`, `useEffect`, etc.).
- **Responsabilidade Única:** Evite arquivos de páginas gigantescos; quebre seções complexas em componentes menores dentro de `src/components/` ou em pastas dedicadas dentro de `src/pages/`.
- Componentes compartilhados devem ser extraídos quando o mesmo padrão aparecer em
  mais de uma página. Exemplos atuais: `Container`, `NavegacaoAbas`, `BlocoDicas` e
  `SelecaoOpcoes`.

### 2. Estilização com Tailwind CSS
- **Priorize classes nativas do Tailwind**: evite criar arquivos `.css` individuais por componente ou usar `style={{ ... }}` inline.
- Utilize as variantes responsivas do Tailwind (`sm:`, `md:`, `lg:`, `xl:`).
- Mantenha suporte ou consistência com temas (ex.: classes `dark:` onde aplicável).
- Evite classes redundantes ou conflitantes.

### 3. Separação de Camadas
- **`pages/`** montam e orquestram a tela, chamando os componentes e organizando o fluxo.
- **`components/`** devem ser reutilizáveis e receber dados preferencialmente via `props`.
- **`layouts/`** mantêm a estrutura fixa (menus, cabeçalhos, rodapés) e recebem o conteúdo das páginas através do roteador.

### 4. Qualidade e Verificação Contínua
Antes de abrir qualquer Pull Request ou realizar commit:
- Execute o linter e garanta que não há erros de sintaxe ou de hooks:
  ```bash
  npm run lint
  ```
- Valide se o build de produção executa sem quebras:
  ```bash
  npm run build
  ```

---

## 🌿 Fluxo Git e Colaboração da Equipe

Para garantir estabilidade da branch `main`:

1. **Branches por Funcionalidade:**
   - Crie sempre uma branch a partir da `main` atualizada:
     - `feat/nome-da-pagina` (ex.: `feat/login-page`, `feat/dashboard-metrics`)
     - `fix/descricao-do-ajuste` (ex.: `fix/sidebar-responsive`)
2. **Commits Claros e Descritivos:**
   - Exemplo: `feat: add login page with validation` ou `feat: implement dashboard layout`.
3. **Pull Requests e Revisão por Pares (Code Review):**
   - Nunca faça push direto na `main`.
   - Abra um Pull Request e peça a revisão de ao menos um dos outros 2 membros da equipe.
   - Certifique-se de que `npm run lint` e `npm run build` passaram com sucesso antes de realizar o merge.

---

## 🛠️ Comandos do Projeto

| Comando | Descrição |
| :--- | :--- |
| `npm install` | Instala todas as dependências do projeto |
| `npm run dev` | Inicia o servidor de desenvolvimento Vite local com HMR |
| `npm run build` | Compila o projeto para produção na pasta `dist/` |
| `npm run preview` | Executa localmente o build de produção para teste |
| `npm run lint` | Executa o ESLint para validar boas práticas e regras de código |
