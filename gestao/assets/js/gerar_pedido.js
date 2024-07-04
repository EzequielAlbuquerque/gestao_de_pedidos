class GerarPedido {
  constructor() {
    if (!localStorage.getItem("NumeroPedido")) {
      localStorage.setItem("NumeroPedido", 100);
    }
  }
  static recuperarDadosCliente() {
    let DadosCliente = localStorage.getItem("cliente");
    return JSON.parse(DadosCliente);
  }

  static converterDados(Cliente) {
    let dados = this.recuperarDadosCliente();

    return dados.some((c) => c.cliente === Cliente);
  }

  recuperarNumeroPedido() {
    let getNumero = localStorage.getItem("NumeroPedido");
    return parseInt(getNumero, 10);
  }
  proximoNumero() {
    let proximoNumero = this.recuperarNumeroPedido();

    return proximoNumero + 1;
  }

  salvarNovoNumero() {
    let novoNumero = this.proximoNumero();
    localStorage.setItem("NumeroPedido", novoNumero);
    return novoNumero;
  }
}

class RecuperarProdutos {
  static recuperarProduto() {
    let recuperarProduto = localStorage.getItem("produtos");
    return JSON.parse(recuperarProduto);
  }
  static recuperarProdutoCod(cod) {
    let produtoConvertido = this.recuperarProduto();
    let encontrarProduto = produtoConvertido.find((c) => c.cod === cod);
    if (encontrarProduto) {
      document.getElementById("descricao").value =
        encontrarProduto.descricao.toUpperCase();
      document.getElementById("textCod").value = "";
    } else {
      let textCod = document.getElementById("textCod");
      textCod.innerHTML = "Produto não encontrado";
    }
  }
}

class AddProduto {
  constructor(qtd) {
    this.qtd = parseInt(qtd);
  }
  recuperarQtdProduto() {
    let recuperarQtd = localStorage.getItem("produtos");
    return JSON.parse(recuperarQtd);
  }

  subitrairQtdProduto(cod) {
    let listaProdutos = this.recuperarQtdProduto();
    let verificarValorProduto = listaProdutos.find((codi) => codi.cod === cod);
    if (verificarValorProduto) {
      if (verificarValorProduto.qtd >= this.qtd) {
        verificarValorProduto.qtd -= this.qtd;
        localStorage.setItem("produtos", JSON.stringify(listaProdutos));
        return verificarValorProduto;
      } else {
        document.getElementById("textQtd").innerHTML =
          "Produto não tem estoque";
      }
    }
  }
}

export function eventPesquisaCliente() {
  document
    .getElementById("pesquisar-cliente")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let Cliente = document.getElementById("Cliente").value.toLowerCase();
      let Gp = new GerarPedido();

      if (GerarPedido.converterDados(Cliente)) {
        document.getElementById("PeidoCliente").value = Cliente.toUpperCase();
        document.getElementById("Cliente").value = "";
        let dataAtual = new Date();
        document.getElementById("data").value = dataAtual.toLocaleDateString();
        document.getElementById("infoCadastro").innerText = "";
        document.getElementById("nPedido").value = `Nª${Gp.salvarNovoNumero()}`;
      } else {
        document.getElementById("infoCadastro").innerText =
          "Dados inválidos ou cliente não possui cadastro.";
      }
    });

  document
    .getElementById("consultarProduto")
    .addEventListener("click", (ev) => {
      ev.preventDefault();

      let cod = document.getElementById("cod").value;

      RecuperarProdutos.recuperarProdutoCod(cod);
    });

  document.getElementById("addProduto").addEventListener("click", (ep) => {
    ep.preventDefault();
    let cod = document.getElementById("cod").value;

    let add = new AddProduto(qtd.value);
    add.subitrairQtdProduto(cod);
  });
  valor.addEventListener("blur", () => {
    let qtd = document.getElementById("qtd");
    let valor = document.getElementById("valor");
    let total = document.getElementById("total");
    let soma = qtd.value * parseFloat(valor.value);
    if (valor.value) {
      total.value = parseFloat(soma).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  });

  document.getElementById("btnPedido").addEventListener("click", () => {
    let button = document.querySelectorAll(".btns");
    button.forEach((b) => {
      b.disabled = true;

      return b;
    });

    let input = document.querySelectorAll("input");
    input.forEach((i) => {
      i.readOnly = true;

      return i;
    });

    document.querySelector(".Modal").style.opacity = "10";
  });

  document.getElementById("btnFechar").addEventListener("click", () => {
    document.querySelector(".Modal").style.opacity = "0";
    let button = document.querySelectorAll(".btns");
    button.forEach((b) => {
      b.disabled = false;

      return b;
    });

    let input = document.querySelectorAll("input");
    input.forEach((i) => {
      i.readOnly = false;

      return i;
    });
  });
}
