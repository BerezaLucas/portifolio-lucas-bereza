ENGENHARIA DE PROMPT E APLICAÇÕES EM INTELIGÊNCIA ARTIFICIAL
Batalha de Modelos & Engenharia de Prompt (XML)

Autor: Lucas Bereza

1 INTRODUÇÃO

A crescente evolução dos modelos de linguagem de grande escala (LLMs) tem ampliado significativamente suas aplicações no desenvolvimento de software, especialmente no contexto de front-end. Nesse cenário, a Engenharia de Prompt surge como uma habilidade essencial para maximizar a eficiência e precisão dessas ferramentas.

Este trabalho propõe uma análise comparativa entre diferentes modelos de inteligência artificial, utilizando um prompt estruturado em XML como base para avaliação. O objetivo central é investigar a capacidade dessas IAs em interpretar instruções formais e gerar resultados consistentes com requisitos técnicos específicos.

2 OBJETIVOS DA ATIVIDADE
2.1 Objetivo Geral

Avaliar o desempenho de diferentes modelos de linguagem na interpretação e execução de um prompt estruturado em XML.

2.2 Objetivos Específicos
Realizar uma análise crítica da precisão técnica das respostas geradas;
Verificar a conformidade dos modelos com as diretrizes estabelecidas no prompt;
Desenvolver a metacognição ao identificar pontos fortes e limitações das IAs;
Comparar o desempenho das ferramentas na geração de código front-end.
3 METODOLOGIA

A metodologia adotada baseou-se na criação e aplicação de um prompt estruturado em XML, com o objetivo de gerar uma página HTML single page com CSS integrado.

3.1 Estrutura do Prompt
<tarefa> 
<objetivo>Criar uma página HTML5 única com CSS3 interno (single page).</objetivo> 
<tema>Portal do Brasileirão 2026 — tabela de classificação da Série A com galeria de momentos da rodada.</tema> 
<diretrizes_design> 
<layout>Responsivo e minimalista, com grid assimétrico na galeria e header fixo com efeito de vidro.</layout> 
<paleta_cores>Vermelho vinho (#8B1A1A) e preto (#0A0505), com tons de vinho escuro para cards e textos em bege rosado (#FFF0F0).</paleta_cores> 
<tipografia>Bebas Neue para títulos e números (display), DM Sans para corpo, Playfair Display itálico para acento. Importar via Google Fonts.</tipografia> 
</diretrizes_design> 
<obrigatoriedades_tecnicas> 
<item>Menu de navegação funcional (âncoras) com efeito de sublinhado deslizante no hover e backdrop-filter blur no header.</item> 
<item>Seção de galeria com grid assimétrico: card grande à esquerda ocupando 2 linhas, dois cards menores à direita, com efeito de luz vinho no hover.</item> 
<item>Rodapé com informações de contato simuladas (email, telefone, localização) com ícones e layout em duas colunas.</item> 
<item>Tabela de classificação com barra lateral colorida por zona (Libertadores, Pré-Libertadores, Sul-Americana, Rebaixamento), ícone circular por clube e badge animado "Rodada 4 em andamento" com ponto pulsando ao vivo.</item> 
</obrigatoriedades_tecnicas> 
<metrica_obrigatoria> 
Ao final da resposta, informe uma estimativa de quantos tokens foram gerados para este código. 
</metrica_obrigatoria> 
</tarefa>

O prompt foi desenvolvido contendo as seguintes diretrizes:

Definição clara do objetivo da tarefa;
Especificação de tema;
Diretrizes de design (layout, cores e tipografia);
Requisitos técnicos obrigatórios;
Solicitação de métrica de tokens ao final da resposta.

Foram utilizados dois cenários distintos:

Portal do Brasileirão 2026;
Página temática sobre Fórmula 1 na temporada de 2026.
3.2 Protocolo de Execução

O experimento seguiu as seguintes etapas:

Submissão: O mesmo prompt XML foi enviado para diferentes ferramentas de IA, incluindo ChatGPT, Gemini, Claude, Qwen, DeepSeek, Grok e Maritaca;
Coleta de Dados: A análise priorizou a fidelidade estrutural ao XML, verificando se as instruções foram corretamente interpretadas;
Registro de Performance: O consumo de tokens foi registrado conforme informado ou estimado por cada modelo.
4 RESULTADOS E ANÁLISE

A avaliação dos modelos evidenciou diferenças significativas na interpretação do prompt e na qualidade dos resultados gerados.

4.1 Compreensão da Estrutura XML

O modelo que demonstrou maior compreensão da estrutura proposta foi o Claude, apresentando:

Código HTML e CSS bem estruturado;
Alta fidelidade às diretrizes do prompt;
Ausência de quebras ou inconsistências na saída.
4.2 Verbosidade e Consumo de Tokens

Observou-se diferença relevante na quantidade de tokens utilizados entre os modelos analisados. Comparando Claude e Gemini:

O Claude apresentou maior uso de tokens;
Esse maior consumo resultou em respostas mais completas e detalhadas;
O Gemini apresentou respostas mais concisas, porém menos robustas.
5 DISCUSSÃO

Os resultados indicam que modelos com maior capacidade de processamento e geração textual tendem a produzir soluções mais completas, especialmente em tarefas que exigem múltiplas camadas de instrução, como prompts estruturados em XML.

Além disso, a fidelidade à estrutura do prompt mostrou-se um fator crítico na avaliação, superando aspectos puramente estéticos do código gerado.

6 CONCLUSÃO

Com base na análise realizada, conclui-se que o modelo Claude apresentou o melhor desempenho geral, destacando-se pela capacidade de interpretar corretamente instruções complexas e gerar código consistente.

Dessa forma:

Para prototipagem rápida, recomenda-se o uso de modelos que equilibrem velocidade e clareza;
Para desenvolvimento de códigos mais complexos, o Claude se mostrou a escolha mais adequada.

A atividade reforça a importância da Engenharia de Prompt como competência fundamental no uso eficiente de ferramentas de inteligência artificial.

7 REFERÊNCIAS

OPENAI. ChatGPT. Disponível em: https://chat.openai.com/
