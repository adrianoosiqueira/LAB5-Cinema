# Sistema Web de Controle de Cinema (sem CSS)

Projeto em HTML + JavaScript puro que implementa:
- Cadastro de filmes (localStorage 'filmes')
- Cadastro de salas (localStorage 'salas')
- Cadastro de sessões (localStorage 'sessoes')
- Venda de ingressos (localStorage 'ingressos')
- Listagem de sessões com compra de ingresso via query string

## Como usar
- Abra `index.html` no navegador.
- Cadastre filmes e salas primeiro; depois cadastre sessões.
- Na página de sessões você pode clicar em "Comprar Ingresso" para ser redirecionado para a venda com a sessão já selecionada.

## Observações
- Não há persistência além do localStorage do navegador (dados são salvos no browser).
- Não há CSS neste pacote — apenas funcionalidade.
