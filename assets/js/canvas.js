function start() {
    const graphic = new Plane
    graphic.drawPlane()
}

function draw() {
    // coleta dos dados 
    let equation = document.getElementById("equation").value
    let under_limit = document.getElementById("under_limit").value
    let upper_limit = document.getElementById("upper_limit").value
    let divisions = document.getElementById("divisions").value
    let direction = document.getElementById("equation__select").value

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
    graphic.drawFunction(equation, upper_limit, under_limit, divisions, direction)

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
        this.unity = 40                                                 // quantos pixels equivalem a uma unidade no gráfico

        this.qtd_dots = Math.floor(this.size[0] / 2 / this.unity)       // largura do gráfico na unidade de medida padrão 
        this.precision = 0.11                                           // precisão da linha de desenho da função
        
        this.obj_drawer = new ObjectDrawer(this.ctx, this.unity, this.qtd_dots, this.precision) 
        this.configPlane()
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

    // método chamado para plotar função
    drawFunction(equation, upper_limit, under_limit, divisions, direction) {
        this.clearPlane()
        this.drawPlane()
        console.log(equation)
        // desenhar gráfico 
        this.obj_drawer.drawAreaUnderFunction(under_limit, upper_limit, divisions, equation, direction)     // desenha as divisões da soma de riemann
        this.obj_drawer.plotEquationByLine(equation, 'blue')                                                // desenha a função 
        this.obj_drawer.drawLimits(under_limit, upper_limit, equation)                                      // desenha os pontos de limite escolhidos 
    }

}