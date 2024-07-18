class GerarPedido {
  constructor() {
    if (!localStorage.getItem("NumeroPedido")) {
      localStorage.setItem("NumeroPedido", 100);
    }

    if (!localStorage.getItem("pedidos")) {
      localStorage.setItem("pedidos", JSON.stringify([]));
    }
  }
  static recuperarDadosCliente() {
    let DadosCliente = localStorage.getItem("cliente");
    return JSON.parse(DadosCliente);
  }

  static converterDados(Cliente) {
    let dados = this.recuperarDadosCliente();

    return dados.find((c) => c.cliente === Cliente);
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
  constructor(cliente, data, pedido, cod, descricao, qtd, valor, total) {
    this.cliente = cliente;
    this.data = data;
    this.pedido = pedido;
    this.cod = cod;
    this.descricao = descricao;
    this.qtd = parseInt(qtd);
    this.valor = parseFloat(valor);
    this.total = total;
  }
  recuperarQtdProduto() {
    let recuperarQtd = localStorage.getItem("produtos");
    return JSON.parse(recuperarQtd);
  }

  subtrairQtdProduto(cod) {
    let listaProdutos = this.recuperarQtdProduto();
    let verificarValorProduto = listaProdutos.find((codi) => codi.cod === cod);
    if (verificarValorProduto) {
      if (parseFloat(verificarValorProduto.qtd) >= this.qtd) {
        verificarValorProduto.qtd -= this.qtd;
        localStorage.setItem("produtos", JSON.stringify(listaProdutos));
        return verificarValorProduto;
      } else {
        document.getElementById("textQtd").innerHTML =
          "Produto não tem estoque";
      }
    }
  }
  recuperarDados() {
    let dados = {
      cliente: this.cliente,
      data: this.data,
      pedido: this.pedido,
      cod: this.cod,
      descricao: this.descricao,
      qtd: parseInt(this.qtd) || 0,
      valor_und: this.valor || 0,
      total: this.total || 0,
    };

    return dados;
  }
}

class SalvarPedidoLocalStorage {
  constructor(table, cliente, pedido, data, totalP) {
    this.table = table;
    this.cliente = cliente.toLowerCase();
    this.pedido = pedido;
    this.data = data;
    this.totalP = parseFloat(totalP);

    if (!localStorage.getItem("pedidos")) {
      localStorage.setItem("pedidos", JSON.stringify([]));
    }
  }
  recuperdarPedidos() {
    let pedidos = JSON.parse(localStorage.getItem("pedidos"));
    return pedidos;
  }
  salvarPedido() {
    let pedidos = this.recuperdarPedidos();
    let rows = this.table.rows;
    let produtos = [];

    for (let i = 0; i < rows.length; i++) {
      let indice = rows[i].cells[0].textContent;
      let cod = rows[i].cells[1].textContent;
      let descricao = rows[i].cells[2].textContent;
      let qtd = rows[i].cells[3].textContent;
      let valor = rows[i].cells[4].textContent;
      let total = rows[i].cells[5].textContent;

      let produto = {
        indice: indice,
        cod: cod,
        descricao: descricao,
        qtd: qtd,
        valorUnid: valor,
        total: total,
      };
      produtos.push(produto);
    }
    let pedido = {
      cliente: this.cliente,
      pedido: this.pedido,
      data: this.data,
      totalPedido: this.totalP,
      produtos: produtos,
    };
    pedidos.push(pedido);
    return localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }
}

export function eventGerarPedido() {
  //----- Pesquisa de cliente -----//
  document
    .getElementById("pesquisar-cliente")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let Cliente = document.getElementById("Cliente").value.toLowerCase();
      let Gp = new GerarPedido();

      if (GerarPedido.converterDados(Cliente)) {
        document.getElementById("PedidoCliente").value = Cliente.toUpperCase();
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
  //----- Adição dos produtos -----//
  let n = 0;
  document.getElementById("addProduto").addEventListener("click", (ep) => {
    ep.preventDefault();

    let cliente = document.getElementById("PedidoCliente").value;
    let data = document.getElementById("data").value;
    let pedido = document.getElementById("nPedido").value;
    let cod = document.getElementById("cod").value;
    let descricao = document.getElementById("descricao").value;
    let qtd = document.getElementById("qtd").value;
    let valor = parseFloat(
      document.getElementById("valor").value.replace(",", ".")
    );
    let total = document.getElementById("total").value;

    if (
      cliente &&
      descricao &&
      data &&
      pedido &&
      cod &&
      qtd &&
      valor &&
      total
    ) {
      let add = new AddProduto(
        cliente,
        data,
        pedido,
        cod,
        descricao,
        qtd,
        valor,
        total
      );
      add.subtrairQtdProduto(cod);

      add.recuperarDados();

      n++;
      let btn = document.createElement("button");
      btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      btn.style.border = "none";
      btn.classList.add("bg-info");
      document.getElementById("contentTable").style.display = "block";
      document.getElementById("clientePedido").innerHTML = `Cliente: ${add
        .recuperarDados()
        .cliente.toLowerCase()}`;
      document.getElementById("dataPedido").innerHTML =
        add.recuperarDados().data;
      document.getElementById("numeroPedido").innerHTML = `Pedido: ${
        add.recuperarDados().pedido
      }`;
      let table = document.getElementById("bTable");
      let linha = table.insertRow();

      linha.id = `linha${n}`;
      linha.insertCell(0).innerHTML = n;
      linha.insertCell(1).innerHTML = add.recuperarDados().cod;
      linha.insertCell(2).innerHTML = add
        .recuperarDados()
        .descricao.toLowerCase().charAt(0).toUpperCase() + add
        .recuperarDados()
        .descricao.toLowerCase().slice(1) ;
      linha.insertCell(3).innerHTML = add.recuperarDados().qtd;
      linha.insertCell(4).innerHTML = parseFloat(
        add.recuperarDados().valor_und
      ).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      linha.insertCell(5).innerHTML = add
        .recuperarDados()
        .total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      linha.insertCell(6).append(btn);

      atualizarSoma();

      document.getElementById("btnPedido").style.display = "block";
      document.getElementById("cod").value = "";
      document.getElementById("descricao").value = "";
      document.getElementById("qtd").value = "";
      document.getElementById("valor").value = "";
      document.getElementById("total").value = "";
      document.getElementById("textCod").innerText = "";
      let opacity = document.querySelectorAll(".opc");
      opacity.forEach((o) => {
        o.style.display = "none";
      });

      let rows = table.rows;
      //----- Botao de exclusao de produto da lista de pedidos -----//
      btn.addEventListener("click", () => {
        linha.remove();
        for (let i = 0; i < rows.length; i++) {
          rows[i].id = `linha${i + 1}`;
          rows[i].cells[0].innerText = i + 1;
        }

        n = rows.length;
        atualizarSoma();
      });
    } else {
      setTimeout(() => {
        document.getElementById("msgErrorPedido").style.opacity = "10";
      });
      setTimeout(() => {
        document.getElementById("msgErrorPedido").style.opacity = "0";
      }, 4000);
    }
  });
  //----- soma dos valores -----//
  valor.addEventListener("blur", () => {
    let qtd = document.getElementById("qtd");
    let valor = document.getElementById("valor").value.replace(",", ".");
    let total = document.getElementById("total");
    let soma = qtd.value * valor;

    total.value = parseFloat(soma).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  });

  //----- modal voltar ou confirmar pedido -----//
  document.getElementById("btnPedido").addEventListener("click", () => {
    let contentModal = document.querySelector("#modalContent");
    let modal = document.querySelector("#modal");
    contentModal.classList.toggle("hide");
    modal.classList.toggle("hide");
  });

  //----- desativa o modal ao clicar em voltar ----//
  document.getElementById("btnFechar").addEventListener("click", () => {
    let contentModal = document.querySelector("#modalContent");
    let modal = document.querySelector("#modal");
    contentModal.classList.toggle("hide");
    modal.classList.toggle("hide");
  });
  //----- modal confirmação do pedido/pedido salvo no localSotarage -----//
  document.getElementById("confirmarPedido").addEventListener("click", () => {
    let contentModal2 = document.querySelector("#modalContent2");
    let modal2 = document.querySelector("#modal2");
    contentModal2.classList.toggle("hide");
    modal2.classList.toggle("hide");

    let contentModal = document.querySelector("#modalContent");
    let modal = document.querySelector("#modal");
    contentModal.classList.toggle("hide");
    modal.classList.toggle("hide");

    let tab = document.getElementById("bTable");
    let clienteP = document.getElementById("PedidoCliente").value;
    let pedidoP = document.getElementById("nPedido").value;
    let data = document.getElementById("data").value;
    let totalP = document
      .getElementById("Ttotal")
      .textContent.replace("Total:", "")
      .replace("R$", "")
      .replace(",", ".");

    let pdPedidos = new SalvarPedidoLocalStorage(
      tab,
      clienteP,
      pedidoP,
      data,
      totalP
    );

    pdPedidos.salvarPedido();

    document.getElementById("btnPedido").style.display = "none";
    document.getElementById("contentTable").style.display = "none";
    document.getElementById("Cliente").style.display = "block";
    document.getElementById("data").value = "";
    document.getElementById("nPedido").value = "";
    document.getElementById("PedidoCliente").value = "";
    let opacity = document.querySelectorAll(".opc");
    opacity.forEach((o) => {
      o.style.display = "block";
    });
  });
  //----- voltar ao inicio -----//
  document.getElementById("btnNao").addEventListener("click", () => {
    window.location.reload();
  });

  //----- gerar novo pedido -----//
  document.getElementById("btnSim").addEventListener("click", () => {
    let PgGerarPedido = "/gestao/pages/gerar_pedido.html";
    let content = document.getElementById("container");
    fetch(PgGerarPedido)
      .then((resp) => resp.text())
      .then((result) => {
        content.innerHTML = result;
        eventGerarPedido();
      });
  });

  function atualizarSoma() {
    let soma = 0;
    let table = document.getElementById("bTable");
    for (let l = 0, row; (row = table.rows[l]); l++) {
      let colls = row.cells[5];
      let valor = parseFloat(
        colls.innerText.replace("R$", "").replace(",", ".")
      );
      soma += valor;
    }
    document.getElementById(
      "Ttotal"
    ).textContent = `Total: ${soma.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  }
}
