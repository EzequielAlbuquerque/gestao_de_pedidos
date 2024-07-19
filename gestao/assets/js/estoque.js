class Produtos {
  static recuperarProdutos() {
    let produtos = localStorage.getItem("produtos");
    return JSON.parse(produtos) || [];
  }

  static verificarCod(cod) {
    let produtos = this.recuperarProdutos();
    return produtos.find((p) => p.cod === cod);
  }
}

export function eventEstoque() {
  document.getElementById("consultarCod").addEventListener("click", (e) => {
    e.preventDefault();
    let cod = document.getElementById("cod").value;
    let produto = Produtos.verificarCod(cod);
    if (produto) {
      let content = document.getElementById("produtos");
      document.getElementById("contentPesquisa").style.display = "none";

      let table = document.createElement("table");
      table.classList.add("table", "mt-4");
      let thead = document.createElement("thead");
      thead.classList.add("bg-dark", "fw-bold", "text-white", "text-center");
      let rowHead = thead.insertRow();
      rowHead.insertCell(0).innerHTML = "Cod:";
      rowHead.insertCell(1).innerHTML = "Descrição:";
      rowHead.insertCell(2).innerHTML = "Qtd:";

      content.appendChild(table);
      table.appendChild(thead);

      let tBody = document.createElement("tbody");
      tBody.classList.add("bg-table", "text-center");
      let rowBody = tBody.insertRow();

      rowBody.insertCell(0).innerHTML = produto.cod;
      rowBody.insertCell(1).innerHTML =
        produto.descricao.charAt(0).toUpperCase() + produto.descricao.slice(1);
      rowBody.insertCell(2).innerHTML = produto.qtd;

      table.appendChild(tBody);

      let div = document.createElement("div");
      div.classList.add("d-flex", "justify-content-center");
      let btn = document.createElement("button");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        let content = document.getElementById("container");
        let PgEstoque = "/gestao/pages/estoque.html";

        fetch(PgEstoque)
          .then((res) => res.text())
          .then((result) => {
            content.innerHTML = result;
          });
      });
      btn.innerHTML = "Nova consulta";
      btn.classList.add("btn", "btn-primary");

      content.appendChild(div);
      div.appendChild(btn);
    } else {
      let info = document.getElementById("contentInfo");
      info.classList.add("text-danger");
      info.innerHTML = "Produto não cadastrado ou código digitado errado";
    }
  });

  document.getElementById('todosProdutos').addEventListener('click', (e)=>{
    e.preventDefault()

  })
}
