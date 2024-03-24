class AreaCalculator {
    constructor(){

    }

    calculateRiemannSum(under_limit, upper_limit, num_divisions, equation) {
        var delta_Xi = (upper_limit - under_limit) / num_divisions
        var riemann_sum = 0
        // equation = formatEquations(equation)

        for(var rep = 0; rep < num_divisions; rep++) {
            // calcular x inicial do retângulo
            var X_rect = under_limit + rep * delta_Xi

            // calcular ponto médio do x do retângulo
            var Ci = X_rect + delta_Xi / 2

            // calcular altura do retângulo
            var height_rect = eval(equation.replace(/x/ig, Ci))

            if (height_rect) {
                // this.drawSquare(X_rect, 0, delta_Xi, height_rect, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
                // console.log(delta_Xi, height_rect)
                riemann_sum += Math.abs(delta_Xi * height_rect)
                // riemann_sum += (delta_Xi * height_rect)
            }

            
            // desenhar retângulo
        }
        return riemann_sum.toFixed(2)
    }

    calculateRealArea(under_limit, upper_limit, equation) {
        // equation = formatEquations(equation)
        let try_divisions = 1000 * Math.abs(upper_limit - under_limit)
        let num_divisions = try_divisions < 2000 ? 1000 * Math.abs(upper_limit - under_limit) : 2000

        var delta_Xi = (upper_limit - under_limit) / num_divisions
        var area = 0

        for(var rep = 0; rep < num_divisions; rep++) {
            // calcular x inicial do retângulo
            var X_rect = under_limit + rep * delta_Xi

            // calcular ponto médio do x do retângulo
            var Ci = X_rect + delta_Xi / 2

            // calcular altura do retângulo
            console.log('here: ', equation)
            var height_rect = eval(equation.replace(/x/ig, Ci))

            if (height_rect) {
                // this.drawSquare(X_rect, 0, delta_Xi, height_rect, "rgb(255, 0, 0)", "rgba(255, 0, 0, 0.5)")
                // console.log(delta_Xi, height_rect)
                // riemann_sum += Math.abs(delta_Xi * height_rect)
                area += Math.abs(delta_Xi * height_rect)
            }

            
            // desenhar retângulo
        }
        return area.toFixed(2)
    }
}