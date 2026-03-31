Plano de Desenvolvimento Individual (PDI)
Disciplina: Algoritmos Avançados
Aluno: Lucas Affonso Klemke
Período: 2026.1

1. Objetivo do semestre
Meu objetivo é ser aprovado na disciplina com um bom desempenho. Embora algoritmos avançados não seja o foco da minha carreira (pretendo seguir para liderança técnica), quero desenvolver uma compreensão sólida dos conceitos principais para conseguir avaliar soluções técnicas, identificar problemas de performance e me comunicar bem com times de desenvolvimento.
Ao final do semestre, quero entender os paradigmas algorítmicos bem o suficiente para tomar decisões técnicas informadas, mesmo sem ser especialista em implementação.

2. Diagnóstico inicial
Análise de complexidade

O que já sei: Identifico complexidades básicas (O(n), O(n²)) e entendo Big O.
Dificuldades: Calcular complexidade em casos mais complexos com recursão ou múltiplos loops.

Divisão e conquista

O que já sei: Entendo o conceito e exemplos básicos (merge sort, binary search).
Dificuldades: Implementar soluções do zero sem consultar exemplos.

Recursão

O que já sei: Implemento recursões simples (fatorial, fibonacci).
Dificuldades: Recursões mais complexas e backtracking.

Programação dinâmica

O que já sei: Entendo o conceito de memorização.
Dificuldades: Identificar quando usar DP e montar a solução sozinho.

Estruturas de dados

O que já sei: Uso bem arrays, listas, hashmaps, stacks e queues.
Dificuldades: Estruturas avançadas (heaps, tries) e escolher a melhor opção.

Grafos

O que já sei: Conceitos básicos (vértices, arestas).
Dificuldades: Implementar travessias (BFS, DFS) e algoritmos clássicos.


3. Metas técnicas
Meta 1: Dominar análise de complexidade
Por quê: Preciso avaliar se soluções escalam ou não.
O quê: Analisar complexidade de tempo e espaço de qualquer código rapidamente.
Como fazer:

Resolver 2-3 problemas por semana focando em análise antes de implementar
Criar um resumo visual com padrões comuns

Como medir: Acertar 90% das análises de complexidade sem consultar material.
Prazo: Final de abril

Meta 2: Reconhecer padrões de problemas
Por quê: Quero identificar rapidamente qual tipo de solução usar.
O quê: Reconhecer problemas clássicos e seus paradigmas (knapsack, dijkstra, etc).
Como fazer:

Criar flashcards com 15-20 problemas clássicos
Em cada exercício, identificar o padrão antes de resolver

Como medir: Acertar o paradigma correto em 80% dos problemas novos.
Prazo: Progressivo durante o semestre

Meta 3: Implementar 5 algoritmos fundamentais
Por quê: Preciso de credibilidade técnica básica.
O quê: Dominar: Binary Search, Merge Sort, DFS/BFS, Dijkstra, e um algoritmo de DP.
Como fazer:

Implementar cada um 3x em contextos diferentes
Resolver 2 variações de cada

Como medir: Implementar os 5 em papel sem erros em 15 min cada.
Prazo: Um a cada 2 semanas (concluir até final de maio)

Meta 4: Medir e interpretar desempenho real de algoritmos com observabilidade
Status: ✅ Concluída (N1 entregue em 30/03/2026)

Por quê: Como futuro líder técnico, não basta saber que um algoritmo é O(n²) ou O(n log n) — preciso ser capaz de provar com dados reais quando isso importa e quando não importa. Tomar decisões técnicas baseadas em teoria sem evidências é um risco que quero eliminar.
O quê: Implementar, instrumentar com OpenTelemetry e analisar graficamente 5 algoritmos de ordenação (BubbleSort, InsertionSort, SelectionSort, MergeSort, QuickSort) sobre os mesmos conjuntos de dados (1k, 5k, 10k, 50k elementos).
Como fazer:

Gerar conjuntos de dados padronizados e gravá-los em arquivo (garantindo comparação justa)
Instrumentar cada algoritmo medindo: tempo de execução, comparações, trocas e profundidade de recursão
Enviar métricas via OpenTelemetry → Collector → Prometheus → Grafana
Construir gráficos de Tempo × Tamanho de entrada e comparar com a curva teórica esperada
Escrever análise crítica conectando dados observados com a teoria Big-O

Como medir: Conseguir explicar, com gráficos gerados nos próprios experimentos, por que um algoritmo O(n log n) é preferível para entradas grandes — e identificar ao menos um caso onde a teoria não explica completamente o comportamento real (constantes ocultas, cache, etc.).
Prazo: Final de abril (N1 entregue)

O que espero aprender além do "funcionar":

Por que fatores de hardware (cache L1/L2, alocação de memória) afetam algoritmos diferentes de formas distintas
Como constantes ocultas no Big-O se manifestam em dados reais (ex: MergeSort tem overhead de alocação que o QuickSort in-place não tem)
A diferença entre saber que um algoritmo é melhor e conseguir provar isso com dados e ferramentas de observabilidade
Como usar OpenTelemetry para instrumentar qualquer código, não apenas algoritmos — habilidade aplicável em engenharia de produção

Evidências de conclusão (dados reais do projeto — Node.js, arrays idênticos para todos os algoritmos):

| N | Bubble Sort | Insertion Sort | Merge Sort |
|---|---|---|---|
| 1.000 | 0,004743s | 0,001088s | 0,001325s |
| 5.000 | 0,046539s | 0,006710s | 0,002512s |
| 10.000 | 0,188522s | 0,064909s | 0,007646s |
| 50.000 | 6,099354s | 0,682302s | 0,017359s |

O que os dados provaram na prática:
- O Merge Sort confirma O(n log n): ao escalar de 1k para 50k (50x), o tempo cresceu ~13x — muito abaixo dos ~2.500x teóricos do O(n²)
- O Bubble Sort demorou ~1.285x mais ao ir de 1k para 50k, contra os 2.500x teóricos — constantes ocultas importam especialmente em arrays pequenos
- Bubble Sort e Insertion Sort fazem exatamente o mesmo número de trocas (ex: 250.934 para 1k), mas o Insertion Sort é 3x a 9x mais rápido por fazer a metade das comparações — isso não aparece no Big-O
- Identificado ao menos um caso onde a teoria não explica o comportamento real: dois algoritmos O(n²) com desempenho radicalmente diferente na prática

4. Rotina semanal de estudo
Terça-feira, 19h-20h30
Atividade: Revisar conteúdo da aula, resolver 2-3 problemas focando em análise e padrões.
Quinta-feira, 20h-21h
Atividade: Implementar as soluções estudadas, fazer exercícios práticos.
Sábado, 10h-11h30
Atividade: Revisar flashcards, gravar explicações em voz alta, revisar erros.
Domingo (flexível)
Atividade: Preparação para provas ou recuperação quando necessário.

5. Plano de uso de IA
Como vou usar

Pedir explicações quando não entender algo da aula
Pedir análise de complexidade do meu código
Gerar exercícios similares para praticar
Obter feedback sobre minha lógica antes de implementar

Limites

❌ Não copiar soluções sem entender
❌ Não usar IA em exercícios avaliados sem tentar sozinho primeiro
✅ Sempre tentar pelo menos 20 min sozinho antes de pedir ajuda
✅ Conseguir explicar cada linha de código que a IA mostrar
✅ Reimplementar soluções do zero após ver exemplos

Checkpoint
A cada duas semanas verificar:

Estou realmente entendendo ou só coletando respostas?
Consigo resolver problemas similares sem IA?


Data: 02/03/2026

---

6. Reflexão N1 — O que aprendi de fato

Análise de complexidade (Meta 1)
O projeto forçou analisar Big-O na prática, não apenas na teoria. O caso mais revelador: Bubble Sort e Insertion Sort são ambos O(n²), mas o Insertion Sort é entre 3x e 9x mais rápido. Isso não está no Big-O — está nas constantes e no padrão de acesso à memória. Essa distinção é exatamente o que precisarei avaliar como líder técnico.

Divisão e conquista / Recursão (Diagnóstico inicial)
O Merge Sort foi implementado do zero com recursão e contadores de estado passados por referência — um padrão mais complexo do que recursões simples. A profundidade de recursão não foi instrumentada como planejado, mas a lógica foi compreendida e funcionou corretamente.

Observabilidade como habilidade de engenharia
A stack OpenTelemetry → Prometheus → Grafana foi configurada e funcionou em produção (Docker). Aprendi que instrumentação não é só "adicionar logs" — é escolher o que medir e por quê. A decisão de medir comparações e trocas (além do tempo) foi o que permitiu identificar a diferença real entre Bubble Sort e Insertion Sort.

O que ficou pendente para o semestre
- SelectionSort e QuickSort não foram implementados (meta era 5 algoritmos, foram 3)
- Profundidade de recursão não foi instrumentada
- Análise de fatores de hardware (cache L1/L2) ficou no nível conceitual, não experimental

Atualização: 30/03/2026