// utils.js - helpers para localStorage e geração de IDs
function ler(chave) {
  const raw = localStorage.getItem(chave);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Erro ao parsear', chave, e);
    return [];
  }
}

function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function gerarId(prefix='id') {
  return prefix + '_' + Date.now() + '_' + Math.floor(Math.random()*1000);
}

function qs(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}
