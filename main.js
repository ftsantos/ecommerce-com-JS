/**const nomeProduto = "Horus 300g";
const descricao = "Pré Workout"
const preco = 159.60;
const nomeArquivoImagem = "product-1.png"
*/
//alert('JavaScript funcionando!');

import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarCarrinho, renderizarProdutosCarrinho,  atualizarPrecoCarrinho} from "./src/menuCarrinho";
import { inicializarFiltros } from "./src/filtroCatalogo";

renderizarCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho(); 
atualizarPrecoCarrinho();
inicializarFiltros();