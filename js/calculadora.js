let valor1 = '';
let valor2 = '';
let operadorAtual = '';
let ultimaTecla = '';

document.getElementById('calculadora').addEventListener('click', (e) => {
    if(document.getElementById('resultado').value == 0) {
        document.getElementById('resultado').value = e.target.value = '';
    }

    const target = e.target;
    const text = target.innerText.trim();

    if (!text) return; // Se clicou fora de um botão, ignora

    const resultado = document.getElementById('resultado');
    const spanCalculo = document.getElementById('span-calculo');

    if (!isNaN(text) || text === ',') {
        // Se é número ou vírgula
        resultado.value += text;

        if (operadorAtual) {
            valor2 = resultado.value;
        } else {
            valor1 = resultado.value;
        }
    } else if (text === '+' || text === '-' || text === 'x' || text === '/') {
        if (valor1 && valor2 && operadorAtual) {
            fazCalculo();
        }
        operadorAtual = text;
        spanCalculo.innerHTML += resultado.value + ' ' + operadorAtual + ' ';
        resultado.value = '';
    } else if (text === '=') {
        if (valor1 && operadorAtual && resultado.value) {
            valor2 = resultado.value;
            fazCalculo();
            spanCalculo.innerHTML = '';
            operadorAtual = '';
        }
    } else if (text === 'C') {
        limparTudo();
    }

    ultimaTecla = text;
});

const fazCalculo = () => {
    const num1 = parseFloat(valor1.replace(',', '.'));
    const num2 = parseFloat(valor2.replace(',', '.'));

    if (isNaN(num1) || isNaN(num2)) {
        return;
    }

    let resultado = 0;

    switch (operadorAtual) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case 'x':
            resultado = num1 * num2;
            break;
        case '/':
            resultado = num1 / num2;
            break;
        default:
            return;
    }

    resultado = resultado.toString().replace('.', ',');

    document.getElementById('resultado').value = resultado;
    valor1 = resultado;
    valor2 = '';
};

const limparTudo = () => {
    valor1 = '';
    valor2 = '';
    operadorAtual = '';
    ultimaTecla = '';
    document.getElementById('resultado').value = '0';
    document.getElementById('span-calculo').innerHTML = '';
};

// Dark Mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Ao carregar a página, aplica o tema salvo
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }
};
