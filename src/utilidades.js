export const catalogo = [
    {
        id: "1",
        nome:'Horus 300g',
        descricao: 'Pré Workout',
        preco: 159.60,
        nomeArquivoImagem: 'product-1.png',
        pretreino: true,
    }
    , {
        id: "2",
        nome:'Top Whey 3W + Sabor 900G',
        descricao: 'Pré Workout',
        preco: 176,
        nomeArquivoImagem: 'product-2.png',
        pretreino: true,
    }
    , {
        id: "3",
        nome:'Mass Titanium',
        descricao: 'Zero Lactose',
        preco: 176,
        nomeArquivoImagem: 'product-3.png',
        pretreino: false,
    }
    , {
        id: "4",
        nome:'Horus 150g',
        descricao: 'Pré Workout',
        preco: 176,
        nomeArquivoImagem: 'product-4.png',
        pretreino: true,
    }
    , {
        id: "5",
        nome:'Beta-Alanina',
        descricao: 'Termogênico',
        preco: 176,
        nomeArquivoImagem: 'product-5.png',
        pretreino: false,
    }
    , {
        id: "6",
        nome:'Vitamina D',
        descricao: '60 Cápsulas',
        preco: 176,
        nomeArquivoImagem: 'product-6.png',
        pretreino: true,        
    }
    , {
        id: "7",
        nome:'Colagen',
        descricao: 'Colageno',
        preco: 176,
        nomeArquivoImagem: 'product-7.png',
        pretreino: true,
    }
];

export function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave){
    return  JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalstorage(chave){
    localStorage.removeItem(chave);
}

export function desenharProdutoNocarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto){
    const produto = catalogo.find((p) => p.id === idProduto);

    const containerProdutosCarrinho = document.getElementById(idContainerHtml);

    // Criar um elemento HTML para não perder as referências dos botões dos cards
    const elementoArticle = document.createElement('article'); //<article></article>
    //elementoArticle.classList.add("flex"); // Teria que colocar classe por classe

    const articleClasses = ['flex', 'bg-blue-400', 'rounded-lg', 'p-1', 'relative', 'mb-2', 'w-96'];
    
    // Adicionando todas as classes da lista
    for(const articleClasse of articleClasses){
        elementoArticle.classList.add(articleClasse);
    }

    const cartaoProdutoCarrinho = `<img src="./assets/img/product-${produto.id}.png" alt="Produto no carrinho: ${produto.nome}" class="h-24 rounded-lg">
        <div class="p-2 flex flex-col justify-between">
          <p class="text-slate-900 text-sm">${produto.nome}</p>
          <p class="text-slate-600 text-xs">${produto.descricao}</p>
          <p class="text-green-700 text-lg">${produto.preco}</p>
        </div>
        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
            <p id="quantidade-${produto.id}" class="ml-2">${quantidadeProduto}</p>
        </div>`;

    // containerProdutosCarrinho.innerHTML += cartaoProdutoCarrinho;
    // Os outros elementos do article continuam com as referências
    elementoArticle.innerHTML = cartaoProdutoCarrinho;
    containerProdutosCarrinho.appendChild(elementoArticle);
}