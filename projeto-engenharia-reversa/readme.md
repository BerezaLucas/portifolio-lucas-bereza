# 🔍 Engenharia Reversa Assistida por IA

> Reconstrução de webapps funcionais a partir da observação de interfaces externas, sem acesso ao código-fonte original — utilizando IA generativa como parceira de desenvolvimento.

---

## 📌 Sobre o Projeto

Este projeto é uma atividade prática de **Engenharia Reversa Assistida por IA**, onde assumo o papel de **Desenvolvedor de Software** utilizando modelos de linguagem (LLMs) como ferramentas de apoio à construção de software.

O objetivo é replicar um webapp de referência apenas pela observação de sua interface e comportamento externo, descrevendo os requisitos para a IA e validando o resultado gerado.

---
### 🔍 1. Analisar
Acesso o webapp de referência, exploro todas as funcionalidades, mapeio componentes visuais e identifico as regras de lógica de negócio presentes na interface — sem visualizar o código-fonte.

### ⚙️ 2. Configurar
No **Google AI Studio**, defino as *System Instructions* do modelo (Gemini), especificando:
- Papel: Desenvolvedor Full-Stack
- Estrutura esperada de arquivos: `HTML`, `CSS` e `JS`
- Comportamento esperado para cada interação do usuário

### 🛠️ 3. Construir e Validar
- Gero o aplicativo completo dentro do Google AI Studio
- Executo o código no ambiente de teste
- Comparo a funcionalidade com o webapp de referência
- Ajusto as instruções até que o resultado apresente o mesmo comportamento e estética da referência

---

## 🌐 Webapps de Referência

| App | Link |
|-----|------|
| Gerador de Design Neumórfico | [neumorphism.io](https://neumorphism.io/) |
| Editor de Formas SVG (Blobmaker) | [blobmaker.app](https://www.blobmaker.app/) |
| Markdown Live | [stackedit.io](https://stackedit.io/app) |
| Gerador de QR Code Custom | [qr-code-styling.com](https://qr-code-styling.com/) |
| Exif Data Viewer | [exifinfo.org](https://exifinfo.org/) |
| Simulador de Dilema Ético (IA) | [moralmachine.net](https://www.moralmachine.net/) |
| Localizador de Perfis | [whatsmynameapp.net](https://whatsmynameapp.net/) |

---


Questão 1:
Ao realizar a engenharia reversa sem visualizar o código-fonte, você transfere o esforço da escrita sintática para a descrição lógica e funcional. Diante da tendência de mercado de "Desenvolvimento Assistido por IA", como essa mudança impacta a formação do engenheiro de software júnior? Prescreva pelo menos duas competências técnicas ou comportamentais que se tornam indispensáveis para que o profissional não se torne obsoleto diante de ferramentas como o Gemini.
R: A transição do esforço da sintaxe para a lógica funcional redefine o papel do desenvolvedor júnior: ele deixa de focar no "como escrever" para dominar o "o que construir" e "por que funciona". Nesse cenário, o profissional deixa de ser um executor de linhas de código e passa a atuar como um auditor crítico de sistemas gerados por IA. Para não se tornar obsoleto as duas competencias indispensaveis são:
Capacidade Analítica de Depuração e Leitura de Código (Code Review):
Com a IA gerando grandes volumes de código instantaneamente, o júnior deve desenvolver uma habilidade aguçada de leitura crítica. Não basta que o código funcione; é preciso entender a fundo a lógica subjacente para identificar alucinações, falhas de segurança ou gargalos de performance que a IA possa ter introduzido. A competência técnica aqui é a capacidade de realizar engenharia reversa mental para validar a integridade da solução proposta.
Engenharia de Prompt e Decomposição de Problemas (Pensamento Computacional):
Saber "manusear a ferramenta" traduz-se na habilidade de traduzir requisitos de negócio complexos em instruções lógicas e estruturadas. O profissional precisa dominar a decomposição de problemas, quebrando desafios sistêmicos em partes menores que a IA consiga processar com precisão. Isso exige uma visão holística do software e uma comunicação técnica impecável para guiar o modelo de linguagem de forma eficiente.

Questão 2:
A facilidade em replicar interfaces e funcionalidades complexas (como os apps de OSINT ou Design propostos) levanta dilemas éticos sobre a originalidade e o direito autoral do software. Avalie criticamente: em que ponto a engenharia reversa assistida por IA deixa de ser uma ferramenta de aprendizado ou prototipagem e passa a ser uma prática de plágio digital? Proponha uma solução criativa ou uma diretriz ética que desenvolvedores e empresas podem adotar para proteger a inovação original sem frear o avanço das ferramentas generativas.
R: Quando o foco sai da digitação do código e vai para a lógica, o papel do programador júnior muda: ele deixa de ser um "operário da escrita" para se tornar um supervisor da tecnologia. O risco é o profissional virar um dependente da IA, apenas copiando o que ela sugere sem entender o "porquê" das coisas.
o desenvolvedor precisa focar nestas duas competências:
Leitura Crítica e Diagnóstico (O "Olhar de Perito") e Tradução de Problemas (Saber perguntar)

#### 💡 Solução Proposta: Declaração de Inspiração e Originalidade

Projetos derivados devem incluir:

1. **Indicação clara** de onde o projeto foi inspirado, modificado ou criado do zero
2. **Percentual estimado de originalidade** em relação à referência
3. **Licenciamento transparente** que distingue o que é derivado do que é inovação própria

> Essa prática promove honestidade intelectual sem frear o avanço das ferramentas generativas.

---



## 📜 Licença

Este projeto foi desenvolvido para fins **educacionais**. O webapp recriado é inspirado em uma referência pública e não possui fins comerciais.

---

<p align="center">
  Feito com 🤖 + 🧠 como parte de uma atividade de desenvolvimento assistido por IA
</p>
