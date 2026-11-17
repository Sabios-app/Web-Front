# Sábios App - Web Frontend

Aplicação web desenvolvida com **React 19**, **Vite** e **Tailwind CSS**, estruturada com arquitetura modular para desenvolvimento colaborativo em equipe.

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
│   ├── components/         # Componentes reutilizáveis e modulares (incluindo componentes da área de usuário)
│   ├── layouts/            # Estruturas base de layout (Header, Sidebar, Footer, MainLayout, AuthLayout)
│   ├── pages/              # Páginas e telas da aplicação, organizadas por fluxo e perfil
│   ├── contexts/           # Estado global compartilhado por provedores React
│   ├── data/               # Mocks, dados locais e funções de formatação
│   ├── hooks/              # Hooks reutilizáveis
│   ├── routes/             # Definição e configuração de rotas e navegação da aplicação
│   ├── App.css             # Estilos de apoio legados (priorizar Tailwind)
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

---

## 📋 O Que a Equipe (3 Pessoas) Precisa para Desenvolver as Páginas

Para que os 3 desenvolvedores iniciem e entreguem as páginas com eficiência e sem atritos, precisamos definir os seguintes insumos:

### 1. Mapa de Páginas e Rotas (Escopo)
- Lista exata das páginas a serem criadas (exemplo: `Login`, `Dashboard`, `Listagem`, `Cadastro/Edição`, `Perfil`).
- Endereços de rota esperados (ex.: `/login`, `/dashboard`, `/usuarios`, etc.).
- Comportamento de navegação (rotas públicas vs. rotas autenticadas/protegidas).

### 2. Definição do Roteador (`react-router-dom`)
- A pasta `src/routes/` já está criada. Para habilitar a troca de páginas, a equipe precisa adotar a biblioteca de rotas (ex.: instalar `react-router-dom`) e centralizar o roteamento em `src/routes/index.jsx` (ou `AppRoutes.jsx`).

### 3. Protótipos de Design / Telas (Figma ou Wireframes)
- Telas desenhadas com estados visuais: carregamento (*loading*), tela vazia (*empty state*), sucesso e erro.
- Guia visual de espaçamentos, tipografia e paleta de cores para alinhamento com o Tailwind.
- Diretrizes de responsividade (visualização mobile vs. desktop).

### 4. Contratos de API / Mocks de Dados
- Formato dos dados que cada página irá consumir do `Api-Backend` (campos esperados em requisições/respostas).
- Caso o backend ainda esteja em desenvolvimento, a equipe pode utilizar mocks locais (dados estáticos em JSON) para construir as interfaces sem bloqueios.

### 5. Divisão de Trabalho Sugerida para 3 Pessoas
Para evitar conflitos de merge e retrabalho, recomenda-se organizar a equipe em frentes paralelas:
- **Dev 1 (Fundação & Layouts):**
  - Configuração do roteador (`src/routes/`).
  - Criação dos layouts base em `src/layouts/` (Navbar, Sidebar, Footer, wrappers com `<Outlet />`).
  - Páginas de autenticação / entrada (ex.: Login, Recuperação de Senha).
- **Dev 2 (Páginas Principais / Fluxo Central):**
  - Construção das telas centrais do sistema em `src/pages/` (ex.: Dashboard, Visão Geral, Relatórios).
  - Componentes específicos dessas telas.
- **Dev 3 (Formulários, Listagens & Componentes Reutilizáveis):**
  - Criação do design system compartilhado em `src/components/` (Input, Button, Modal, Table/Grid, Badge).
  - Páginas de cadastro, listagens de dados e formulários em `src/pages/`.

---

## 🛡️ Boas Práticas Obrigatórias do Projeto

Todos os 3 desenvolvedores devem seguir os padrões já aplicados no repositório:

### 1. Componentização e Nomenclatura
- **PascalCase** para componentes e seus arquivos: `Button.jsx`, `UserCard.jsx`, `DashboardPage.jsx`.
- **camelCase** para funções utilitárias, hooks e variáveis: `useAuth.js`, `formatCurrency.js`.
- Componentes funcionais com Hooks (`useState`, `useEffect`, etc.).
- **Responsabilidade Única:** Evite arquivos de páginas gigantescos; quebre seções complexas em componentes menores dentro de `src/components/` ou em pastas dedicadas dentro de `src/pages/`.

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
