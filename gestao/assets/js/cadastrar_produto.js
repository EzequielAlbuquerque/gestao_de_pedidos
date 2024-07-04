class CadastrarProduto {
  constructor(cod, descricao, qtd, custo) {
    this.cod = cod;
    this.descricao = descricao;
    this.qtd = parseInt(qtd);
    this.custo = parseFloat(custo);
  }
  recuperarListaProduto() {
    let produtos = localStorage.getItem("produtos");
    return JSON.parse(produtos) || [];
  }
  converterListaProduto() {
    let listProdutos = this.recuperarListaProduto();

    let verificarProduto = listProdutos.find(
      (codigo) => codigo.cod === this.cod
    );
    if (verificarProduto) {
      verificarProduto.qtd = parseInt(verificarProduto.qtd) + this.qtd;
    } else {
      let listaNovoProduto = {
        cod: this.cod,
        descricao: this.descricao,
        qtd: this.qtd,
        cuto: this.custo,
      };

      listProdutos.push(listaNovoProduto);
    }

    return listProdutos;
  }

  salvarProdutos() {
    let produtosConvertidos = this.converterListaProduto();
    let listaSalva = localStorage.setItem(
      "produtos",
      JSON.stringify(produtosConvertidos)
    );
    return listaSalva;
  }
}

export function eventCadastroProduto() {
  document.getElementById("btnCadastrar").addEventListener("click", (event) => {
    event.preventDefault();

    let cod = document.getElementById("cod");
    let descricao = document.getElementById("descricao");
    let qtd = document.getElementById("qtd");
    let custo = document.getElementById("custo");

    let Cp = new CadastrarProduto(
      cod.value,
      descricao.value.toLowerCase(),
      qtd.value,
      custo.value
    );

    if (
      cod.value === "" ||
      descricao.value === "" ||
      qtd.value === "" ||
      custo.value === ""
    ) {
      setTimeout(() => {
        document.getElementById("msgError").style.opacity = "10";
      });
      setTimeout(() => {
        document.getElementById("msgError").style.opacity = "0";
      }, 4000);
    } else {
      Cp.salvarProdutos();
      if ((document.getElementById("msgError").style.opacity = "10")) {
        document.getElementById("msgError").style.opacity = "0";
        setTimeout(() => {
          document.getElementById("msgSuccsess").style.opacity = "10";
        });
        setTimeout(() => {
          document.getElementById("msgSuccsess").style.opacity = "0";
        }, 4000);

        cod.value = "";
        descricao.value = "";
        qtd.value = "";
        custo.value = "";
      }
    }
  });
}
