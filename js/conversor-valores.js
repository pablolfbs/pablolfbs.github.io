const loadValues = async() => {

    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL")

    const values = await response.json()

    const moedas = montaObjeto(values)

    const selectMoedas = document.getElementById('select-moeda')

    montaSelect(moedas, selectMoedas)

    document.getElementById('valor-origem').value = valorFormatadoEmDolar(1)
    document.getElementById('valor-destino').value = valorFormatadoEmReal(moedas[0].valor)

    trocaMoeda(moedas)

    alteraValor(moedas)

}

const alteraValor = moedas => document.getElementById('valor-origem').addEventListener('keyup', () => {
    const selectMoeda = document.getElementById('select-moeda').value

    const valorOrigem = selectMoeda === 'USDBRL' ? document.getElementById('valor-origem').value.replace('US$ ', '').replace(',', '.') : document.getElementById('valor-origem').value.replace(' €', '').replace(',', '.')

    document.getElementById('valor-destino').value = valorFormatadoEmReal(selectMoeda === 'USDBRL' ? valorOrigem.replace(',', '') * moedas[0].valor : valorOrigem * moedas[1].valor)
})

const trocaMoeda = moedas => document.getElementById('select-moeda').addEventListener('change', () => {
    const selectMoeda = document.getElementById('select-moeda').value

    const valorOrigem = selectMoeda === 'USDBRL' ? document.getElementById('valor-origem').value.replace(' €', '').replace(',', '.') : document.getElementById('valor-origem').value.replace('US$ ', '').replace(',', '.')

    document.getElementById('valor-destino').value = valorFormatadoEmReal(selectMoeda === 'USDBRL' ? valorOrigem * moedas[0].valor : valorOrigem * moedas[1].valor)

    document.getElementById('valor-origem').value = selectMoeda === 'USDBRL' ? valorFormatadoEmDolar(valorOrigem) : valorFormatadoEmEuro(valorOrigem)
})

const montaSelect = (moedas, selectMoedas) => moedas.forEach(m => {
    const option = new Option(m.nome, m.sigla)
    selectMoedas.options[selectMoedas.options.length] = option
})

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
        nome: 'Dólar',
        sigla: 'USDBRL',
        valor: values['USDBRL'].ask
    }, {
        nome: 'Euro',
        sigla: 'EURBRL',
        valor: values['EURBRL'].ask
    }]
}

loadValues()