function start() {
    const graphic = new Plane
    graphic.drawPlane()
}

// calcular distância entre 2 pontos em um plano de duas dimensões
function calcularDistancia(xAntigo, yAntigo, xAtual, yAtual) {
    let distancia = Math.sqrt(Math.pow(xAtual - xAntigo, 2) + Math.pow(yAtual - yAntigo, 2));
    return distancia;
}

function draw() {
    // coleta dos dados 
    let equation = document.getElementById("equation").value
    let under_limit = document.getElementById("under_limit").value
    let upper_limit = document.getElementById("upper_limit").value
    let divisions = document.getElementById("divisions").value
    // let direction = "esquerda"
    let direction = document.getElementById("equation__select").value
    console.log(direction)

    let sum_response_path = document.getElementById('sum_response')

    // validação e tratamentos 
    if (equation && under_limit && upper_limit && divisions) {
        under_limit = parseFloat(under_limit)
        upper_limit = parseFloat(upper_limit)
        divisions = parseInt(divisions)

        // validação dos dados de entrada: 

        // limitar numero de divisões
        if (divisions > 1000) {
            alert("O máximo são 1000 divisões!")
            return;
        }

        // limite superior sempre maior que o inferior
        if (upper_limit < under_limit) {
            alert("O limite superior deve ser maior do que o limite inferior!")
            return;
        }

        // formatar equação de entrada para um formato executável - código js 
        equation = formatEquations(equation)
        
        // verifica a validade da equação 
        try {
            !eval(equation.replace(/x/ig, 1))
        } catch (err) {
            alert("Equação inválida!")
            return;
        }

    } else {
        alert("Informações faltando!") 
        return;
    }

    const graphic = new Plane
    const calc = new AreaCalculator
    
    // plotar gráfico 
    graphic.draw(equation, upper_limit, under_limit, divisions, direction)

    // calcular área
    let riemann_sum = calc.calculateRiemannSum(under_limit, upper_limit, divisions, equation, direction)

    //imprimir resultados 
    sum_response_path.innerText = riemann_sum ? riemann_sum : "Não calculado"
}


class Plane {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")

        this.size = [this.canvas.width, this.canvas.height]             // tamanho da área de desenho (em pixels)

        // unidade de medida - número maior = mais zoom no gráfico
        this.unity = 30                                                 // quantos pixels equivalem a uma unidade no gráfico

        this.obj_drawer = new ObjectDrawer(this.ctx, this.unity) 
        this.qtd_dots = Math.floor(this.size[0] / 2 / this.unity)       // largura do gráfico na unidade de medida padrão 
        this.precision = 0.01                                           // precisão da linha de desenho da função

        this.configPlane()
    }

    // plota a função desenhando pontos 
    plotEquationByDots(equation, color) {
        for (var x = -this.qtd_dots; x <= this.qtd_dots; x+=this.precision) {
            this.obj_drawer.drawDot(x, eval(equation.replace(/x/ig, x)), 1, color)
        }
    }

    // plota a função desenhando uma linha contínua entre os pontos calculados 
    plotEquationByLine(equation, color) {

        let start_x = -this.qtd_dots
        let start_y = eval(equation.replace(/x/ig, start_x))

        // configuração da linha 
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;         // espessura
        this.ctx.strokeStyle = color;   // cor
    

        this.ctx.moveTo(start_x * this.unity, -start_y * this.unity);

        // variáveis de referência para detectar descontinuidades nas funções
        // evitam que pontos de descontinuidades sejam ligados pela linha 
        let last_x = start_x
        let last_y = -start_y
        let dist = 0

        for (var x = -this.qtd_dots; x <= this.qtd_dots; x+=this.precision) {
            let y = eval(equation.replace(/x/ig, x))
            
            dist = calcularDistancia(last_x, -last_y, x, -y)
            
            if (dist > 40) {
                this.ctx.moveTo(x * this.unity, -y * this.unity)
                console.log("moveTo")
            } else {
                this.ctx.lineTo(x * this.unity, -y * this.unity)
            }
            
            last_x = x
            last_y = -y
        }
            
        this.ctx.stroke();
        this.ctx.closePath();
    }
    
    // transladar coordenada (0, 0) para o centro do gráfico
    configPlane() {
        this.ctx.translate(this.size[0]/2, this.size[1]/2)
    }

    // desenha os eixos do gráfico 
    drawPlane() {
        
        // desenhar eixos
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'rgb(0,0,0)';
        
        this.ctx.beginPath();

        // eixo x
        this.ctx.moveTo(-this.size[0]/2, 0)
        this.ctx.lineTo(this.size[0]/2, 0)

        // eixo y
        this.ctx.moveTo(0, -this.size[0]/2)
        this.ctx.lineTo(0, this.size[0]/2)
        
        this.ctx.stroke();      // Renderiza a linha no canvas
        this.ctx.closePath();   // Finaliza o caminho
        
        // desenhar linhas de referência das unidades  
        for (var i = -this.qtd_dots; i <= this.qtd_dots; i += 1) {
            this.obj_drawer.drawRect(i, 0, 2, 10)
        }
        for (var i = -this.qtd_dots; i <= this.qtd_dots; i += 1) {
            this.obj_drawer.drawRect(0, i, 10, 2)
        }
    }

    // limpa o gráfico
    clearPlane() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.configPlane()
    }

    draw(equation, upper_limit, under_limit, divisions, direction) {
        this.clearPlane()
        this.drawPlane()
        
        // desenhar gráfico 
        this.obj_drawer.drawAreaUnderFunction(under_limit, upper_limit, divisions, equation, direction)     // desenha as divisões da soma de riemann
        this.plotEquationByLine(equation, 'blue')                                                           // desenha a função 
        this.obj_drawer.drawLimits(under_limit, upper_limit, equation)                                      // desenha os pontos de limite escolhidos 
    }

}