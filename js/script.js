const itensInput = document.querySelectorAll("input");
const itensHidden = document.querySelectorAll("div[hidden]");

const calculoInvestimento = () => {
    // M = C (1+i)^t

    const investimentoMensal =
        parseFloat(document.querySelector(".investimento-mensal").value) > 0 ?
        parseFloat(document.querySelector(".investimento-mensal").value) : 0;
    const investimentoInicial =
        parseFloat(document.querySelector(".investimento-inicial").value) > 0 ?
        parseFloat(document.querySelector(".investimento-inicial").value) :
        0;
    const periodo = parseInt(document.querySelector(".periodo").value);
    const tx = parseFloat(document.querySelector(".tx").value / 100);
    let montante = investimentoInicial * Math.pow(1 + tx, periodo);

    for (let i = 0; i < periodo; i++) {
        montante += investimentoMensal * Math.pow(1 + tx, i);
    }

    const valorInvestido = investimentoMensal * periodo + investimentoInicial;
    const rendimento = montante - valorInvestido;

    if (montante) {
        document.querySelector("#valor-investido").innerHTML = moedaFormatada(valorInvestido);
        document.querySelector("#rendimento").innerHTML = moedaFormatada(rendimento);
        document.querySelector("#montante").innerHTML = moedaFormatada(montante);

        for (const item of itensHidden) {
            item.removeAttribute("hidden");
        }
    }
};

document.querySelector("button").onclick = calculoInvestimento;

const moedaFormatada = valor =>
    parseFloat(valor).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });

for (const item of itensInput) {
    item.addEventListener("input", e => e.currentTarget.value = e.currentTarget.value
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1")
    );
}

document.querySelector("#limpar").addEventListener("click", () => {
    for (const item of itensInput) item.value = "";
    document.querySelector('#container-resultado').setAttribute('hidden', true)
});