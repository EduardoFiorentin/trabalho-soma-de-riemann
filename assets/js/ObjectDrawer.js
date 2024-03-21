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

    drawSquare(x, y, width, height) {
        
    }
}