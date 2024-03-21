class ObjectDrawer {

    constructor(ctx, unity){
        this.ctx = ctx
        this.unity = unity
    }

    drawRect(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        x *= this.unity
        y *= this.unity
        this.ctx.fillRect(x-width/2, -y-height/2, width, height); // o ponto de ancoragem dos elementos fica na base esquerda -> para desenhá-los no centro, sua posição fica (posX-largura/2, posY-altura/2) 
        
        //resetar cor após desenhar
        this.ctx.fillStyle = "rgb(0, 0, 0)";
    }

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

    drawSquare(x, y, width, height, strokeColor, fillColor) {

        x *= this.unity
        y *= this.unity
        width *= this.unity
        height *= this.unity

        this.ctx.strokeStyle = strokeColor; // Cor da borda
        this.ctx.fillStyle = fillColor; // Cor do preenchimento
        this.ctx.lineWidth = 2; // Largura da borda

        this.ctx.beginPath();
        this.ctx.rect(x, y, width, -height);
        this.ctx.stroke(); // Desenha a borda
        this.ctx.fill(); // Preenche o retângulo
        this.ctx.closePath();
    }

    drawAreaUnderFunction(under_limit, upper_limit, num_divisions, equation) {
        var delta_Xi = (upper_limit - under_limit) / num_divisions

        for(var rep = 0; rep < num_divisions; rep++) {
            // calcular x inicial do retângulo
            var X_rect = under_limit + rep * delta_Xi

            // calcular ponto médio do x do retângulo
            var Ci = X_rect + delta_Xi / 2

            // calcular altura do retângulo
            var height_rect = eval(equation.replace(/x/ig, Ci))

            if (height_rect) {
                this.drawSquare(X_rect, 0, delta_Xi, height_rect, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
            }

            // desenhar retângulo
        }
    }
}