class AreaCalculator {
    constructor(){}
    calculateRiemannSum(under_limit, upper_limit, num_divisions, equation, direction) {
        var delta_Xi = (upper_limit - under_limit) / num_divisions
        var soma_riemann = 0

        for(var rep = 0; rep < num_divisions; rep++) {
            // calcular x inicial do retângulo
            var X_rect = under_limit + rep * delta_Xi

            // calcular ponto médio do x do retângulo
            // var Ci = X_rect + delta_Xi / 2

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

            // se o retângulo existe (dentro do domínio da função), adicionar sua área a soma
            if (height_rect) {
                soma_riemann += Math.abs(delta_Xi * height_rect)
            }
        }
        return soma_riemann.toFixed(2)
    }
}