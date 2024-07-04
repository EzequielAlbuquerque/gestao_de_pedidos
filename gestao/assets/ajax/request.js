import { eventCadastroCliente } from "/gestao/assets/js/cadastrar_cliente.js";
import { eventPesquisaCliente } from "/gestao/assets/js/gerar_pedido.js";
import { eventCadastroProduto } from "/gestao/assets/js/cadastrar_produto.js";

let PgCadastrarCliente = "/gestao/pages/cadastrar_cliente.html";
let PgGerarPedido = "/gestao/pages/gerar_pedido.html";
let PgConsultarPedido = "/gestao/pages/consultar_pedidos.html";
let PgCadastrarProduto = "/gestao/pages/cadastrar_produtos.html";
let PgEstoque = "/gestao/pages/estoque.html";
let PgFinanceiro = "/gestao/pages/financeiro.html";

let content = document.getElementById("container");

document.getElementById("cadastroCliente").addEventListener("click", () => {
  fetch(PgCadastrarCliente)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
      eventCadastroCliente();
    });
});

document.getElementById("gerarPedido").addEventListener("click", () => {
  fetch(PgGerarPedido)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
      eventPesquisaCliente()
    });
});

document.getElementById("consultarPedido").addEventListener("click", () => {
  fetch(PgConsultarPedido)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
    });
});
document.getElementById("cadastrarProduto").addEventListener("click", () => {
  fetch(PgCadastrarProduto)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
      eventCadastroProduto()
    });
});
document.getElementById("estoque").addEventListener("click", () => {
  fetch(PgEstoque)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
    });
});
document.getElementById("estoque").addEventListener("click", () => {
  fetch(PgEstoque)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
    });
});
document.getElementById("estoque").addEventListener("click", () => {
  fetch(PgEstoque)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
    });
});
document.getElementById("estoque").addEventListener("click", () => {
  fetch(PgEstoque)
    .then((resp) => resp.text())
    .then((result) => {
      content.innerHTML = result;
    });
});
document.getElementById("financeiro").addEventListener("click", () => {
    fetch(PgFinanceiro)
      .then((resp) => resp.text())
      .then((result) => {
        content.innerHTML = result;
      });
  });
  