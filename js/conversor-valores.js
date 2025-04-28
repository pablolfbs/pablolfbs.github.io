// Formatadores para moedas
const valorFormatadoEmReal = valor => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
const valorFormatadoEmDolar = valor => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor);
const valorFormatadoEmEuro = valor => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(valor);
const valorFormatadoEmLibra = valor => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(valor);
const valorFormatadoEmPeso = valor => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor);

const escolherFormatador = (sigla) => {
  if (sigla.includes('USD')) return valorFormatadoEmDolar;
  if (sigla.includes('EUR')) return valorFormatadoEmEuro;
  if (sigla.includes('GBP')) return valorFormatadoEmLibra;
  if (sigla.includes('ARS')) return valorFormatadoEmPeso;
  return valorFormatadoEmReal;
};

let moedas = [];
let taxas = {};

const loadValues = async () => {
  const selectMoedas = document.getElementById('select-moeda');
  selectMoedas.innerHTML = '<option>Carregando...</option>';
  selectMoedas.disabled = true;

  try {
    const response = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,BRL-USD,BRL-EUR,BRL-GBP,BRL-ARS");
    const values = await response.json();
    moedas = montaObjeto(values);
    taxas = montarTaxas(values);

    selectMoedas.innerHTML = '';
    selectMoedas.disabled = false;
    montaSelect(moedas, selectMoedas);
    montaListaMoedas(moedas);

    atualizarCampos();

  } catch (error) {
    console.error(error);
    selectMoedas.innerHTML = '<option>Erro ao carregar moedas</option>';
  }
};

const montaObjeto = (values) => [
  { nome: 'Dólar Americano → Real Brasileiro', sigla: 'USDBRL', valor: parseFloat(values['USDBRL'].ask) },
  { nome: 'Euro → Real Brasileiro', sigla: 'EURBRL', valor: parseFloat(values['EURBRL'].ask) },
  { nome: 'Libra → Real Brasileiro', sigla: 'GBPBRL', valor: parseFloat(values['GBPBRL'].ask) },
  { nome: 'Peso → Real Brasileiro', sigla: 'ARSBRL', valor: parseFloat(values['ARSBRL'].ask) },
  { nome: 'Real Brasileiro → Dólar', sigla: 'BRLUSD', valor: parseFloat(values['BRLUSD'].ask) },
  { nome: 'Real Brasileiro → Euro', sigla: 'BRLEUR', valor: parseFloat(values['BRLEUR'].ask) },
  { nome: 'Real Brasileiro → Libra', sigla: 'BRLGBP', valor: parseFloat(values['BRLGBP'].ask) },
  { nome: 'Real Brasileiro → Peso', sigla: 'BRLARS', valor: parseFloat(values['BRLARS'].ask) }
];

const montarTaxas = (values) => ({
  USDBRL: parseFloat(values['USDBRL'].ask),
  EURBRL: parseFloat(values['EURBRL'].ask),
  GBPBRL: parseFloat(values['GBPBRL'].ask),
  ARSBRL: parseFloat(values['ARSBRL'].ask),
  BRLUSD: parseFloat(values['BRLUSD'].ask),
  BRLEUR: parseFloat(values['BRLEUR'].ask),
  BRLGBP: parseFloat(values['BRLGBP'].ask),
  BRLARS: parseFloat(values['BRLARS'].ask),
});

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

const valorSemMascara = (input) => {
  const cleaned = input.value.replace(/\D/g, '');
  return parseFloat(cleaned) / 100 || 0;
};

const atualizarCampos = () => {
  const selectMoeda = document.getElementById('select-moeda').value;
  const taxa = taxas[selectMoeda] || 1;
  const origem = valorSemMascara(document.getElementById('valor-origem'));
  const destino = valorSemMascara(document.getElementById('valor-destino'));

  const formatadorOrigem = escolherFormatador(selectMoeda.slice(0, 3));
  const formatadorDestino = escolherFormatador(selectMoeda.slice(3, 6));

  if (document.activeElement.id === 'valor-origem') {
    document.getElementById('valor-destino').value = formatadorDestino(origem * taxa);
    aplicarMascaraAoDigitar(document.getElementById('valor-origem'), formatadorOrigem);
  } else if (document.activeElement.id === 'valor-destino') {
    document.getElementById('valor-origem').value = formatadorOrigem(destino / taxa);
    aplicarMascaraAoDigitar(document.getElementById('valor-destino'), formatadorDestino);
  }
};

const aplicarMascaraAoDigitar = (inputElement, formatador) => {
  const valor = inputElement.value.replace(/\D/g, '');
  const valorNumerico = parseFloat(valor) / 100 || 0;
  inputElement.value = formatador(valorNumerico);
};

document.addEventListener('input', atualizarCampos);
document.getElementById('select-moeda').addEventListener('change', atualizarCampos);

const toggleDarkMode = () => {
  const body = document.body;
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
};

window.onload = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }
  loadValues();
};