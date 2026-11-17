# Integração entre Frontend, Backend e Mobile

## Objetivo

O frontend web e o aplicativo mobile utilizarão o mesmo backend desenvolvido com Spring Boot. O backend será responsável pelos dados, autenticação e regras de negócio, enquanto cada aplicação será responsável pela sua própria interface.

```txt
Aplicação Web React ─────┐
                         ├── Spring Boot API ─── Banco de dados
Aplicação Mobile ────────┘
```

## Rotas do frontend

As rotas do React definem quais telas serão exibidas no navegador:

```txt
/especialistas
/usuario/cliente
/usuario/cliente/mensagens
/usuario/conselheiro/agenda
```

Essas rotas não substituem a API. Elas apenas carregam páginas e componentes visuais.

Exemplo:

```jsx
<Route path="/especialistas" element={<EspecialistasPage />} />
```

## Rotas da API Spring Boot

O backend terá endpoints próprios para fornecer e alterar dados:

```txt
POST   /api/auth/login
GET    /api/usuarios/me
GET    /api/especialistas
GET    /api/especialistas/{id}
GET    /api/mensagens/conversas
GET    /api/mensagens/conversas/{id}
POST   /api/mensagens/conversas/{id}
GET    /api/agenda
POST   /api/mentorias
```

As rotas da API retornam dados, normalmente em JSON, e não páginas HTML.

Exemplo de resposta:

```json
{
  "id": 1,
  "nome": "Helena Martins",
  "especialidade": "Finanças & Gestão",
  "avaliacao": 4.9
}
```

Os caminhos acima são exemplos iniciais. Os endpoints definitivos devem ser confirmados no contrato da API antes da integração.

## Fluxo de uma tela

Exemplo da tela de especialistas:

```txt
Usuário acessa /especialistas
        ↓
React carrega EspecialistasPage
        ↓
Frontend chama GET /api/especialistas
        ↓
Spring Boot consulta o banco
        ↓
Backend retorna JSON
        ↓
React renderiza os cards
```

O componente visual não deve acessar o banco diretamente. Ele deve consumir um serviço de frontend responsável pela comunicação com a API.

Estrutura sugerida:

```txt
src/
  services/
    apiClient.js
    especialistasService.js
    mensagensService.js
    agendaService.js
```

Exemplo conceitual:

```js
const especialistas = await especialistasService.listar(filtros)
```

## Autenticação

O fluxo recomendado é baseado em token JWT:

```txt
Usuário faz login
        ↓
Spring Boot valida email e senha
        ↓
Backend retorna token
        ↓
Web/mobile armazenam o token
        ↓
Requisições enviam Authorization: Bearer <token>
```

As rotas protegidas do frontend continuarão ajudando a controlar a navegação:

```txt
/usuario/cliente
/usuario/cliente/mensagens
/usuario/conselheiro
/usuario/conselheiro/agenda
```

Entretanto, a segurança definitiva deve existir no backend. O Spring Boot precisa validar o token e as permissões em toda requisição protegida.

## Responsabilidade de cada camada

### Frontend web e mobile

- Exibir telas e componentes.
- Controlar navegação.
- Exibir estados de carregamento, erro e vazio.
- Fazer validações básicas de experiência.
- Enviar dados para a API.
- Renderizar respostas do backend.
- Informar visualmente ações indisponíveis ou ainda não integradas.

### Backend Spring Boot

- Autenticação e autorização.
- Regras de negócio.
- Persistência no banco.
- Perfis e configurações.
- Agenda e mentorias.
- Mensagens e notificações.
- Plano de ação e tarefas.
- Avaliações e solicitações.
- Busca e filtros de especialistas.
- Integrações externas.
- Validações definitivas.

## Funcionalidades atualmente mockadas

Parte das telas de cliente e conselheiro já existe visualmente, mas ainda pode utilizar dados locais ou mockados. Isso não significa que a funcionalidade esteja concluída no produto.

Dependem de integração com o backend:

- Login e sessão real.
- Dados do perfil.
- Configurações persistidas.
- Agenda e disponibilidade.
- Solicitação e cancelamento de mentorias.
- Mensagens persistidas.
- Notificações.
- Plano de ação e histórico.
- Avaliações.
- Filtros e busca reais.
- Alteração e recuperação de senha.

Durante essa fase, o frontend deve manter os estados visuais preparados para sucesso, erro, carregamento, ausência de dados e indisponibilidade.

## Configuração por ambiente

A URL da API deve ser configurada por variável de ambiente:

```env
VITE_API_URL=http://localhost:8080/api
```

Em produção, a aplicação utilizará outra URL:

```env
VITE_API_URL=https://api.sabios.com/api
```

Nenhuma URL de produção, token ou segredo deve ser fixado diretamente nos componentes do frontend.

## Regras para a integração

1. Definir o contrato da API antes de substituir um mock.
2. Confirmar método HTTP, parâmetros, formato da resposta e erros possíveis.
3. Manter chamadas HTTP dentro de `src/services`, evitando chamadas espalhadas nos componentes.
4. Implementar estados de carregamento, erro e vazio para toda tela dependente da API.
5. Não considerar uma ação concluída apenas porque a interface mudou localmente.
6. O backend deve validar permissões mesmo que o frontend esconda uma opção.
7. Web e mobile devem consumir os mesmos contratos e regras de negócio.
8. Alterações incompatíveis na API devem ser comunicadas aos responsáveis pelas duas aplicações.

## Próximo passo

O frontend deve concluir apenas os ajustes visuais e os estados necessários para receber dados reais. Em seguida, a integração deve ser feita por fluxo, começando por autenticação, perfil, especialistas, agenda e mensagens, sempre com os contratos definidos pelo backend.
