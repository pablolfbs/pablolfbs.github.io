document.querySelector('#botao-cotacao').addEventListener('click', () => window.location.href = 'cotacao-moedas.html')

// document.querySelector('#botao-calculadora').addEventListener('click', () => window.location.href = 'calculadora.html')

document.querySelector('#botao-calculadora-financeira').addEventListener('click', () => window.location.href = 'calculadora-financeira.html')

document.querySelector('#botao-conversor').addEventListener('click', () => window.location.href = 'conversor-valores.html')

// fetch('https://api.github.com/search/repositories?q=javascript')
//     .then(response => console.log('Response: ', response.json()))

// fetch("./header.html")
//     .then(response => {
//         return response.text()
//     })
//     .then(data => {
//         document.querySelector("header").innerHTML = data;
//     });

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