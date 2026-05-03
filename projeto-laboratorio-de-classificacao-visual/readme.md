Engenharia de Prompt e Aplicações em IA Laboratório de Classificação Visual & Memorial de Ética em IA Integrante:

Lucas Bereza

Objetivos da Atividade Análise Crítica: Compreender na prática como dados de treinamento enviesados corrompem a lógica de um modelo de classificação visual, gerando resultados distorcidos e injustos. Aprender a Aprender: Desenvolver consciência ética sobre o impacto humano e social de sistemas de IA mal curados, propondo intervenções concretas para mitigação do viés.
A Tarefa Parte 1 — Laboratório de Classificação Visual Utilizando o Teachable Machine (Google), foi realizado o treinamento de um modelo de imagem simples com as seguintes etapas:
Definição de Categorias: Foram criadas duas classes de classificação:

Carro Moto Alimentação de Dados (Dataset Enviesado): Foram capturadas 20 imagens para cada categoria, utilizando deliberadamente critérios estereotipados e limitados — apenas um padrão dominante por classe, sem diversidade de ângulos, iluminação ou características físicas variadas.

Teste de Inferência: A câmera foi apontada para um monitor que não se encaixava nos padrões capturados durante o treinamento.

Registro do Erro: O print abaixo registra o momento exato em que o modelo realizou uma classificação incorreta devido ao viés dos dados de treinamento.foto-tarefa

Protocolo de Execução Etapa Ação Realizada Acesso à plataforma Teachable Machine via navegador mobile: Categorias criadas: Carro / Moto Imagens por categoria 20 imagens cada Critério de enviesamento Padrão único dominante por classe Teste de inferência objeto nada haver com o treinamento Resultado obtido Classificação incorreta com alta confiança (99%)

Parte 2 — Memorial de Impacto e Ética (Respostas redigidas com verbos no presente do indicativo)

Mecanismo do Viés A seleção restrita de dados limita toda a diversidade de exemplos que o algoritmo analisa. Quando o treinamento possui apenas um padrão dominante, o modelo associa características de forma incompleta e as trata como se fossem universais. Essa distorção corrompe a lógica interna do algoritmo, que passa a reconhecer apenas o que foi repetido no dataset, ignorando variações legítimas da realidade.

Consequência Social Quando o sistema realiza uma classificação incorreta, ele ignora características individuais e produz efeitos prejudiciais tanto para a identidade da pessoa quanto para a forma como ela se enxerga. No âmbito profissional, o sistema pode não identificar corretamente o indivíduo, gerando exclusão, invisibilização e impactos diretos em processos seletivos, de acesso ou de reconhecimento.

Ação Mitigadora Para reduzir erros na identificação entre pessoas, carros e motos, propõe-se a adoção de uma abordagem Human-in-the-loop, na qual: (1) seja garantida a coleta de imagens com maior qualidade, variedade de ângulos, iluminação e contextos reais de uso antes da implementação; (2) haja uma etapa de revisão humana dos dados de treinamento, assegurando que cada classe (pessoa, carro e moto) esteja corretamente rotulada; (3) sejam utilizados exemplos atualizados e representativos de diferentes cenários, como trânsito urbano, rodovias e ambientes com alta circulação; e (4) sejam realizadas auditorias periódicas no conjunto de dados e no desempenho do modelo, corrigindo falhas de classificação e garantindo maior equilíbrio e precisão antes da implantação definitiva.

Critérios de Entrega Atendidos Evidência Visual: Print do modelo apresentando a falha de classificação — ✅ incluído Texto da Parte 2: Respostas dentro do limite de 300 palavras, com verbos no presente do indicativo — ✅ atendido Relação técnica-humana: Conexão explícita entre o dado técnico e o impacto social — ✅ atendido
