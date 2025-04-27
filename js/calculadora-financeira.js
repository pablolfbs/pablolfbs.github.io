const itensInput = document.querySelectorAll("input");
const itensHidden = document.querySelectorAll("div[hidden]");

const inputInvestimentoInicial = document.querySelector(".investimento-inicial");
const inputInvestimentoMensal = document.querySelector(".investimento-mensal");
const inputTx = document.querySelector(".tx");
const inputPeriodo = document.querySelector(".periodo");

// Máscara manual nos inputs
const aplicarMascaraMoeda = (inputElement) => {
    inputElement.addEventListener('input', () => {
        let valor = inputElement.value.replace(/\D/g, '');
        if (!valor) valor = '0';
        let valorNumerico = parseFloat(valor) / 100;
        inputElement.value = valorNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
};

// Aplica a máscara nos campos
aplicarMascaraMoeda(inputInvestimentoInicial);
aplicarMascaraMoeda(inputInvestimentoMensal);
aplicarMascaraMoeda(inputTx);

// Funções de formatação
const valorFormatado = (inputElement) => {
    const valor = inputElement.value.replace(/\D/g, '');
    return parseFloat(valor) / 100;
};

const moedaFormatada = (valor) => parseFloat(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Função de cálculo
const calculoInvestimento = () => {
    // M = C (1+i)^t
    const investimentoMensal = valorFormatado(inputInvestimentoMensal);
    const investimentoInicial = valorFormatado(inputInvestimentoInicial);
    const taxa = valorFormatado(inputTx) / 100;
    const periodo = parseInt(inputPeriodo.value);

    if (isNaN(periodo) || periodo <= 0) {
        alert("Período inválido!");
        return;
    }
    if (periodo > 720) {
        alert("Período não pode ser maior que 720 meses!");
        return;
    }

    let montante = investimentoInicial * Math.pow(1 + taxa, periodo);

    for (let i = 0; i < periodo; i++) {
        montante += investimentoMensal * Math.pow(1 + taxa, i);
    }

    const valorInvestido = (investimentoMensal * periodo) + investimentoInicial;
    const rendimento = montante - valorInvestido;

    if (!isNaN(montante)) {
        document.querySelector("#valor-investido").innerHTML = moedaFormatada(valorInvestido);
        document.querySelector("#rendimento").innerHTML = moedaFormatada(rendimento);
        document.querySelector("#montante").innerHTML = moedaFormatada(montante);

        for (const item of itensHidden) item.removeAttribute("hidden");
    }
};

// Função de limpar os campos
const limparCampos = () => {
    inputInvestimentoInicial.value = '0,00';
    inputInvestimentoMensal.value = '0,00';
    inputTx.value = '0,00';
    inputPeriodo.value = '';

    document.querySelector('#container-resultado').setAttribute('hidden', true);
};

// Event Listeners
document.querySelector("#calcular").onclick = calculoInvestimento;
document.querySelector("#limpar").onclick = limparCampos;
document.addEventListener("keyup", (e) => { if (e.key === 'Enter') calculoInvestimento(); });

// Dark Mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Quando a página carrega
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }
};