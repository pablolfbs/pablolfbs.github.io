const valorFormatado = (inputElement) => {
    const valor = inputElement.value;
    const valorNumerico = valor.replace(/\D/g, '');
    return parseFloat(valorNumerico) / 100;
};

// Formatadores para cada moeda
const valorFormatadoEmReal = valor => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
const valorFormatadoEmDolar = valor => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor);
const valorFormatadoEmEuro = valor => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valor);
const valorFormatadoEmLibra = valor => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(valor);
const valorFormatadoEmPeso = valor => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor);
const valorFormatadoEmBitcoin = valor => `₿ ${parseFloat(valor).toFixed(8)}`;

// Função para escolher o formatador baseado na moeda
const escolherFormatador = (sigla, invertido) => {
    if (invertido) {
        if (sigla.startsWith('BRL')) return valorFormatadoEmReal;
        if (sigla.startsWith('USD')) return valorFormatadoEmDolar;
        if (sigla.startsWith('EUR')) return valorFormatadoEmEuro;
        if (sigla.startsWith('GBP')) return valorFormatadoEmLibra;
        if (sigla.startsWith('ARS')) return valorFormatadoEmPeso;
        if (sigla.startsWith('BTC')) return valorFormatadoEmBitcoin;
    } else {
        if (sigla.endsWith('BRL')) return valorFormatadoEmReal;
        if (sigla.endsWith('USD')) return valorFormatadoEmDolar;
        if (sigla.endsWith('EUR')) return valorFormatadoEmEuro;
        if (sigla.endsWith('GBP')) return valorFormatadoEmLibra;
        if (sigla.endsWith('ARS')) return valorFormatadoEmPeso;
        if (sigla.endsWith('BTC')) return valorFormatadoEmBitcoin;
    }
    return valorFormatadoEmReal;
};

const loadValues = async () => {
    const selectMoedas = document.getElementById('select-moeda');
    selectMoedas.innerHTML = '<option>Carregando...</option>';
    selectMoedas.disabled = true;

    try {
        const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BRL-USD,BRL-EUR,GBP-BRL,BRL-GBP,ARS-BRL,BRL-ARS,BTC-BRL,BTC-USD");
        const values = await response.json();
        const moedas = montaObjeto(values);

        selectMoedas.disabled = false;
        selectMoedas.innerHTML = '';
        montaSelect(moedas, selectMoedas);
        montaListaMoedas(moedas);
        alteraValor(moedas);
        trocaMoeda(moedas);

        document.getElementById('valor-origem').value = valorFormatadoEmReal(1);
        document.getElementById('valor-destino').value = valorFormatadoEmReal(moedas[0].valor);

    } catch (error) {
        console.error(error);
        selectMoedas.innerHTML = '<option>Erro ao carregar moedas</option>';
    }
};

// Moedas disponíveis
const montaObjeto = (values) => [
    { nome: 'Dólar Americano → Real Brasileiro', sigla: 'USDBRL', valor: parseFloat(values['USDBRL'].ask) },
    { nome: 'Euro → Real Brasileiro', sigla: 'EURBRL', valor: parseFloat(values['EURBRL'].ask) },
    { nome: 'Real Brasileiro → Dólar Americano', sigla: 'BRLUSD', valor: parseFloat(values['BRLUSD'].ask) },
    { nome: 'Real Brasileiro → Euro', sigla: 'BRLEUR', valor: parseFloat(values['BRLEUR'].ask) },
    { nome: 'Libra Esterlina → Real Brasileiro', sigla: 'GBPBRL', valor: parseFloat(values['GBPBRL'].ask) },
    { nome: 'Real Brasileiro → Libra Esterlina', sigla: 'BRLGBP', valor: parseFloat(values['BRLGBP'].ask) },
    { nome: 'Peso Argentino → Real Brasileiro', sigla: 'ARSBRL', valor: parseFloat(values['ARSBRL'].ask) },
    { nome: 'Real Brasileiro → Peso Argentino', sigla: 'BRLARS', valor: parseFloat(values['BRLARS'].ask) },
    { nome: 'Bitcoin → Real Brasileiro', sigla: 'BTCBRL', valor: parseFloat(values['BTCBRL'].ask) },
    { nome: 'Bitcoin → Dólar Americano', sigla: 'BTCUSD', valor: parseFloat(values['BTCUSD'].ask) }
];

const montaSelect = (moedas, selectMoedas) => {
    moedas.forEach(m => {
        const option = new Option(m.nome, m.sigla);
        selectMoedas.add(option);
    });
};

const montaListaMoedas = (moedas) => {
    const lista = document.getElementById('ul-moedas');
    lista.innerHTML = '';
    moedas.forEach(m => {
        const li = document.createElement('li');
        li.textContent = `${m.nome}: ${valorFormatadoEmReal(m.valor)}`;
        lista.appendChild(li);
    });
};

const atualizaValorDestino = (moedas) => {
    const selectMoeda = document.getElementById('select-moeda').value;
    const valor = valorFormatado(document.getElementById('valor-origem'));
    const moedaSelecionada = moedas.find(m => m.sigla === selectMoeda);

    if (moedaSelecionada) {
        const formatador = escolherFormatador(selectMoeda, false);
        document.getElementById('valor-destino').value = formatador(valor * moedaSelecionada.valor);
    }
};

const atualizaValorOrigem = (moedas) => {
    const selectMoeda = document.getElementById('select-moeda').value;
    const valor = valorFormatado(document.getElementById('valor-destino'));
    const moedaSelecionada = moedas.find(m => m.sigla === selectMoeda);

    if (moedaSelecionada) {
        const formatador = escolherFormatador(selectMoeda, true);
        document.getElementById('valor-origem').value = formatador(valor / moedaSelecionada.valor);
    }
};

const alteraValor = (moedas) => {
    document.getElementById('valor-origem').addEventListener('input', () => atualizaValorDestino(moedas));
    document.getElementById('valor-destino').addEventListener('input', () => atualizaValorOrigem(moedas));
};

const trocaMoeda = (moedas) => {
    document.getElementById('select-moeda').addEventListener('change', () => atualizaValorDestino(moedas));
};

const aplicarMascaraMoeda = inputElement => {
    inputElement.addEventListener('input', () => {
        let valor = inputElement.value.replace(/\D/g, '');
        if (valor.length === 0) valor = '0';

        let valorNumerico = parseFloat(valor) / 100;
        inputElement.value = valorNumerico.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
};

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
}

window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
    }

    loadValues();

    aplicarMascaraMoeda(document.getElementById('valor-origem'));
    aplicarMascaraMoeda(document.getElementById('valor-destino'));
};
