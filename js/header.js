document.addEventListener('DOMContentLoaded', () => {
    fetch('/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Agora que o header foi carregado, identifica a página atual
            const path = window.location.pathname;
            const links = document.querySelectorAll('#header-placeholder a');

            links.forEach(link => {
                if (link.getAttribute('href') === path) {
                    link.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Erro ao carregar o header:', error));
});