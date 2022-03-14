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
    const porcentagem = m.porcentagem + '%'

    const position = document.getElementById('ul-moedas')

    const liEl = document.createElement('li')
    const spanVariacaoEl = document.createElement('span')
    spanVariacaoEl.style.color = corFonte(m, spanVariacaoEl)
    const spanPorcentagemEl = document.createElement('span')
    spanPorcentagemEl.style.color = corFonte(m, spanPorcentagemEl)
    const abreParentesesEl = document.createElement('span')
    const fechaParentesesEl = document.createElement('span')

    const spanVariacaoText = document.createTextNode(variacao)
    const spanPorcentagemText = document.createTextNode(porcentagem)
    spanPorcentagemEl.style.marginLeft = '5px'
    const liText = document.createTextNode(m.nome + ': ' + valor)
    const abreParentesesText = document.createTextNode('(')
    abreParentesesEl.style.marginLeft = '5px'
    const fechaParentesesText = document.createTextNode(')')

    abreParentesesEl.appendChild(abreParentesesText)
    fechaParentesesEl.appendChild(fechaParentesesText)
    spanVariacaoEl.appendChild(spanVariacaoText)
    spanPorcentagemEl.appendChild(spanPorcentagemText)

    spanVariacaoEl.appendChild(spanVariacaoText)

    liEl.appendChild(liText)
    liEl.appendChild(abreParentesesEl)
    liEl.appendChild(spanVariacaoEl)
    liEl.appendChild(fechaParentesesEl)
    liEl.appendChild(spanPorcentagemEl)

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
        variacao: values['USDBRL'].varBid,
        porcentagem: values['USDBRL'].pctChange
    }, {
        nome: 'Euro',
        sigla: 'EURBRL',
        valor: values['EURBRL'].bid,
        variacao: values['EURBRL'].varBid,
        porcentagem: values['EURBRL'].pctChange
    }, {
        nome: 'Libra Esterlina',
        sigla: 'GBPBRL',
        valor: values['GBPBRL'].bid,
        variacao: values['GBPBRL'].varBid,
        porcentagem: values['GBPBRL'].pctChange
    }, {
        nome: 'Bitcoin',
        sigla: 'BTCBRL',
        valor: values['BTCBRL'].bid * 1000,
        variacao: values['BTCBRL'].varBid,
        porcentagem: values['BTCBRL'].pctChange
    }, {
        nome: 'Bitcoin',
        sigla: 'BTCUSD',
        valor: values['BTCUSD'].bid,
        variacao: values['BTCUSD'].varBid,
        porcentagem: values['USDBRL'].pctChange
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
setInterval(() => {
    document.getElementById('ul-moedas').innerHTML = ''
    loadValues()
}, 10000);