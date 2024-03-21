function formatEquations(equation) {
    // algebricas
    // equation.replace("")

    // sen
    equation = equation.replace(/sen\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.sin($1)")
    
    // cos
    equation = equation.replace(/cos\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.cos($1)")
    
    // tg 
    equation = equation.replace(/tg\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.tan($1)")
    
    // log
    equation = equation.replace(/log\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.log($1)")
    
    // exp
    equation = equation.replace(/exp\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.exp($1)")
    
    // abs
    equation = equation.replace(/mod\(([A-Za-z1-9\*\+\-\/\s]+)\)/g, "Math.abs($1)")


    return equation
}