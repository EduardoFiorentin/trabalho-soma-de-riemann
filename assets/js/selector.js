function changeSelection() {
    // pegar seletores 
    const selector = document.getElementById("mode__selector").value

    // pegar locais que atualizam na seleção 
    const local_sum = document.getElementById("riemann_sum-container")
    const local_curves = document.getElementById("level_curves-container")

    // verificar e adicionar/remover classes 
    if (selector === "curvas") {
        local_curves.removeAttribute("class")
        local_sum.setAttribute("class", "hide__container")
    } 
    else if (selector === "soma") {
        local_sum.removeAttribute("class")
        local_curves.setAttribute("class", "hide__container")
    }
}