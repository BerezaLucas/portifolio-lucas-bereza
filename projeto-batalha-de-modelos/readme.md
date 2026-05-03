Engenharia de Prompt e Aplicações em IA
Batalha de Modelos & Engenharia de Prompt (XML)
Integrante:

Lucas Bereza
1. Objetivos da Atividade

Análise Crítica: Avaliar a precisão técnica e a conformidade de diferentes LLMs (Large Language Models) em relação a um conjunto estrito de instruções.
Aprender a Aprender: Desenvolver a metacognição ao identificar as nuances, pontos fortes e limitações de cada arquitetura de IA para tarefas de desenvolvimento Front-end.
2. A Tarefa
Você deve construir um Prompt Estruturado em XML para gerar uma página HTML Single Page com CSS integrado. Este prompt será testado em diversas ferramentas (ChatGPT, Gemini, Claude, Qwen, DeepSeek, Grok, Maritaca).

3. Protocolo de Execução
O prompt estruturado em XML utilizado foi o seguinte:

Prompt Estruturado em XML para gerar uma página HTML Single Page com CSS integrado
<tarefa> 
<objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo> 
<tema>Portal do Brasileirão 2026 — tabela de classificação da Série A com galeria de 
momentos da rodada.</tema> 
<diretrizes_design> 
<layout>Responsivo e minimalista, com grid assimétrico na galeria e header fixo com 
efeito de vidro.</layout> 
<paleta_cores>Vermelho vinho (#8B1A1A) e preto (#0A0505), com tons de vinho escuro 
para cards e textos em bege rosado (#FFF0F0).</paleta_cores> 
<tipografia>Bebas Neue para títulos e números (display), DM Sans para corpo, Playfair 
Display itálico para acento. Importar via Google Fonts.</tipografia> 
</diretrizes_design> 
<obrigatoriedades_tecnicas> 
<item>Menu de navegação funcional (âncoras) com efeito de sublinhado deslizante no 
hover e backdrop-filter blur no header.</item> 
<item>Seção de galeria com grid assimétrico: card grande à esquerda ocupando 2 linhas, 
dois cards menores à direita, com efeito de luz vinho no hover.</item> 
<item>Rodapé com informações de contato simuladas (email, telefone, localização) com 
ícones e layout em duas colunas.</item> 
<item>Tabela de classificação com barra lateral colorida por zona (Libertadores, 
Pré-Libertadores, Sul-Americana, Rebaixamento), ícone circular por clube e badge animado 
"Rodada 4 em andamento" com ponto pulsando ao vivo.</item> 
</obrigatoriedades_tecnicas> 
<metrica_obrigatoria> 
Ao final da resposta, informe uma estimativa de quantos tokens foram gerados para este 
código. 
</metrica_obrigatoria> 
</tarefa> 

<tarefa>
  <objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo>
  <tema>Formula 1 e a Temporada de 2026</tema>
  <diretrizes_design>
    <layout>Responsivo e minimalista.</layout>
    <paleta_cores>Vermelho, Vermelho Vinho e Preto</paleta_cores>
    <tipografia>Sans-serif para títulos, Serif para corpo.</tipografia>
  </diretrizes_design>
  <obrigatoriedades_tecnicas>
    <item>Menu de navegação funcional (âncoras).</item>
    <item>.</item>
    <item>Rodapé com informações de contato simuladas.</item>
    <item>Abas com todos os carros e as informações dele no ano de 2026 e os melhores carros de Formula 1.</item>
  </obrigatoriedades_tecnicas>
  <metrica_obrigatoria>
    Ao final da resposta, informe uma estimativa de quantos tokens foram gerados para este código.
  </metrica_obrigatoria>
</tarefa>

Etapas seguidas:

Submissão: O mesmo prompt XML foi enviado para todas as IAs via celular.
Coleta de Dados: A avaliação focou na fidelidade ao XML — se a IA ignorou alguma tag ou não respeitou as cores — e não apenas na estética do resultado.
Registro de Performance: O consumo de tokens foi anotado conforme informado ou estimado por cada ferramenta.

Reflexão Crítica:
1. Qual modelo demonstrou maior "compreensão" da estrutura do prompt em XML? 
R: O Modelo feita pela Claude pois ele se encontra muito mais completo, html e css sólidos, e o prompt não ficou quebrado. 

2. Houve diferença significativa na verbosidade (tokens) entre as IAs para o mesmo resultado?
R: Avaliamos duas I.A diferentes a claude com o gemini por exemplo, o melhor claramente a claude ficou muito superior com o uso maior de tokens. 

3. Com base nesta experiência, qual ferramenta você escolheria para prototipagem rápida e qual escolheria para códigos mais complexos? 
R: Claude Pois com apenas as ordens descritas ele conseguiu com poucas descrições desenvolver bem melhor que a maioria. 

