import { catalogo, salvarLocalStorage, lerLocalStorage} from "./utilidades";
//import { } from "./utilidades";

//const idsProdutosCarrinhoComQuantidade = {};
const idsProdutosCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function abrirCarrinho(){
    document.getElementById("carrinho").classList.remove('right-[-360px]');
    document.getElementById("carrinho").classList.add('right-[0px]');
}

function fecharCarrinho(){
    document.getElementById("carrinho").classList.remove('right-[0px]');
    document.getElementById("carrinho").classList.add('right-[-360px]');
}

function irParaCheckout(){
    if(Object.keys(idsProdutosCarrinhoComQuantidade).length === 0){
        return;
    }
    //window.location.href = window.location.origin + "/checkout.html";
    window.location.href = "https://ecommerce-com-js.vercel.app/checkout.html";
}

export function inicializarCarrinho() {
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoIrParaCheckout = document.getElementById("finalizar-compra");

    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoIrParaCheckout.addEventListener('click', irParaCheckout);
}

function removerDoCarrinho(idProduto){
    delete idsProdutosCarrinhoComQuantidade[idProduto]; // apaga do dicionário
    salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeDoProduto(idProduto) {
    idsProdutosCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeDoProduto(idProduto) {
    if (idsProdutosCarrinhoComQuantidade[idProduto] === 1) {
        removerDoCarrinho(idProduto);
        return;
    } 
    idsProdutosCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerHTML = idsProdutosCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNocarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");

    // Criar um elemento HTML para não perder as referências dos botões dos cards
    const elementoArticle = document.createElement('article'); //<article></article>
    //elementoArticle.classList.add("flex"); // Teria que colocar classe por classe

    const articleClasses = ['flex', 'bg-blue-400', 'rounded-lg', 'p-1', 'relative'];
    
    // Adicionando todas as classes da lista
    for(const articleClasse of articleClasses){
        elementoArticle.classList.add(articleClasse);
    }

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2"><i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i></button>
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
        </div>`;

    // containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
    // Os outros elementos do article continuam com as referências
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`)
    .addEventListener('click', () => decrementarQuantidadeDoProduto(produto.id));

    document.getElementById(`incrementar-produto-${produto.id}`)
    .addEventListener('click', () => incrementarQuantidadeDoProduto(produto.id));

    document.getElementById(`remover-item-${produto.id}`)
    .addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho(){
    
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = ""; //inicializa vazio

    for(const idProduto in idsProdutosCarrinhoComQuantidade){
        desenharProdutoNocarrinho(idProduto);
    }    
}

export function adicionarAoCarrinho(idProduto) {

    if(idProduto in idsProdutosCarrinhoComQuantidade){
        incrementarQuantidadeDoProduto(idProduto);        
        return;
    }
    
    idsProdutosCarrinhoComQuantidade[idProduto] = 1;
    atualizarPrecoCarrinho();
    desenharProdutoNocarrinho(idProduto);   
    salvarLocalStorage('carrinho', idsProdutosCarrinhoComQuantidade);
}

export function atualizarPrecoCarrinho(){
    const precoCarinho = document.getElementById("preco-total");

    let precoTotalCarrinho = 0;

    for(const idProdutoNoCarrinho in idsProdutosCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find((produto) => produto.id === idProdutoNoCarrinho).preco * idsProdutosCarrinhoComQuantidade[idProdutoNoCarrinho];
    }

    precoCarinho.innerHTML = `Total: $${precoTotalCarrinho}`;
}
