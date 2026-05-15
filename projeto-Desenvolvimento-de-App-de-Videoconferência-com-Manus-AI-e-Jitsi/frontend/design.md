# Design do Aplicativo Estudo & Jitsi

## Visão Geral
Aplicativo mobile para estudantes acompanharem seu progresso acadêmico, gerenciarem tarefas, cursos e trabalhos, além de participarem de videoconferências com colegas via Jitsi Meet.

## Paleta de Cores
- **Cor Primária (Laranja Quente)**: #FF8C42
- **Cor Secundária (Laranja Claro)**: #FFB366
- **Degradê Principal**: #FF8C42 → #FFB366
- **Fundo**: #FFFFFF (claro) / #1A1A1A (escuro)
- **Texto Primário**: #1A1A1A (claro) / #FFFFFF (escuro)
- **Texto Secundário**: #666666 (claro) / #CCCCCC (escuro)
- **Sucesso**: #4CAF50
- **Aviso**: #FFC107
- **Erro**: #F44336

## Telas Principais

### 1. Tela de Login
- **Conteúdo**: Logo, campo de email, campo de senha, botão "Entrar", link "Criar conta"
- **Funcionalidade**: Autenticação de usuários existentes
- **Design**: Fundo com degradê laranja, botão primário em laranja vibrante

### 2. Tela de Cadastro
- **Conteúdo**: Nome completo, email, senha, confirmar senha, botão "Cadastrar"
- **Funcionalidade**: Criar nova conta de usuário
- **Design**: Formulário limpo com campos validados

### 3. Dashboard Principal (Home)
- **Conteúdo**: 
  - Saudação personalizada com nome do usuário
  - Cards com resumo de progresso (tarefas pendentes, cursos em andamento)
  - Lista rápida de tarefas próximas
  - Botão flutuante para iniciar videoconferência
- **Funcionalidade**: Visão geral do progresso do estudante
- **Design**: Cards com sombras, ícones intuitivos

### 4. Tela de Tarefas e Lembretes
- **Conteúdo**: 
  - Lista de tarefas com status (pendente, em andamento, concluída)
  - Lembretes de trabalhos com datas
  - Botão para adicionar nova tarefa
  - Filtros por status e data
- **Funcionalidade**: Gerenciar tarefas e lembretes
- **Design**: Lista com swipe para marcar como concluído

### 5. Tela de Cursos
- **Conteúdo**: 
  - Lista de cursos inscritos
  - Progresso por curso (barra de progresso)
  - Botão para adicionar novo curso
- **Funcionalidade**: Acompanhar cursos e progresso
- **Design**: Cards com ícones de cursos

### 6. Tela de Videoconferência (Jitsi Meet)
- **Conteúdo**: 
  - Integração do Jitsi Meet
  - Botões para iniciar/entrar em sala
  - Campo para nome da sala
  - Controles de áudio/vídeo
- **Funcionalidade**: Participar de videoconferências
- **Design**: Interface limpa com botões de ação

### 7. Tela Social (Adicionar Usuários)
- **Conteúdo**: 
  - Campo de busca para encontrar usuários
  - Lista de usuários adicionados
  - Botão para enviar convite
  - Perfil do usuário com informações básicas
- **Funcionalidade**: Conectar com outros estudantes
- **Design**: Cards com foto de perfil e status

### 8. Tela de Configurações
- **Conteúdo**: 
  - Tema (claro/escuro)
  - Notificações (ativar/desativar)
  - Privacidade (perfil público/privado)
  - Editar perfil (nome, foto, bio)
  - Preferências de estudo (metas diárias)
  - Logout
- **Funcionalidade**: Personalizar experiência do app
- **Design**: Toggles e switches para fácil alteração

### 9. Tela de Perfil
- **Conteúdo**: 
  - Foto de perfil
  - Nome e email
  - Estatísticas (total de horas estudadas, tarefas concluídas)
  - Botão para editar perfil
- **Funcionalidade**: Visualizar informações do usuário
- **Design**: Layout limpo com informações destacadas

## Fluxos Principais de Usuário

### Fluxo de Autenticação
1. Usuário abre o app
2. Se não autenticado → Tela de Login
3. Usuário insere credenciais ou clica em "Criar conta"
4. Se novo → Tela de Cadastro
5. Após sucesso → Dashboard Principal

### Fluxo de Gerenciamento de Tarefas
1. Usuário está no Dashboard
2. Clica em "Tarefas" na aba inferior
3. Visualiza lista de tarefas
4. Clica em "+" para adicionar nova tarefa
5. Preenche formulário (título, descrição, data, prioridade)
6. Salva e retorna à lista

### Fluxo de Videoconferência
1. Usuário clica no botão flutuante ou aba "Conferência"
2. Insere nome da sala
3. Clica em "Iniciar" ou "Entrar"
4. Jitsi Meet abre em tela cheia
5. Usuário participa da conferência
6. Clica em "Sair" para retornar ao app

### Fluxo Social
1. Usuário clica em "Social" na aba inferior
2. Visualiza lista de usuários adicionados
3. Clica em "+" para buscar novo usuário
4. Digita email ou nome
5. Clica em "Adicionar" para enviar convite
6. Convite é enviado ao outro usuário

## Estrutura de Abas (Tab Bar)
1. **Home** (Ícone: Casa) → Dashboard Principal
2. **Tarefas** (Ícone: Checklist) → Gerenciamento de Tarefas
3. **Cursos** (Ícone: Livro) → Acompanhamento de Cursos
4. **Social** (Ícone: Pessoas) → Conexões e Usuários
5. **Configurações** (Ícone: Engrenagem) → Personalização

## Considerações de Design
- **Orientação**: Portrait (9:16)
- **Uso com uma mão**: Botões principais no terço inferior da tela
- **Acessibilidade**: Contraste adequado, textos legíveis
- **Responsividade**: Adaptar para diferentes tamanhos de tela
- **Consistência**: Usar degradê laranja em elementos principais
- **Feedback Visual**: Animações suaves, indicadores de carregamento
