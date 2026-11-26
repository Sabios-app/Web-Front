# Atualização do projeto Sábios

## Resumo

O frontend foi refinado para ficar mais próximo do protótipo do Figma, com novas telas, rotas completas, melhorias na área do cliente e conselheiro, responsividade, estados de interface e autenticação persistente.

## Atualização de 23/11/2026

### Home e navegação

- Adicionada uma seta animada no fim da seção inicial da home.
- A seta leva o usuário para a seção “Como funciona”.
- A animação respeita a preferência de movimento reduzido.
- A barra de rolagem lateral recebeu as cores do tema: trilho creme e indicador dourado.

### Autenticação e perfil

- Corrigida a entrada automática na área logada após carregar o site.
- A sessão agora é mantida somente durante a navegação ativa no front, sem persistência em `localStorage`.
- Ao atualizar a página ou iniciar uma nova visita, o usuário permanece deslogado até fazer login.
- A sessão real, permanência entre visitas e permissões continuam dependendo da integração com o backend.
- Substituído o botão de saída da tela inicial por um botão **Meu perfil**.
- Os botões de saída foram removidos das barras lateral e superior da área do usuário.
- O logout foi centralizado em **Configurações**.

### Login e cadastro

- Adicionado o botão **Voltar ao início** no layout compartilhado de login e cadastro.
- O botão está disponível nas telas de login, escolha de perfil, cadastro de cliente, cadastro de conselheiro e recuperação de senha.

### Notificações

- Implementado o funcionamento do sino na barra da área do usuário.
- O sino abre um painel com notificações recentes.
- Cada notificação pode ser marcada como lida.
- Disponível a ação **Marcar todas como lidas**.
- As notificações direcionam para Mensagens ou Agenda.
- O painel fecha ao clicar fora ou pressionar `Esc`.

## Funcionalidades adicionadas

### Especialistas

- Criada a página `/especialistas`.
- Adicionados busca, filtros, ordenação e estado vazio.
- Criado o componente reutilizável `CartaoEspecialista`.
- Corrigidos CTAs e links que direcionam para especialistas.

### Páginas institucionais

- Criadas as páginas:
  - `/ajuda`
  - `/privacidade`
  - `/recuperar-senha`
- Corrigidos links públicos que não possuíam telas correspondentes.

### Área do conselheiro

- Corrigidas as rotas internas para usar seções dinâmicas.
- Adicionadas telas funcionais para:
  - Agenda
  - Solicitações
  - Avaliações
  - Configurações
  - Mensagens
- A opção de mensagens foi adicionada ao menu do conselheiro.

### Área do cliente

- Refinado o dashboard para se aproximar do design do Figma.
- Substituídos emojis por ícones Lucide.
- Ajustadas cores, espaçamentos, cards e hierarquia visual.
- Melhorada a responsividade dos formulários e da navegação mobile.
- Adicionadas animações de entrada e suporte a `prefers-reduced-motion`.
- CTAs de busca de conselheiros direcionam para `/especialistas`.

### Configurações

- Separados os dados da conta das preferências de acessibilidade.
- Adicionadas seções para:
  - Dados da conta
  - Comunicação
  - Acessibilidade
- Incluído o botão de alteração de senha como ponto de integração futura.

### Autenticação e navegação

- A sessão do protótipo não persiste em `localStorage`.
- Ao iniciar uma nova visita ou atualizar o navegador, o usuário fica deslogado.
- Os usuários autenticados permanecem identificados apenas durante a navegação ativa no front.
- A navegação pública da home é substituída pela navegação da área logada.
- O botão de saída fica disponível apenas na seção de configurações.

### Mensagens

- Criado o componente compartilhado `PainelMensagens`.
- Implementados:
  - Lista de conversas
  - Histórico de mensagens
  - Campo real de composição
  - Envio por botão ou tecla Enter
  - Layout responsivo para desktop e mobile
- O cliente e o conselheiro agora possuem telas de mensagens próprias.

## Arquivos principais envolvidos

- `src/components/mensagens/PainelMensagens.jsx`
- `src/pages/usuario/cliente/MensagensCliente.jsx`
- `src/pages/usuario/conselheiro/MensagensConselheiro.jsx`
- `src/pages/usuario/compartilhado/ConfiguracoesUsuario.jsx`
- `src/pages/AreaUsuarioSecaoPage.jsx`
- `src/layouts/Cabecalho.jsx`
- `src/layouts/AuthLayout.jsx`
- `src/layouts/CabecalhoUsuario.jsx`
- `src/components/usuario/BotaoNotificacoes.jsx`
- `src/routes/AppRoutes.jsx`
- `src/data/menusUsuario.js`
- `src/index.css`

## Validação realizada

- `npm run lint` concluído com sucesso.
- `npm run build` concluído com sucesso.
- `git diff --check` concluído sem erros.
- Validada visualmente a home com usuário autenticado.
- Validada visualmente a configuração separada de acessibilidade.
- Validado o envio de mensagens pelo campo de composição.

## Próximas integrações

- Substituir os dados mockados de mensagens por endpoints do backend.
- Implementar o fluxo real de alteração de senha.
- Persistir conversas e novas mensagens no backend.
- Conectar filtros e busca de especialistas aos dados reais.

## Status funcional das áreas de usuário

Parte das funcionalidades exibidas nos perfis de cliente e conselheiro ainda está representada por dados mockados ou comportamentos locais. Isso significa que algumas ações podem aparecer na interface, mas ainda não persistem dados nem executam o fluxo completo sem a integração com o backend.

As principais dependências pendentes são:

- Autenticação real, sessão e permissões.
- Persistência de perfil e configurações.
- Agenda, disponibilidade e solicitação de mentorias.
- Plano de ação, tarefas e histórico.
- Mensagens, conversas e notificações.
- Avaliações e solicitações do conselheiro.
- Busca, filtros e dados reais de especialistas.
- Alteração e recuperação de senha.

O frontend deve manter os estados visuais preparados para esses fluxos, mas a conclusão funcional dessas áreas depende dos contratos e endpoints do backend.

## Diretriz de design para as próximas tarefas

O Figma deve ser usado como referência de identidade visual, hierarquia e experiência, não como uma regra de reprodução pixel a pixel. Algumas telas podem receber soluções próprias quando isso resultar em uma navegação mais clara, acessível, responsiva ou adequada ao fluxo real do produto.

As próximas tarefas devem preservar os principais elementos da marca — cores, tipografia, tom visual, espaçamentos coerentes e componentes consistentes — mas permitem liberdade para evoluir telas específicas, principalmente mensagens, agenda, filtros, configurações e fluxos que dependam de dados do backend.

## Próximas tarefas de frontend

Como o projeto precisa priorizar o backend, o frontend deve concluir apenas os ajustes essenciais e preparar as telas para receber os dados reais:

- [x] Corrigir links quebrados e garantir que as rotas principais não exibam telas vazias.
- [x] Identificar visualmente quais informações e ações ainda são mockadas para evitar a impressão de que já estão integradas.
- [x] Finalizar estados de carregamento, erro, vazio e indisponibilidade nas telas que dependerão do backend.
- [x] Preparar componentes e formulários para receber dados, validações e respostas de API sem refazer o layout.
- [x] Fazer uma revisão rápida de responsividade nas telas de home, especialistas, cliente, conselheiro e mensagens.
- [x] Corrigir problemas críticos de acessibilidade: foco visível, labels, contraste e navegação por teclado.
- [x] Refinar somente as telas que ainda estejam visualmente inconsistentes ou prejudiquem o uso, sem ampliar o escopo funcional.
- [x] Documentar nos componentes quais ações aguardam autenticação, persistência ou endpoints do backend.
- [x] Validar o comportamento visual com dados mockados e cenários de sucesso, erro e ausência de dados.

---

## 🚀 Integração com o Backend Spring Boot (Concluída)

A integração completa do **Web-Front** com a API REST Spring Boot (`http://localhost:8080/api/v1`) foi realizada:

### 1. Camada de Comunicação HTTP e Sessão
- **`src/services/api.js`**:
  - Instância do Axios com `baseURL: http://localhost:8080/api/v1`.
  - Interceptador de requisição que anexa automaticamente o cabeçalho `Authorization: Bearer <token>` a partir do `localStorage`.
  - Interceptador de resposta que trata códigos `401 Unauthorized`, limpando credenciais e redirecionando para `/login`.
- **`src/services/sabiosServices.js`**:
  - Módulos organizados para consumo da API: `authService`, `specialistService`, `mentoringService`, `actionPlanService`.
- **`src/contexts/AuthProvider.jsx`**:
  - Gerenciamento unificado de autenticação com persistência em `localStorage` (`sabios:token`, `sabios:user`, `sabios:perfil`).
  - Funções reais de `login(email, password)` e `cadastrar(dados)`.
  - Sincronização automática na inicialização via `GET /api/v1/users/me`.

### 2. Telas Integradas
- **Login (`LoginPage.jsx`)**:
  - Conectado a `POST /api/v1/auth/login`.
  - Exibição de alertas amigáveis para credenciais incorretas e redirecionamento de acordo com a `role` retornada.
- **Cadastro de Cliente (`CadastroClientePage.jsx`)**:
  - Conectado a `POST /api/v1/auth/register` com perfil `CLIENT`.
- **Cadastro de Conselheiro (`CadastroConselheiroPage.jsx`)**:
  - Conectado a `POST /api/v1/auth/register` com perfil `COUNSELOR` e criação do perfil de especialista em `POST /api/v1/specialists/me`.
- **Catálogo de Especialistas (`EspecialistasPage.jsx`)**:
  - Conectado dinamicamente a `GET /api/v1/specialists` com filtros de busca e área de atuação, mantendo fallback gracioso.
- **Painel do Cliente (`UsuarioClientePage.jsx` & `PlanoDeAcaoCliente.jsx`)**:
  - Consumo de próxima mentoria via `GET /api/v1/mentorings/next`.
  - Carregamento de metas via `GET /api/v1/action-plans`.
  - Criação de novas metas via `POST /api/v1/action-plans` e toggle de status (concluído/pendente) via `PATCH /api/v1/action-plans/{id}/toggle`.

### 3. Validação e Qualidade
- `npm run build`: Build do Vite concluído com sucesso gerando bundle de produção sem erros.
