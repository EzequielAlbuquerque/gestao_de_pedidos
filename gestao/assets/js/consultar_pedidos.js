class ConsultarPedidos {
  static recuperarPedidos() {
    return JSON.parse(localStorage.getItem("pedidos")) || [];
  }

  static verificarCliente(cliente) {
    let pedidos = this.recuperarPedidos();
    return pedidos.filter((p) => p.cliente === cliente);
  }

  static validarCliente(cliente) {
    let pedidos = this.recuperarPedidos();
    return pedidos.some((p) => p.cliente === cliente);
  }
}

class RemoverPedido {
  constructor(npedido) {
    this.pedido = npedido;
  }

  recuperarPedidos() {
    return ConsultarPedidos.recuperarPedidos();
  }

  verificarPedido() {
    let pedidos = this.recuperarPedidos();
    return pedidos.findIndex((p) => p.pedido === this.pedido);
  }

  excluirPedido() {
    let pedidos = this.recuperarPedidos();
    let index = this.verificarPedido();
    if (index > -1) {
      pedidos.splice(index, 1);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    }
    return pedidos;
  }
}

export function eventConsultarPedido() {
  /* ----- botao de consultar pedidos por clientes */
  document.getElementById("pedidoCliente").addEventListener("click", (e) => {
    e.preventDefault();
    let cliente = document.getElementById("nomeCliente").value;

    if (ConsultarPedidos.validarCliente(cliente)) {
      carregarPedidos();
    } else {
      document.getElementById("pesquisaCliente").innerHTML =
        "Cliente não possui pedido.";
    }
  });
  /* ----- botao de consultar todos os pedidos ----- */
  document.getElementById("todosPedidos").addEventListener("click", (e) => {
    e.preventDefault();

    carregarTodosPedidos();
  });
}
/* ----- função que carrega pedidos por cliente ----- */
function carregarPedidos() {
  let cliente = document.getElementById("nomeCliente").value;
  let divPedido = document.getElementById("pedidos");

  divPedido.innerHTML = "";

  document.getElementById("contentForm").style.display = "none";

  let divInfo = document.createElement("div");
  divInfo.classList.add("mb-3", "display-6");
  divInfo.id = "clienteDiv";
  divInfo.textContent = `Cliente: ${
    cliente.charAt(0).toUpperCase() + cliente.slice(1)
  }`;
  divPedido.appendChild(divInfo);

  let listaPedido = ConsultarPedidos.verificarCliente(cliente);

  listaPedido.forEach((pedido) => {
    let divInfo = document.createElement("div");
    divInfo.classList.add(
      "d-flex",
      "justify-content-between",
      "p-2",
      "border",
      "align-items-center",
      "bg-light",
      "fw-bold"
    );

    let spanData = document.createElement("span");
    spanData.innerHTML = `Data do pedido: ${pedido.data}`;
    let spanPedido = document.createElement("span");
    spanPedido.innerHTML = `Pedido: ${pedido.pedido}`;
    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-success");
    btn.innerHTML = "Baixar pedido";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let nPedido = pedido.pedido;
      let removerPedido = new RemoverPedido(nPedido);
      removerPedido.excluirPedido();
      carregarPedidos();
      verificarPedido();
    });

    divInfo.appendChild(spanData);
    divInfo.appendChild(spanPedido);
    divInfo.appendChild(btn);
    divPedido.appendChild(divInfo);

    let table = document.createElement("table");
    table.classList.add("table", "mb-4", "bg-table", "text-center");

    let head = document.createElement("thead");
    let rowHead = head.insertRow();
    head.classList.add("bg-dark", "text-light", "fw-bold");

    rowHead.insertCell(0).textContent = "Cod:";
    rowHead.insertCell(1).textContent = "Descrição:";
    rowHead.insertCell(2).textContent = "Qtd:";
    rowHead.insertCell(3).textContent = "Valor und:";
    rowHead.insertCell(4).textContent = "Total:";

    let body = document.createElement("tbody");
    pedido.produtos.forEach((produto) => {
      let rowBody = body.insertRow();
      rowBody.insertCell(0).textContent = produto.cod;
      rowBody.insertCell(1).textContent = produto.descricao;
      rowBody.insertCell(2).textContent = produto.qtd;
      rowBody.insertCell(3).textContent = produto.valorUnid;
      rowBody.insertCell(4).textContent = produto.total;
    });

    table.appendChild(head);
    table.appendChild(body);
    divPedido.appendChild(table);
  });

  let DivBtnNovaConsulta = document.createElement("div");
  DivBtnNovaConsulta.classList.add("d-flex", "justify-content-center");
  let BtnNovaConsulta = document.createElement("button");
  BtnNovaConsulta.classList.add("btn", "btn-primary", "mb-4");
  BtnNovaConsulta.innerHTML = "Nova consulta";
  BtnNovaConsulta.addEventListener("click", () => {
    let PgConsultarPedido = "/gestao/pages/consultar_pedidos.html";
    let content = document.getElementById("container");

    fetch(PgConsultarPedido)
      .then((resp) => resp.text())
      .then((result) => {
        content.innerHTML = result;
        eventConsultarPedido();
      });
  });
  DivBtnNovaConsulta.appendChild(BtnNovaConsulta);
  divPedido.appendChild(DivBtnNovaConsulta);
}

/* função para atualizar a pagina quando o pedido for baixado */
function verificarPedido() {
  let pedidos = ConsultarPedidos.recuperarPedidos();
  let NomeCliente = document
    .getElementById("clienteDiv")
    .innerText.replace("Cliente:", "")
    .trim();

  let verificar = pedidos.some((p) => p.cliente === NomeCliente);

  if (!verificar) {
    let NomeCliente = document.getElementById("clienteDiv");
    NomeCliente.innerHTML = "Todos os pedidos foram baixados";
    NomeCliente.classList.add(
      "text-danger",
      "d-flex",
      "justify-content-center"
    );
  }
}
/* ----- função para carregar todos os pedidos -----*/
function carregarTodosPedidos() {
  let divPedido = document.getElementById("pedidos");

  divPedido.innerHTML = "";

  let pedidos = ConsultarPedidos.recuperarPedidos();
  document.getElementById("contentForm").style.display = "none";

  pedidos.forEach((pedidos) => {
    let divPedido = document.getElementById("pedidos");
    let divInfo = document.createElement("div");
    divInfo.classList.add(
      "border",
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "p-2",
      "bg-light"
    );
    let spanCliente = document.createElement("span");
    spanCliente.classList.add("fw-bold");
    spanCliente.id = "clienteDiv";
    spanCliente.innerHTML = `Cliente: ${
      pedidos.cliente.charAt(0).toUpperCase() + pedidos.cliente.slice(1)
    }`;
    spanCliente.classList.add("fw-bold");
    let spanData = document.createElement("span");
    spanData.classList.add("fw-bold");
    spanData.innerHTML = `Data: ${pedidos.data}`;
    let spanNpedido = document.createElement("span");
    spanNpedido.classList.add("fw-bold");
    spanNpedido.innerHTML = `Pedido: ${pedidos.pedido}`;
    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-success");
    btn.innerHTML = "Baixar pedido";
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      let nPedido = pedidos.pedido;
      let removerPedido = new RemoverPedido(nPedido);
      removerPedido.excluirPedido();
      carregarTodosPedidos();
    });

    divPedido.appendChild(divInfo);
    divInfo.appendChild(spanCliente);
    divInfo.appendChild(spanData);
    divInfo.appendChild(spanNpedido);
    divInfo.appendChild(btn);

    let table = document.createElement("table");
    table.classList.add("table", "mb-4", "bg-table", "text-center");
    let thead = document.createElement("thead");
    thead.classList.add("bg-dark", "text-white", "fw-bold");
    let rowHead = thead.insertRow();

    rowHead.insertCell(0).textContent = "Cod:";
    rowHead.insertCell(1).textContent = "Descrição:";
    rowHead.insertCell(2).textContent = "Qtd:";
    rowHead.insertCell(3).textContent = "Valor und:";
    rowHead.insertCell(4).textContent = "Total:";

    let tbody = document.createElement("tbody");
    tbody.classList.add("bg-table");

    pedidos.produtos.forEach((produto) => {
      let rowBody = tbody.insertRow();

      rowBody.insertCell(0).textContent = produto.cod;
      rowBody.insertCell(1).textContent = produto.descricao;
      rowBody.insertCell(2).textContent = produto.qtd;
      rowBody.insertCell(3).textContent = produto.valorUnid;
      rowBody.insertCell(4).textContent = produto.total;
    });

    divPedido.appendChild(table);
    table.appendChild(thead);
    table.appendChild(tbody);
  });

  let index = pedidos.findIndex((p) => p.cliente);
  if (index === -1) {
    let info = document.getElementById("pedidos");
    info.classList.add("text-danger", "display-5", "text-center");
    info.innerHTML = "Não há pedidos em aberto.";
  }
}
