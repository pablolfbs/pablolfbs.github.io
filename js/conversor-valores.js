let valorOrigem = SimpleMaskMoney.setMask('#valor-origem');
let valorDestino = SimpleMaskMoney.setMask('#valor-destino');

const loadValues = async() => {

    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL")

    const values = await response.json()

    const moedas = montaObjeto(values)

    const selectMoedas = document.getElementById('select-moeda')

    montaSelect(moedas, selectMoedas)

    document.getElementById('valor-destino').value = valorFormatadoEmReal(moedas[0].valor)

    trocaMoeda(moedas)

    alteraValor(moedas)

}

const alteraValor = moedas => document.getElementById('valor-origem').addEventListener('keyup', () => {
    const selectMoeda = document.getElementById('select-moeda').value

    const valor = valorFormatado();

    document.getElementById('valor-destino').value = valorFormatadoEmReal(selectMoeda === 'USDBRL' ? valor * moedas[0].valor : valor * moedas[1].valor)
})

const trocaMoeda = moedas => document.getElementById('select-moeda').addEventListener('change', () => {
    const selectMoeda = document.getElementById('select-moeda').value

    const valor = valorFormatado();

    document.getElementById('valor-destino').value = valorFormatadoEmReal(selectMoeda === 'USDBRL' ? valor * moedas[0].valor : valor * moedas[1].valor)

    document.getElementById('valor-origem').value = valor
})

const montaSelect = (moedas, selectMoedas) => moedas.forEach(m => {
    const option = new Option(m.nome, m.sigla)
    selectMoedas.options[selectMoedas.options.length] = option
})

const valorFormatado = () => {
    valorOrigem = document.getElementById('valor-origem').value;
    return valorOrigem.substring(0, valorOrigem.length - 3).replaceAll('.', '') + valorOrigem.substring(valorOrigem.length - 3, valorOrigem.length).replace(',', '.');
}

const valorFormatadoEmDolar = valor => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD'
    }).format(valor)
}

const valorFormatadoEmEuro = valor => {
    return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR'
    }).format(valor)
}

const valorFormatadoEmReal = valor => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
}

const montaObjeto = values => {
    return [{
        nome: 'Dólar Americano / Real Brasileiro',
        sigla: 'USDBRL',
        valor: values['USDBRL'].ask
    }, {
        nome: 'Euro / Real Brasileiro',
        sigla: 'EURBRL',
        valor: values['EURBRL'].ask
    }]
}

loadValues()