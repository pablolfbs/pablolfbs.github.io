const loadValues = async() => {

    const responseUsd = await fetch("https://economia.awesomeapi.com.br/USD-BRL/1")
    const responseEur = await fetch("https://economia.awesomeapi.com.br/EUR-BRL/1")

    console.log(responseUsd)
    console.log(responseEur)

    const valueUsd = await responseUsd.json()
    const valueEur = await responseEur.json()

    console.log(valueUsd)
    console.log(valueEur)

    const moedasOrigem = [valueUsd[0], valueEur[0]]

    const selectMoedas = document.getElementById('select-moeda')

    montaSelect(moedasOrigem, selectMoedas)

    document.getElementById('valor-origem').value = valorFormatadoEmDolar(1)
    document.getElementById('valor-destino').value = valorFormatadoEmReal(valueUsd[0].ask)

    trocaMoeda(moedasOrigem)

    alteraValor(moedasOrigem)

}

const alteraValor = moedasOrigem => document.getElementById('valor-origem').addEventListener('keyup', () => {
    const selectMoeda = document.getElementById('select-moeda').value

    const valorOrigem = selectMoeda === 'USD' ? document.getElementById('valor-origem').value.replace('US$ ', '').replace(',', '.') : document.getElementById('valor-origem').value.replace(' €', '').replace(',', '.')

    document.getElementById('valor-destino').value = valorFormatadoEmReal(selectMoeda === 'USD' ? valorOrigem.replace(',', '') * moedasOrigem[0].ask : valorOrigem * moedasOrigem[1].ask)
})

const trocaMoeda = moedasOrigem => document.getElementById('select-moeda').addEventListener('change', () => {
    const selectMoeda = document.getElementById('select-moeda').value

    const valorOrigem = selectMoeda === 'USD' ? document.getElementById('valor-origem').value.replace(' €', '').replace(',', '.') : document.getElementById('valor-origem').value.replace('US$ ', '').replace(',', '.')

    document.getElementById('valor-destino').value = valorFormatadoEmReal(selectMoeda === 'USD' ? valorOrigem * moedasOrigem[0].ask : valorOrigem * moedasOrigem[1].ask)

    document.getElementById('valor-origem').value = selectMoeda === 'USD' ? valorFormatadoEmDolar(valorOrigem) : valorFormatadoEmEuro(valorOrigem)
})

const montaSelect = (moedasOrigem, selectMoedas) => moedasOrigem.forEach(m => {
    const option = new Option(m.name, m.code)
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

// function hoje() {
//     const hj = new Date()
//     const dia = hj.getDate()
//     const mes = hj.getMonth() + 1
//     const ano = hj.getFullYear()
//     console.log(mes.length)
//     return ano + '' + (mes <= 9 ? '0' + mes : mes) + '' + (dia <= 9 ? '0' + dia : dia)
// }

// function ontem() {
//     const hj = new Date()
//     const dia = hj.getDate() - 1
//     const mes = hj.getMonth() + 1
//     const ano = hj.getFullYear()
//     console.log(mes.length)
//     return String(ano + (mes <= 9 ? '0' + mes : mes) + (dia <= 9 ? '0' + dia : dia))
// }

loadValues()