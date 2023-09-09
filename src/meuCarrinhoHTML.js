import { catalogo } from "./utilidades";

const idsProdutosCarrinhoComQuantidade = {};

function abrirCarrinho(){
    document.getElementById("carrinho").classList.remove('right-[-360px]');
    document.getElementById("carrinho").classList.add('right-[0px]');
}

function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove('right-[0px]');
    document.getElementById("carrinho").classList.add('right-[-360px]');
}

export function inicializarCarrinho() {
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");

    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);

}

function incrementarQuantidadeDoProduto(idProduto) {
    idsProdutosCarrinhoComQuantidade[idProduto]++;
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeDoProduto(idProduto) {
    if (idsProdutosCarrinhoComQuantidade[idProduto] > 0) {
        idsProdutosCarrinhoComQuantidade[idProduto]--;
        atualizarInformacaoQuantidade(idProduto);
    }
}

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerHTML = idsProdutosCarrinhoComQuantidade[idProduto];
}

export function adicionarAoCarrinho(idProduto) {

    if(idProduto in idsProdutosCarrinhoComQuantidade){
        incrementarQuantidadeDoProduto(idProduto);        
        return;
    } else {
        idsProdutosCarrinhoComQuantidade[idProduto] = 1;
    }

    const produto = catalogo.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    const cartaoProdutoCarrinho = `<article class="flex bg-blue-400 rounded-lg p-1 relative">
        <button id="fechar-carrinho" class="absolute top-0 right-2"><i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i></button>
        <img src="./assets/img/product-${produto.id}.png" alt="Produto no carrinho: ${produto.nome}" class="h-24 rounded-lg">
        <div class="p-2 flex flex-col justify-between">
          <p class="text-slate-900 text-sm">${produto.nome}</p>
          <p class="text-slate-600 text-xs">${produto.descricao}</p>
          <p class="text-green-700 text-lg">${produto.preco}</p>
        </div>
        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
            <button id="decrementar-produto-${produto.id}">-</button>
            <p id="quantidade-${produto.id}" class="ml-2">${idsProdutosCarrinhoComQuantidade[produto.id]}</p>
            <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
        </div>
      </article>`;

    containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;

    document.getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener('click', () => decrementarQuantidadeDoProduto(produto.id));

    document.getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener('click', () => incrementarQuantidadeDoProduto(produto.id));
    
}