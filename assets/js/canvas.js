function start() {
    const graphic = new Plane
    graphic.drawPlane()
    changeSelection()
    
}

function draw() {
    // coleta dos dados 
    let under_limit = document.getElementById("under_limit").value
    let upper_limit = document.getElementById("upper_limit").value
    let divisions = document.getElementById("divisions").value
    let direction = document.getElementById("equation__select").value
    let mode = document.getElementById("mode__selector").value
    
    let sum_response_path = document.getElementById('sum_response')
    
    
    // seleção da equação 
    let equation 
    if (mode === "soma") {
        equation = document.getElementById("equation__sum").value
    }
    else if (mode == "curvas") {
        equation = document.getElementById("equation__curves").value
    }

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
            !eval(equation.replace(/x/ig, 1).replace(/y/ig, 1))
        } catch (err) {
            alert("Equação inválida!")
            return;
        }

    } else {
        alert("Informações faltando!") 
        return;
    }

    const graphic = new Plane
    
    // mode: gráfico de função f(x) com soma de riemann 
    if (mode === "soma") {
        // plotar gráfico 
        graphic.drawFunction(equation, upper_limit, under_limit, divisions, direction)
        
        // calcular área
        // let riemann_sum = 0
        const calc = new AreaCalculator
        let riemann_sum = calc.calculateRiemannSum(under_limit, upper_limit, divisions, equation, direction)
    
        //imprimir resultados 
        sum_response_path.innerText = riemann_sum ? riemann_sum : "Não calculado"
    }
    else if (mode === "curvas") {
        // pegar níveis selecionados 
        let levels = {
            "-3": document.getElementById("-3").checked,
            "-2": document.getElementById("-2").checked,
            "-1": document.getElementById("-1").checked,
            "0": document.getElementById("0").checked,
            "1": document.getElementById("1").checked,
            "2": document.getElementById("2").checked,
            "3": document.getElementById("3").checked
        }

        // gerar cuvas 
        let program = document.getElementById("program")
        program.classList.add("loading")
        graphic.drawLevelCurves(equation, levels)
        console.log("passou")
        program.classList.remove("loading")
    }
}


class Plane {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")

        this.size = [this.canvas.width, this.canvas.height]             // tamanho da área de desenho (em pixels)

        // unidade de medida - número maior = mais zoom no gráfico
        this.unity = 80                                                 // quantos pixels equivalem a uma unidade no gráfico

        this.qtd_dots = Math.floor(this.size[0] / 2 / this.unity)       // largura do gráfico na unidade de medida padrão 
        this.curves_precision = 0.0011                                       // precisão para curvas de nível
        this.sum_precision = 0.0003                                      // precisão para funções de uma variavel
        // this.precision = 0.001                                            // precisão para testes 
        
        this.obj_drawer = new ObjectDrawer(this.ctx, this.unity, this.qtd_dots, this.sum_precision, this.curves_precision) 
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
        this.obj_drawer.plotEquationByLine(equation, "blue")
        this.obj_drawer.drawLimits(under_limit, upper_limit, equation)                                      // desenha os pontos de limite escolhidos 
    }

    drawLevelCurves(equation, levels) {
        this.clearPlane()
        this.drawPlane()
        console.log(equation)

        let color = {
            "-3": "violet",
            "-2": "brown",
            "-1": "gray",
            "0": "green",
            "1": "red",
            "2": "purple",
            "3": "blue" 
        }


        Object.keys(levels).forEach(level => {
            
            if (levels[level]) this.obj_drawer.plotLevelCurves(equation, color[level], parseInt(level))
        })

        alert("Finalizado!")

    }

}