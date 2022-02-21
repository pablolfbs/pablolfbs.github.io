const loadValues = async() => {
    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,BTC-USD,GBP-BRL')
    const values = await response.json()

    const moedas = montaObjeto(values)

    montaListaMoedas(moedas)
}

const montaListaMoedas = moedas => {
    moedas.forEach(m => {
        criaElementos(m)
    })
}

const criaElementos = m => {
    const valor = m.sigla == 'BTCUSD' ? valorFormatadoEmDolar(m.valor) : valorFormatadoEmReal(m.valor)
    const variacao = m.variacao + ' $'

    const position = document.getElementsByTagName('ul')[0]

    const liEl = document.createElement('li')
    const spanEl = document.createElement('span')
    spanEl.style.color = corFonte(m, spanEl)
    const abreParentesesEl = document.createElement('span')
    const fechaParentesesEl = document.createElement('span')

    const spanText = document.createTextNode(variacao)
    const liText = document.createTextNode(m.nome + ': ' + valor)
    const abreParentesesText = document.createTextNode('(')
    abreParentesesEl.style.marginLeft = '5px'
    const fechaParentesesText = document.createTextNode(')')

    abreParentesesEl.appendChild(abreParentesesText)
    fechaParentesesEl.appendChild(fechaParentesesText)

    spanEl.appendChild(spanText)

    liEl.appendChild(liText)
    liEl.appendChild(abreParentesesEl)
    liEl.appendChild(spanEl)
    liEl.appendChild(fechaParentesesEl)

    position.appendChild(liEl)
}

const corFonte = (m, spanEl) => {
    if (m.variacao > 0)
        return 'lightgreen'
    if (m.variacao < 0)
        return 'red'
    else
        return 'lightgrey'
}

const montaObjeto = values => {
    return [{
        nome: 'Dólar',
        sigla: 'USDBRL',
        valor: values['USDBRL'].bid,
        variacao: values['USDBRL'].varBid
    }, {
        nome: 'Euro',
        sigla: 'EURBRL',
        valor: values['EURBRL'].bid,
        variacao: values['EURBRL'].varBid
    }, {
        nome: 'Libra Esterlina',
        sigla: 'GBPBRL',
        valor: values['GBPBRL'].bid,
        variacao: values['GBPBRL'].varBid
    }, {
        nome: 'Bitcoin',
        sigla: 'BTCBRL',
        valor: values['BTCBRL'].bid * 1000,
        variacao: values['BTCBRL'].varBid
    }, {
        nome: 'Bitcoin',
        sigla: 'BTCUSD',
        valor: values['BTCUSD'].bid,
        variacao: values['BTCUSD'].varBid
    }]
}

const valorFormatadoEmReal = valor => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
}

const valorFormatadoEmDolar = valor => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD'
    }).format(valor)
}

loadValues()