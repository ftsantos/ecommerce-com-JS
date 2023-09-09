const catalogoProdutos = document.getElementById("container-produto");

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName("hidden"));

    for(const produto of produtosEscondidos){
        produto.classList.remove('hidden');
    }
}

function esconderPreTreino(){

    exibirTodos();
    
    const produtosPreTreino = Array.from(catalogoProdutos.getElementsByClassName("pretreino"));

    for(const produto of produtosPreTreino){
        produto.classList.add("hidden");
    }
}

function esconderPosTreino(){

    exibirTodos();
    
    const produtosPosTreino = Array.from(catalogoProdutos.getElementsByClassName("postreino"));

    for(const produto of produtosPosTreino){
        produto.classList.add("hidden");
    }

}

export function inicializarFiltros(){
    document.getElementById("exibir-todos").addEventListener('click', exibirTodos);
    document.getElementById("exibir-postreino").addEventListener('click', esconderPreTreino);
    document.getElementById("exibir-pretreino").addEventListener('click', esconderPosTreino);
}