function formatEquations(equation) {
    // algebricas
    // equation.replace("")

    equation = equation.replace(/([1-9])([sen])/g, "$1*$2")
    equation = equation.replace(/([1-9])([cos])/g, "$1*$2")
    equation = equation.replace(/([1-9])([tg])/g, "$1*$2")

    console.log(equation)

    // sen
    equation = equation.replace(/sen\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sin($1)")
    
    // cos
    equation = equation.replace(/cos\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cos($1)")
    
    // tg 
    equation = equation.replace(/tg\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.tan($1)")
    
    // senh
    equation = equation.replace(/senh\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sinh($1)")
    
    // cosh
    equation = equation.replace(/cosh\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cosh($1)")
    
    //tgh
    equation = equation.replace(/tgh\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.tanh($1)")
   
    // equation = equation.replace(/ln\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log($1)")
    
    // ln
    equation = equation.replace(/ln\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log($1)")

    // log na base 2
    equation = equation.replace(/log2\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log2($1)")
    
    // log na base 10
    equation = equation.replace(/log10\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log10($1)")
    
    
    // raiz quadrada 
    equation = equation.replace(/raiz2\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sqrt($1)")
    
    // raiz cubica
    equation = equation.replace(/raiz3\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cbrt($1)")
    
    // e**x
    // equation = equation.replace(/exp\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.exp($1)")

    // exp
    // equation = equation.replace(/e\*\*\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.exp($1)")

    Math.exp
    
    // abs
    equation = equation.replace(/mod\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.abs($1)")

    equation = equation.replace(/(\d)x/g, "$1*x")

    equation = equation.replace(/(x)\*\*/g, "($1)**")
    
    equation = equation.replace(/-/g, "-1 * ")


    return equation
}