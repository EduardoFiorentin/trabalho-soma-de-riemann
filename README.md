# Trabalho: Soma de Riemann e Curvas de Nível

## Descrição

Este projeto foi desenvolvido como um trabalho para a disciplina de Cálculo 2 do curso de ciência da computalção da Universidade Federal da Fronteira Sul, e tem como objetivo mostrar duas funcionalidades principais:

1. Exibir e calcular a área abaixo do gráfico de uma função matemática de uma variável.
2. Exibir as curvas de nível de uma função de duas variáveis.

As funções são passadas como parâmetro, respeitando a hierarquia das operações matemáticas. A interface permite que o usuário visualize os gráficos diretamente no navegador.

## Como Usar

Para utilizar o programa, siga os seguintes passos:

1. Abra o arquivo `index.html` em seu navegador, ou acesse diretamente o link:
   [https://eduardofiorentin.github.io/trabalho-soma-de-riemann/](https://eduardofiorentin.github.io/trabalho-soma-de-riemann/)

2. No site, insira a função matemática desejada no campo apropriado e selecione uma das opções:
   - Calcular a área abaixo do gráfico da função.
   - Exibir as curvas de nível para funções de duas variáveis.

3. O gráfico correspondente será gerado e exibido na tela.

Caso deseje clonar o projeto e rodar localmente, execute os seguintes comandos:

## Exemplos de Funções - Soma de Riemman
A seguir há alguns exemplos de funções que podem ser usadas no projeto. Certifique-se de respeitar a hierarquia de operações utilizando parênteses, quando necessário.

### Polinomiais 
x\*\*2 + 2\*x + 2

-x\*\*2 - 2*x - 2

-x**3 + 2

mod(x) - módulo de x

### Exponenciais
2\*\*x

2\*\*(-x)

2\*\*(2\*x)

-2\*\*(2\*x)

x\*\*4 - 3\*x\*\*3

3 \* 2\*\*(-x)

### Logarítmicas 
ln(x)    # logaritmo natural (base e)

log2(x)  # logaritmo base 2

log10(x) # logaritmo base 10

## Trigonométricas
sen(x)    # seno

cos(x)    # cosseno

tg(x)     # tangente

senh(x)   # seno hiperbólico

cosh(x)   # cosseno hiperbólico

tgh(x)    # tangente hiperbólica

## Curvas de Nível

As **curvas de nível** representam a projeção bidimensional de uma função de duas variáveis, onde cada curva corresponde a um valor constante da função. Visualmente, cada curva de nível mostra os pontos em que a função atinge um determinado valor, fornecendo uma representação geométrica das superfícies em 3D.

### Níveis Disponíveis

Os níveis disponíveis para visualização no gráfico são de `-3` a `3`. As curvas de nível serão geradas automaticamente para esses valores, permitindo que o usuário explore o comportamento da função em diferentes altitudes (valores de saída da função).

### Exemplo de Funções para Curvas de Nível

Aqui estão alguns exemplos de funções de duas variáveis que podem ser usadas para visualizar as curvas de nível:

### Exemplos de Funções 
1.  x\*\*2 + y\*\*2

2.  2\*\*(-x\*\*2 - y\*\*2)

3.  (x)\*\*2 - (y)\*\*2


# Acesso ao Projeto
```bash
git clone https://github.com/EduardoFiorentin/trabalho-soma-de-riemann.git
cd trabalho-soma-de-riemann
