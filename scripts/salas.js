// salas.js - cadastro e listagem de salas
(function(){
  const form = document.getElementById('form-sala');
  const lista = document.getElementById('lista-salas');

  function render() {
    const salas = ler('salas');
    lista.innerHTML = '';
    salas.forEach(s => {
      const li = document.createElement('li');
      li.textContent = `${s.nome} - Capacidade: ${s.capacidade} - Tipo: ${s.tipo}`;
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.onclick = () => {
        if(confirm('Excluir sala?')) {
          const novos = ler('salas').filter(x => x.id !== s.id);
          salvar('salas', novos);
          render();
        }
      };
      li.appendChild(document.createTextNode(' '));
      li.appendChild(btnExcluir);
      lista.appendChild(li);
    });
    document.dispatchEvent(new Event('salasUpdated'));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeSala').value.trim();
    const capacidade = parseInt(document.getElementById('capacidade').value, 10) || 0;
    const tipo = document.getElementById('tipoSala').value;

    if(!nome) { alert('Nome da sala obrigatório'); return; }

    const salas = ler('salas');
    const sala = { id: gerarId('sala'), nome, capacidade, tipo };
    salas.push(sala);
    salvar('salas', salas);
    form.reset();
    render();
  });

  document.addEventListener('DOMContentLoaded', render);
})();
