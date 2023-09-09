import {desenharProdutoNocarrinhoSimples, lerLocalStorage, apagarDoLocalstorage, salvarLocalStorage} from "./src/utilidades";

function desenharProdutosCheckout(){
    const idsProdutosCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

    for(const idProduto in idsProdutosCarrinhoComQuantidade){
        desenharProdutoNocarrinhoSimples(idProduto, "container-produtos-checkout", idsProdutosCarrinhoComQuantidade[idProduto]);
    };
}

function finalizarCompra(evento){

    evento.preventDefault(); 

    const idsProdutosCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};
    if(Object.keys(idsProdutosCarrinhoComQuantidade).length === 0){
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idsProdutosCarrinhoComQuantidade,
    }

    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    // Operador de espalhamento ... coloca a lista item a item na oura lista
    const historicoDePedidosAualizado = [pedidoFeito, ...historicoDePedidos];
    salvarLocalStorage('historico', historicoDePedidosAualizado);

    apagarDoLocalstorage('carrinho');
    window.location.href = window.location.origin + "/pedidos.html";
}

desenharProdutosCheckout();

document.addEventListener("submit", (evt) => finalizarCompra(evt));