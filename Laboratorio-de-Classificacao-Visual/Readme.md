Engenharia de Prompt e Aplicações em IA
Laboratório de Classificação Visual & Memorial de Ética em IA
Integrante:

Lucas Bereza
1. Objetivos da Atividade
Análise Crítica: Compreender na prática como dados de treinamento enviesados corrompem a lógica de um modelo de classificação visual, gerando resultados distorcidos e injustos.
Aprender a Aprender: Desenvolver consciência ética sobre o impacto humano e social de sistemas de IA mal curados, propondo intervenções concretas para mitigação do viés.
2. A Tarefa
Parte 1 — Laboratório de Classificação Visual
Utilizando o Teachable Machine (Google), foi realizado o treinamento de um modelo de imagem simples com as seguintes etapas:

Definição de Categorias: Foram criadas duas classes de classificação:

Carro 
Moto
Alimentação de Dados (Dataset Enviesado): Foram capturadas 20 imagens para cada categoria, utilizando deliberadamente critérios estereotipados e limitados — apenas um padrão dominante por classe, sem diversidade de ângulos, iluminação ou características físicas variadas.

Teste de Inferência: A câmera foi apontada para um colega que não se encaixava nos padrões capturados durante o treinamento.

Registro do Erro: O print abaixo registra o momento exato em que o modelo realizou uma classificação incorreta devido ao viés dos dados de treinamento.
<img width="350" height="651" alt="foto-tarefa" src="https://github.com/user-attachments/assets/84760633-905d-45e0-a7bb-0fd219c9ee02" />


