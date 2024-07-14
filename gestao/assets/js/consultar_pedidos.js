class ConsultarPedidos {
  static recuperarPedidos() {
    if (localStorage.getItem("pedidos")) {
      return JSON.parse(localStorage.getItem("pedidos")) || [];
    }
  }
  static verificarCliente(cliente) {
    let pedidos = this.recuperarPedidos();

    let pedidosCliente = pedidos.filter((p) => p.cliente === cliente);

    return pedidosCliente;
  }
  static validarCliente(cliente) {
    let Cliente = this.recuperarPedidos();
    let result = Cliente.some((c) => c.cliente === cliente);
    return result;
  }
}

export function eventConsultarPedido() {
  document.getElementById("pedidoCliente").addEventListener("click", (e) => {
    e.preventDefault();
    let cliente = document.getElementById("nomeCliente");

    if (ConsultarPedidos.validarCliente(cliente.value)) {
      document.getElementById("contentForm").style.display = "none";
      let divPedido = document.getElementById("pedidos");
      let divInfo = document.createElement("div");
      divInfo.classList.add("mb-3", "display-6");
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

      divInfo.textContent = `Cliente: ${cliente.value}`;

      divPedido.appendChild(divInfo);

      let listaPedido = ConsultarPedidos.verificarCliente(cliente.value);

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
        btn.addEventListener("click", () => {
          alert("ola");
        });
        let table = document.createElement("table");
        table.classList.add(
          "table",
          "table-bordered",
          "mb-4",
          "bg-table",
          "fw-bold",
          "text-center"
        );
        let head = document.createElement("thead");
        let rowHead = head.insertRow();
        head.classList.add("bg-dark", "text-light");

        let body = document.createElement("tbody");

        rowHead.insertCell(0).textContent = "Cod:";
        rowHead.insertCell(1).textContent = "Descrição:";
        rowHead.insertCell(2).textContent = "Qtd:";
        rowHead.insertCell(3).textContent = "Valor und:";
        rowHead.insertCell(4).textContent = "Total:";

        pedido.produtos.forEach((produtos) => {
          let rowBody = body.insertRow();
          rowBody.insertCell(0).textContent = produtos.cod;
          rowBody.insertCell(1).textContent = produtos.descricao;
          rowBody.insertCell(2).textContent = produtos.qtd;
          rowBody.insertCell(3).textContent = produtos.valorUnid;
          rowBody.insertCell(4).textContent = produtos.total;
        });

        divPedido.appendChild(divInfo);

        divInfo.appendChild(spanData);
        divInfo.appendChild(spanPedido);
        divPedido.appendChild(table);
        divInfo.appendChild(btn);
        table.appendChild(head);
        table.appendChild(body);
        divPedido.appendChild(DivBtnNovaConsulta);
        DivBtnNovaConsulta.appendChild(BtnNovaConsulta);
      });
    } else {
      document.getElementById("pesquisaCliente").innerHTML =
        "Cliente não possui pedido.";
    }
  });
}
