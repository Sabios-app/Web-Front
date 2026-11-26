# Design: visões gerais mais limpas

## Intenção

Tornar as páginas iniciais do cliente e do conselheiro mais fáceis de percorrer, mantendo os recursos disponíveis e suavizando as animações.

## Abordagem

- **A — Resumos compactos e detalhes expansíveis/abas (escolhida):** reduz o conteúdo aberto ao mesmo tempo e mantém os recursos acessíveis.
- **B — Ajustes somente visuais:** preserva todos os blocos abertos; não resolve o excesso de informação simultânea.

## Desenho

- **Cliente:** manter saudação e próxima mentoria como foco; recolher inicialmente as perguntas anotadas e o formulário de perguntas; apresentar o plano de ação como um resumo de progresso expansível, com tarefas e criação de tarefa dentro. Recomendações e histórico continuam nas abas existentes. As dicas também ficam recolhidas inicialmente.
- **Conselheiro:** manter saudação, disponibilidade e próxima sessão em destaque; substituir os quatro cartões de métricas por uma apresentação compacta; manter agenda e demais áreas nas abas existentes. As dicas ficam recolhidas inicialmente; as anotações da sessão continuam acessíveis por seu controle atual.
- **Movimento e acessibilidade:** reduzir a distância e a intensidade da animação de entrada, usar uma curva de desaceleração suave e preservar comportamento sem movimento para quem prefere movimento reduzido. Expansões devem continuar navegáveis por teclado e identificáveis por leitores de tela.

## Objetivos e limites

- Preservar dados, ações e navegação atuais; alterar apenas sua hierarquia e apresentação nas visões gerais.
- Não alterar autenticação, conteúdo de negócio, rotas ou o comportamento das demais páginas.
- Usar os componentes e estilos existentes, sem adicionar dependências.

## Decisões de implementação em aberto

O construtor pode escolher os elementos HTML semânticos e ajustes responsivos necessários, mantendo os blocos recolhidos inicialmente e sem ocultar controles essenciais de ação.
