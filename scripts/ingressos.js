// ingressos.js - venda e listagem de ingressos
(function(){
  const selectSessao = document.getElementById('selectSessao');
  const form = document.getElementById('form-ingresso');
  const lista = document.getElementById('lista-ingressos');

  function popularSessoesSelect() {
    const sessoes = ler('sessoes');
    selectSessao.innerHTML = '';
    sessoes.forEach(s => {
      const filme = (ler('filmes')||[]).find(f => f.id === s.filmeId) || { titulo: 'N/D' };
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = `${filme.titulo} - ${new Date(s.dataHora).toLocaleString()} - R$ ${Number(s.preco).toFixed(2)}`;
      selectSessao.appendChild(opt);
    });
  }

  function renderIngressos() {
    const ingressos = ler('ingressos');
    lista.innerHTML = '';
    ingressos.forEach(i => {
      const sess = (ler('sessoes')||[]).find(s => s.id === i.sessaoId) || {};
      const filme = (ler('filmes')||[]).find(f => f.id === sess.filmeId) || { titulo: 'N/D' };
      const li = document.createElement('li');
      li.textContent = `${i.cliente} - ${i.cpf} - Sessão: ${filme.titulo} - Assento: ${i.assento} - Pagamento: ${i.pagamento}`;
      lista.appendChild(li);
    });
  }

  // if page has query string sessao, preselect that sessao
  document.addEventListener('DOMContentLoaded', () => {
    popularSessoesSelect();
    const sessaoParam = qs('sessao');
    if(sessaoParam) {
      selectSessao.value = sessaoParam;
    }
    renderIngressos();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const sessaoId = selectSessao.value;
    const cliente = document.getElementById('cliente').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const assento = document.getElementById('assento').value.trim();
    const pagamento = document.getElementById('pagamento').value;

    if(!sessaoId || !cliente || !cpf || !assento) { alert('Preencha todos os campos'); return; }

    const ingressos = ler('ingressos');
    const ingresso = { id: gerarId('ing'), sessaoId, cliente, cpf, assento, pagamento };
    ingressos.push(ingresso);
    salvar('ingressos', ingressos);
    form.reset();
    renderIngressos();
    alert('Venda confirmada!');
  });
})();
