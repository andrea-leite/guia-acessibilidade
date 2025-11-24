const listaDicas = document.getElementById('lista-dicas');
let dadosGlobais = [];

async function carregarDicas() {
    try {
        const resposta = await fetch('dados.json');
        dadosGlobais = await resposta.json();
        exibirDicas(dadosGlobais); 
    } catch (erro) {
        console.error("Erro ao carregar:", erro);
        listaDicas.innerHTML = "<p>Erro ao carregar as dicas.</p>";
    }
}

function exibirDicas(lista) {
    listaDicas.innerHTML = "";

    if (lista.length === 0) {
        listaDicas.innerHTML = "<p>Nenhuma dica encontrada.</p>";
        return;
    }

    lista.forEach(dica => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${dica.titulo}</h2>
            <p>${dica.descricao}</p>
            <span class="categoria">Categoria: ${dica.categoria}</span>
        `;
        listaDicas.appendChild(card);
    });
}

function pesquisar() {
    const termo = document.getElementById('campo-pesquisa').value.toLowerCase();

    if (termo === "") {
        exibirDicas(dadosGlobais);
        return;
    }

    const resultados = dadosGlobais.filter(dica => {
        return dica.titulo.toLowerCase().includes(termo) || 
               dica.descricao.toLowerCase().includes(termo) ||
               dica.categoria.toLowerCase().includes(termo);
    });

    exibirDicas(resultados);
}

carregarDicas();

function limparPesquisa() {
    document.getElementById('campo-pesquisa').value = "";
    exibirDicas(dadosGlobais);
}
