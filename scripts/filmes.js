// filmes.js - lógica de cadastro e listagem de filmes
(function(){
  const form = document.getElementById('form-filme');
  const lista = document.getElementById('lista-filmes');

  function render() {
    const filmes = ler('filmes');
    lista.innerHTML = '';
    filmes.forEach(f => {
      const li = document.createElement('li');
      li.textContent = `${f.titulo} (${f.genero || 'sem gênero'}) - ${f.classificacao || 'Livre'}`;
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.onclick = () => {
        if(confirm('Excluir filme?')) {
          const novos = ler('filmes').filter(x => x.id !== f.id);
          salvar('filmes', novos);
          render();
        }
      };
      li.appendChild(document.createTextNode(' '));
      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
    document.dispatchEvent(new Event('filmesUpdated'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const genero = document.getElementById('genero').value.trim();
    const classificacao = document.getElementById('classificacao').value.trim();
    const duracao = parseInt(document.getElementById('duracao').value, 10) || 0;
    const estreia = document.getElementById('estreia').value || '';

    if(!titulo) { alert('Título obrigatório'); return; }

    const filmes = ler('filmes');
    const filme = { id: gerarId('filme'), titulo, descricao, genero, classificacao, duracao, estreia };
    filmes.push(filme);
    salvar('filmes', filmes);
    form.reset();
    render();
  });

  document.addEventListener('DOMContentLoaded', render);
})();
