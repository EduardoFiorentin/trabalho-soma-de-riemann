
// substitui a notação simplificada das funções pela estrutura executável de código JS
function formatEquations(equation) {

    equation = equation
    .replace(/([1-9])([sen])/g, "$1*$2")
    .replace(/([1-9])([cos])/g, "$1*$2")
    .replace(/([1-9])([tg])/g, "$1*$2")

    // sen
    .replace(/sen\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sin($1)")
    
    // cos
    .replace(/cos\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cos($1)")
    
    // tg 
    .replace(/tg\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.tan($1)")
    
    // senh
    .replace(/senh\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sinh($1)")
    
    // cosh
    .replace(/cosh\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cosh($1)")
    
    //tgh
    .replace(/tgh\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.tanh($1)")
   
    // ln
    .replace(/ln\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log($1)")

    // log na base 2
    .replace(/log2\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log2($1)")
    
    // log na base 10
    .replace(/log10\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log10($1)")
    
    
    // raiz quadrada 
    .replace(/raiz2\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sqrt($1)")
    
    // raiz cubica
    .replace(/raiz3\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cbrt($1)")
    
    // abs
    .replace(/mod\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.abs($1)")

    .replace(/(\d)x/g, "$1*x")
    .replace(/(\d)y/g, "$1*y")

    .replace(/(x)\*\*/g, "($1)**")
    .replace(/(y)\*\*/g, "($1)**")
    
    .replace(/-/g, "-1 * ")


    return equation
}