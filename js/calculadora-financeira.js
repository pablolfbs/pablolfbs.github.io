const itensInput = document.querySelectorAll("input")
const itensHidden = document.querySelectorAll("div[hidden]")

let investimentoInicial = SimpleMaskMoney.setMask('.investimento-inicial');
let investimentoMensal = SimpleMaskMoney.setMask('.investimento-mensal');
let tx = SimpleMaskMoney.setMask('.tx');

const calculoInvestimento = () => {
    // M = C (1+i)^t

    investimentoMensal = valorFormatado(document.querySelector(".investimento-mensal").value)
    investimentoInicial = valorFormatado(document.querySelector(".investimento-inicial").value)
    const periodo = document.querySelector(".periodo").value <= 720 ? valorFormatado(document.querySelector(".periodo").value) : alert('Período não pode ser maior que 720 meses')
    tx = valorFormatado(document.querySelector(".tx").value) / 100
    let montante = investimentoInicial * Math.pow(1 + tx, periodo)

    for (let i = 0; i < periodo; i++) {
        montante += investimentoMensal * Math.pow(1 + tx, i)
    }

    const valorInvestido = parseFloat(investimentoMensal) * parseFloat(periodo) + parseFloat(investimentoInicial)
    const rendimento = montante - valorInvestido

    if (montante) {
        document.querySelector("#valor-investido").innerHTML = moedaFormatada(valorInvestido)
        document.querySelector("#rendimento").innerHTML = moedaFormatada(rendimento)
        document.querySelector("#montante").innerHTML = moedaFormatada(montante)

        for (const item of itensHidden) item.removeAttribute("hidden")
    }
}

document.querySelector("#calcular").onclick = calculoInvestimento

const valorFormatado = valor => {
    return valor.substring(0, valor.length - 3).replaceAll('.', '') + valor.substring(valor.length - 3, valor.length).replace(',', '.');
}

const moedaFormatada = valor => parseFloat(valor).toLocaleString("pt-br", { style: "currency", currency: "BRL" })

// for (const item of itensInput) {
//     item.addEventListener("input", e => e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1"))
// }

document.querySelector("#limpar").addEventListener("click", () => {
    for (const item of itensInput) item.value = ""
    document.querySelector('#container-resultado').setAttribute('hidden', true)
})

document.addEventListener("keyup", e => { if (e.key === 'Enter') calculoInvestimento() })