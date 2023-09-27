import { adicionarAoCarrinho } from "./menuCarrinho";
import { catalogo } from "./utilidades";

export function renderizarCatalogo(params) {
    
    for (const produto of catalogo) {
        const cartaoProduto = `
        <div class="border-solid shadow-xl shadow-slate-400 rounded-lg w-48 m-2 flex flex-col p-2 justify-between group ${produto.pretreino ? 'pretreino': 'postreino'} " id="card-produto-${produto.id}">
            <img src="/assets/img/${produto.nomeArquivoImagem}" 
            alt="Produto 1 do Magazine Hahtag." class="group-hover:scale-110 duration-300 my-3 rounded-lg" />
            <p class='text-sm'>${produto.nome}</p>
            <p class='text-sm'>${produto.descricao}</p>
            <p class='text-sm'>${produto.preco}</p>
            <button id='adicionar-${produto.id}' class="bg-blue-700 text-blue-200 hover:bg-blue-900"><i class="fa-solid fa-cart-plus"></i></button>
        </div>`;

        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }

    for (const produto of catalogo){
        document.getElementById(`adicionar-${produto.id}`).addEventListener('click', 
        () => adicionarAoCarrinho(produto.id));
    }
}
