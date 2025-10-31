// sessoes.js - cadastro e listagem de sessões (usa filmes e salas)
(function () {
  const form = document.getElementById('form-sessao');
  const selectFilme = document.getElementById('selectFilme');
  const selectSala = document.getElementById('selectSala');
  const lista = document.getElementById('lista-sessoes');
  const conteudoSessoes = document.getElementById('conteudo-sessoes');

  // Popular selects de filmes e salas (apenas se existirem)
  function popularSelects() {
    if (!selectFilme || !selectSala) return;

    const filmes = ler('filmes');
    selectFilme.innerHTML = '';
    filmes.forEach(f => {
      const opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.titulo;
      selectFilme.appendChild(opt);
    });

    const salas = ler('salas');
    selectSala.innerHTML = '';
    salas.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.nome;
      selectSala.appendChild(opt);
    });
  }

  // Renderiza lista de sessões na página de cadastro
  function renderList() {
    if (!lista) return;
    const sessoes = ler('sessoes');
    lista.innerHTML = '';
    sessoes.forEach(sess => {
      const filme = (ler('filmes') || []).find(f => f.id === sess.filmeId) || { titulo: 'N/D' };
      const sala = (ler('salas') || []).find(s => s.id === sess.salaId) || { nome: 'N/D' };
      const li = document.createElement('li');
      li.textContent = `${filme.titulo} | ${sala.nome} | ${new Date(sess.dataHora).toLocaleString()} | R$ ${Number(sess.preco).toFixed(2)} | ${sess.idioma} | ${sess.formato}`;

      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.onclick = () => {
        if (confirm('Excluir sessão?')) {
          const novos = ler('sessoes').filter(x => x.id !== sess.id);
          salvar('sessoes', novos);
          renderList();
          renderSessoesDisponiveis();
        }
      };

      const btnComprar = document.createElement('button');
      btnComprar.textContent = 'Comprar Ingresso';
      btnComprar.onclick = () => {
        window.location.href = `venda-ingressos.html?sessao=${sess.id}`;
      };

      li.appendChild(document.createTextNode(' '));
      li.appendChild(btnComprar);
      li.appendChild(document.createTextNode(' '));
      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
  }

  // Renderiza sessões disponíveis na página sessoes.html
  function renderSessoesDisponiveis() {
    if (!conteudoSessoes) return;
    const sessoes = ler('sessoes');
    conteudoSessoes.innerHTML = '';
    if (sessoes.length === 0) {
      conteudoSessoes.textContent = 'Nenhuma sessão cadastrada.';
      return;
    }

    const ul = document.createElement('ul');
    sessoes.forEach(sess => {
      const filme = (ler('filmes') || []).find(f => f.id === sess.filmeId) || { titulo: 'N/D' };
      const sala = (ler('salas') || []).find(s => s.id === sess.salaId) || { nome: 'N/D' };
      const li = document.createElement('li');
      li.innerHTML = `<strong>${filme.titulo}</strong> - Sala: ${sala.nome} - ${new Date(sess.dataHora).toLocaleString()} - R$ ${Number(sess.preco).toFixed(2)} 
        <button onclick="window.location.href='venda-ingressos.html?sessao=${sess.id}'">Comprar Ingresso</button>`;
      ul.appendChild(li);
    });
    conteudoSessoes.appendChild(ul);
  }

  // Cadastro de sessão (só se existir o formulário)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const filmeId = selectFilme.value;
      const salaId = selectSala.value;
      const dataHora = document.getElementById('dataHora').value;
      const preco = parseFloat(document.getElementById('preco').value) || 0;
      const idioma = document.getElementById('idioma').value;
      const formato = document.getElementById('formato').value;

      if (!filmeId || !salaId || !dataHora) {
        alert('Preencha filme, sala e data/hora');
        return;
      }

      const sessoes = ler('sessoes');
      const sessao = { id: gerarId('sessao'), filmeId, salaId, dataHora, preco, idioma, formato };
      sessoes.push(sessao);
      salvar('sessoes', sessoes);
      form.reset();
      popularSelects();
      renderList();
      renderSessoesDisponiveis();
    });
  }

  // Atualiza selects quando filmes/salas são alterados
  document.addEventListener('filmesUpdated', popularSelects);
  document.addEventListener('salasUpdated', popularSelects);

  // Detecta página e executa o que é necessário
  document.addEventListener('DOMContentLoaded', () => {
    if (form) {
      popularSelects();
      renderList();
    }
    if (conteudoSessoes) {
      renderSessoesDisponiveis();
    }
  });
})();
