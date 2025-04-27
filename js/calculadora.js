const zero = document.getElementById('0').innerHTML;
const um = document.getElementById('1').innerHTML;
const dois = document.getElementById('2').innerHTML;
const tres = document.getElementById('3').innerHTML;
const quatro = document.getElementById('4').innerHTML;
const cinco = document.getElementById('5').innerHTML;
const seis = document.getElementById('6').innerHTML;
const sete = document.getElementById('7').innerHTML;
const oito = document.getElementById('8').innerHTML;
const nove = document.getElementById('9').innerHTML;
const soma = document.getElementById('+').innerHTML;
const subtracao = document.getElementById('-').innerHTML;
const multiplicacao = document.getElementById('x').innerHTML;
const divisao = document.getElementById('/').innerHTML;
let ultima = ''
let valor1 = ''
let valor2 = ''

document.getElementById('calculadora').addEventListener('click', e => {
    e = e || window.event;
    const target = e.target
    const text = target.innerText;

    let res = ''
    let operador = ''

    if (!isNaN(text) || text === ',') {
        document.getElementById('resultado').value += text
        if (valor1)
            valor2 = document.getElementById('resultado').value
        else
            valor1 = document.getElementById('resultado').value
    } else {
        document.getElementById('span-calculo').innerHTML += document.getElementById('resultado').value + ' ' + text
    }
    if (ultima === '+') {
        document.getElementById('resultado').value = ''
        document.getElementById('resultado').value += text
        fazCalculo()
    }

    ultima = text

}, false)

const fazCalculo = () => {
    console.log(valor1 + valor2)
    valor1 = ''
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Salvar a escolha
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Quando a página carrega, aplicar o tema salvo
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }
};   