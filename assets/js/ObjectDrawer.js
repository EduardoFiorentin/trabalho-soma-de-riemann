// objeto usado para fazer desenhos no gráfico  
class ObjectDrawer {

    constructor(ctx, unity){
        this.ctx = ctx
        this.unity = unity
    }

    // desenha retângulo no gráfico
    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        x *= this.unity
        y *= this.unity
        this.ctx.fillRect(x-width/2, -y-height/2, width, height); // o ponto de ancoragem dos elementos fica na base esquerda -> para desenhá-los no centro, sua posição fica (posX-largura/2, posY-altura/2) 
        
        //resetar cor após desenhar
        this.ctx.fillStyle = "rgb(0, 0, 0)";
    }

    // desenha circulo/ponto no gráfico 
    drawDot(x, y, radious, color) {
        this.ctx.fillStyle = color;
        x *= this.unity
        y *= this.unity

        this.ctx.beginPath();
        this.ctx.arc(x, -y, radious, 0, 2*Math.PI); 
        this.ctx.fill();
        this.ctx.closePath();

        //resetar cor após desenhar
        this.ctx.fillStyle = "rgb(0, 0, 0)";
    }
    // desenha retângulos com preenchimento
    drawSquare(x, y, width, height, strokeColor, fillColor) {

        x *= this.unity
        y *= this.unity
        width *= this.unity
        height *= this.unity

        this.ctx.strokeStyle = strokeColor;     // Cor da borda
        this.ctx.fillStyle = fillColor;         // Cor do preenchimento
        this.ctx.lineWidth = 2;                 // Largura da borda

        this.ctx.beginPath();
        this.ctx.rect(x, y, width, -height);
        this.ctx.stroke();                      // Desenha a borda
        this.ctx.fill();                        // Preenche o retângulo
        this.ctx.closePath();
    }

    // calcula e desenha os retângulos da soma de riemann
    drawAreaUnderFunction(under_limit, upper_limit, num_divisions, equation, direction) {
        var delta_Xi = (upper_limit - under_limit) / num_divisions
        // var riemann_sum = 0

        for(var rep = 0; rep < num_divisions; rep++) {
            // calcular x inicial do retângulo
            var X_rect = under_limit + rep * delta_Xi

            var Ci = 0
            if (direction === "centro") {
                // altura y ao centro do retângulo
                Ci = X_rect + delta_Xi / 2
            } 
            else if (direction === "direita"){
                // altura y à esquerda do retângulo
                Ci = X_rect + delta_Xi
            }
            else if (direction === "esquerda"){
                //altura y à direita do retângulo
                Ci = X_rect
            }


            // calcular altura do retângulo
            var height_rect = eval(equation.replace(/x/ig, Ci))

            if (height_rect) {
                this.drawSquare(X_rect, 0, delta_Xi, height_rect, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
                // console.log(delta_Xi, height_rect)
                // riemann_sum += Math.abs(delta_Xi * height_rect)
            }

            
            // desenhar retângulo
        }
        // console.log("Soma de riemman: ", riemann_sum.toFixed(2))
    }

    drawLimits(under_limit, upper_limit, equation) {
        let under_limit_y = -1 * eval(equation.replace(/x/ig, under_limit)) * this.unity
        let under_limit_x = under_limit * this.unity
        
        let upper_limit_y = -1 * eval(equation.replace(/x/ig, upper_limit)) * this.unity
        let upper_limit_x = upper_limit * this.unity

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";

        // desenhar pontilhado limite inferior
        this.ctx.moveTo(under_limit_x, 0);
        this.ctx.lineTo(under_limit_x, under_limit_y)

        // desenhar pontilhado limite superior
        this.ctx.moveTo(upper_limit_x, 0);
        this.ctx.lineTo(upper_limit_x, upper_limit_y)


        // desenhar linhas 
        this.ctx.stroke();
        this.ctx.closePath();

        // desenhar ponto nos limites 
        this.drawDot(under_limit_x / this.unity, -under_limit_y / this.unity, 5, 'black')
        this.drawDot(upper_limit_x / this.unity, -upper_limit_y / this.unity, 5, 'black')
    }
}