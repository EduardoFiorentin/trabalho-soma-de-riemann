function start() {
    const draw = new Plane
    draw.start()
}


class Plane {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext("2d")
        this.size = [this.canvas.width, this.canvas.height]
        this.unity = 40 // quantos pixels equivalem a uma unidade no gráfico
        this.obj_drawer = new ObjectDrawer(this.ctx, this.unity)
        this.qtd_dots = Math.floor(this.size[0] / 2 / this.unity)
    }

    start() {
        this.drawPlane()
        this.usePlane()
    }
    
    

    plotEquation(equation, color) {
        for (var x = -this.qtd_dots; x <= this.qtd_dots; x+=0.01) {
            this.obj_drawer.drawDot(x, eval(equation.replace(/x/ig, x)), 1, color)
        }
    }
    
    drawPlane() {
        // transladar ponto (0, 0) para o centro da tela 
        this.ctx.translate(this.size[0]/2, this.size[1]/2)
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

    usePlane() {
        // this.plotEquation('(@x)**2', 'red')
        // this.obj_drawer.drawSquare(1, 0, 0.5, 2, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(1.5, 0, 0.5, 2.5, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(2, 0, 0.5, 2, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(2.5, 0, 0.5, 1.5, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(3, 0, 0.5, 1, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(3.5, 0, 0.5, 0.5, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
        // this.obj_drawer.drawSquare(4, 0, 0.5, 0.3, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")

        var equation = "1 / x"
        equation = formatEquations(equation)
        console.log(equation)

        var under_limit = -5
        var upper_limit = 5
        var divisions = 10

        // problema de domínio
        // sqrt
        // log


        this.obj_drawer.drawAreaUnderFunction(under_limit, upper_limit, divisions, equation)
        this.plotEquation(equation, 'blue')
    }

}




// desenhar quadrados
// ctx.fillStyle = "rgb(200,0,0)"; // cor
// ctx.fillRect(10, 10, 55, 50); // (Dx, Dy, W, H)