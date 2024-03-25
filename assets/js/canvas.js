function start() {
    const graphic = new Plane
    graphic.drawPlane()
}

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

    let sum_response_path = document.getElementById('sum_response')
    let integral_response_path = document.getElementById('integral_response')

    let calculate_button = document.getElementById('calculate__button')

    // validação e tratamentos 
    if (equation && under_limit && upper_limit && divisions) {
        // equation = equation.replace(/x/gi, "(x)")
        under_limit = parseFloat(under_limit)
        upper_limit = parseFloat(upper_limit)
        divisions = parseInt(divisions)

        // limitar numero de divisões
        if (divisions > 1000) {
            alert("O máximo são 1000 divisões!")
            return;
        }

        // limite superior sempre maior que o inferior
        if (upper_limit < under_limit) {
            alert("O limite superior deve ser menor do que o limite inferior!")
            return;
        }

        equation = formatEquations(equation)
        
        // verifica a validade da equação 
        try {
            !eval(equation.replace(/x/ig, 1))
        } catch (err) {
            alert("Equação inválida!")
            return;
        }

        console.log(equation, (under_limit), (upper_limit), divisions)

    } else {
        alert("Informações faltando!") 
        return;
    }

    // desenho
    const graphic = new Plane
    const calc = new AreaCalculator

    console.log(calculate_button)
    calculate_button.innerHTML = "<p>Calculando...</p>"
    console.log(calculate_button)

    graphic.draw(equation, upper_limit, under_limit, divisions)
    let riemann_sum = calc.calculateRiemannSum(under_limit, upper_limit, divisions, equation)
    // let real_area = calc.calculateRealArea(under_limit, upper_limit, equation)

    //imprimir resultados 
    // console.log(riemann_sum)
    sum_response_path.innerText = riemann_sum ? riemann_sum : " Não calculado"
    // integral_response_path.innerText = real_area ? real_area : " Não calculado"
    calculate_button.innerHTML = "<p>Calcular</p>"
}


class Plane {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.size = [this.canvas.width, this.canvas.height]
        this.unity = 30 // quantos pixels equivalem a uma unidade no gráfico
        this.obj_drawer = new ObjectDrawer(this.ctx, this.unity)
        this.qtd_dots = Math.floor(this.size[0] / 2 / this.unity)
        this.precision = 0.01

        this.configPlane()
    }

    plotEquationByDots(equation, color) {
        for (var x = -this.qtd_dots; x <= this.qtd_dots; x+=this.precision) {
            this.obj_drawer.drawDot(x, eval(equation.replace(/x/ig, x)), 1, color)
        }
    }

    plotEquationByLine(equation, color) {

        let start_x = -this.qtd_dots
        let start_y = eval(equation.replace(/x/ig, start_x))

        console.log(start_x, -start_y)

        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(start_x * this.unity, -start_y * this.unity);

        // let last_dot = [start_x, start_y]; 
        let last_x = start_x
        let last_y = -start_y
        let cut_line = -1
        let dist = 0

        for (var x = -this.qtd_dots; x <= this.qtd_dots; x+=this.precision) {
            let y = eval(equation.replace(/x/ig, x))
            
            dist = calcularDistancia(last_x, -last_y, x, -y)
            
            if (dist > 40) {
                this.ctx.moveTo(x * this.unity, -y * this.unity)
                console.log("moveTo")
            } else {
                // console.log(equation.replace(/x/gi, x), eval(equation.replace(/x/ig, x)))
                this.ctx.lineTo(x * this.unity, -y * this.unity)
                // this.obj_drawer.drawDot(x, eval(equation.replace(/x/ig, x)), 1, color)
            }
            
            // console.log('dist ', calcularDistancia(last_x, last_y, x, y))
            last_x = x
            last_y = -y
        }
            
        this.ctx.stroke();
        this.ctx.closePath();
    }
    
    configPlane() {
        this.ctx.translate(this.size[0]/2, this.size[1]/2)
    }

    drawPlane() {
        // transladar ponto (0, 0) para o centro da tela 
        console.log(this.qtd_dots)
        
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
        
        // desenhar pontos de referência no y
        this.ctx.stroke(); // Renderiza a linha no canvas
        this.ctx.closePath(); // Finaliza o caminho
        
        // desenhar pontos de referência 
        for (var i = -this.qtd_dots; i <= this.qtd_dots; i += 1) {
            this.obj_drawer.drawRect(i, 0, 2, 10)
        }
        for (var i = -this.qtd_dots; i <= this.qtd_dots; i += 1) {
            this.obj_drawer.drawRect(0, i, 10, 2)
        }
    }

    clearPlane() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.configPlane()
        // let inicio_x = -this.size[0]
        // let fim_x = this.size[0]
        // let inicio_y = this.size[1]
        // let fim_y = -this.size[1]
        // console.log(inicio_x, inicio_y, fim_x, fim_y)
        // this.ctx.clearRect(inicio_x, inicio_y, fim_x, fim_y)
        // this.obj_drawer.drawRect(-this.size[0]/2, this.size[1]/2, this.size[0]/2, -this.size[1]/2, 'yellow')
    }

    // usePlane() {
        // this.plotEquation('(@x)**2', 'red')
        // this.obj_drawer.drawSquare(1, 0, 0.5, 2, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(1.5, 0, 0.5, 2.5, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(2, 0, 0.5, 2, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(2.5, 0, 0.5, 1.5, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(3, 0, 0.5, 1, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(3.5, 0, 0.5, 0.5, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(4, 0, 0.5, 0.3, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")

        // var equation = "2"
        // equation = formatEquations(equation)
        // console.log(equation)

        // var under_limit = -5
        // var upper_limit = 5
        // var divisions = 10

        // problema de domínio
        // sqrt
        // log


        // this.obj_drawer.drawAreaUnderFunction(under_limit, upper_limit, divisions, equation)
        // this.plotEquationByDots(equation, 'blue')
        // this.obj_drawer.drawLimits(under_limit, upper_limit, equation)
    // }

    draw(equation, upper_limit, under_limit, divisions) {
        this.clearPlane()
        this.drawPlane()
        // this.drawPlane()
        // formatar equação 
        
        

        // desenhar gráfico 
        this.obj_drawer.drawAreaUnderFunction(under_limit, upper_limit, divisions, equation)
        // this.plotEquationByDots(equation, 'blue')
        console.log(equation)
        this.plotEquationByLine(equation, 'blue')
        this.obj_drawer.drawLimits(under_limit, upper_limit, equation)
    }

}




// desenhar quadrados
// ctx.fillStyle = "rgb(200,0,0)"; // cor
// ctx.fillRect(10, 10, 55, 50); // (Dx, Dy, W, H)