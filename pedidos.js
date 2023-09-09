import { lerLocalStorage, desenharProdutoNocarrinhoSimples } from "./src/utilidades";

function criarPedidoHistorico(pedidoComData){
    const elementoPedido = `<p class="text-xl text-bold my-4">${new Date(pedidoComData.dataPedido).toLocaleDateString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</p>
    <section id='container-pedidos-${pedidoComData.dataPedido}' class="bg-slate-300 p-3 rounded-md">
    </section>`;

    const main = document.getElementsByTagName('main')[0];

    main.innerHTML += elementoPedido; // não vai precisar criar ação para os elementos, como é estático, pode ser assim

    for(const idProduto in pedidoComData.pedido){
        desenharProdutoNocarrinhoSimples(idProduto, `container-pedidos-${pedidoComData.dataPedido}`, pedidoComData.pedido[idProduto]);
    }
}

function renderizarHistoricoPedido(){
    const historico = lerLocalStorage('historico');

    for(const pedidoComData of historico){// of vai pra chave
        criarPedidoHistorico(pedidoComData);
    }
}

renderizarHistoricoPedido();