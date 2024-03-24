function formatEquations(equation) {
    // algebricas
    // equation.replace("")

    // sen
    equation = equation.replace(/sen\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sin($1)")
    
    // cos
    equation = equation.replace(/cos\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cos($1)")
    
    // tg 
    equation = equation.replace(/tg\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.tan($1)")
   
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