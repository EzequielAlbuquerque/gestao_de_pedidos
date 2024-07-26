class PedididosFinanceiro {
  constructor(dataInicio, dataFinal, cliente) {
    this.dataInicio = dataInicio;
    this.dataFinal = dataFinal;
    this.cliente = cliente;
  }
  recuperarPedidos() {
    let pedidos = localStorage.getItem("pedidos");
    return JSON.parse(pedidos) || [];
  }
  filtrarCliente() {
    let pedido = this.recuperarPedidos();
    let pedidos = pedido.filter((e) => e.cliente === this.cliente);

    return pedidos;
  }
  filtrarClienteData() {
    let pedidos = this.filtrarCliente();
    let datas = this.converterData();

    let resultado = pedidos.filter(
      (p) => (p.data >= datas.dataInicio) & (p.data <= datas.dataFinal)
    );
    return resultado;
  }

  converterData() {
    let inicio = this.dataInicio.split("-");
    let final = this.dataFinal.split("-");
    let dataInicio = `${inicio[2]}/${inicio[1]}/${inicio[0]}`;
    let dataFinal = `${final[2]}/${final[1]}/${final[0]}`;

    return { dataInicio, dataFinal };
  }
  somaTotalPedidos() {
    let pedidosData = this.filtrarClienteData();
    let valores = pedidosData.map((v) => v.totalPedido);
    let total = valores.reduce((a, b) => {
      return a + b;
    }, 0);
    return total;
  }
}

export function eventFinanceiro() {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();

    let select = document.getElementById("pesquisa").value;
    let divFinance = document.getElementById("finance");
    let infoSelect = document.getElementById("infoSelect");
    let contentValor = document.createElement("div");

    switch (select) {
      case "":
        infoSelect.innerHTML = "Selecione uma opção válida";
        infoSelect.classList.add("text-danger");

        break;

      case "cliente":
        divFinance.innerHTML = "";
        infoSelect.innerHTML = "";
        let form = document.createElement("form");
        form.classList.add("row", "pt-3", "align-items-end");
        let divInput = document.createElement("div");
        divInput.classList.add("col-md-4");
        let input = document.createElement("input");
        input.classList.add("form-control");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Nome do cliente");
        input.id = "cliente";

        divFinance.appendChild(form);
        form.appendChild(divInput);
        divInput.appendChild(input);

        let divDataInicio = document.createElement("div");
        divDataInicio.classList.add("col-md-3", "text-center");
        let labelDataInicio = document.createElement("label");
        labelDataInicio.classList.add("form-label");
        labelDataInicio.innerHTML = "Data de inicio:";
        let inputDataInicio = document.createElement("input");
        inputDataInicio.classList.add("form-control");
        inputDataInicio.id = "dataInicio";
        inputDataInicio.setAttribute("type", "date");

        form.appendChild(divDataInicio);
        divDataInicio.appendChild(labelDataInicio);
        divDataInicio.appendChild(inputDataInicio);

        let divdataFinal = document.createElement("div");
        divdataFinal.classList.add("col-md-3", "text-center");
        let labelDataFinal = document.createElement("label");
        labelDataFinal.classList.add("form-label");
        labelDataFinal.innerHTML = "Data final:";
        let inputDataFinal = document.createElement("input");
        inputDataFinal.classList.add("form-control");
        inputDataFinal.id = "dataFinal";
        inputDataFinal.setAttribute("type", "date");

        form.appendChild(divdataFinal);
        divdataFinal.appendChild(labelDataFinal);
        divdataFinal.appendChild(inputDataFinal);

        let divBtn = document.createElement("div");
        divBtn.classList.add("col-md-2");
        let btn = document.createElement("button");
        btn.classList.add("btn", "btn-primary");
        btn.innerHTML = "Pesquisar";
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          let ElementTable = document.querySelectorAll(".table");
          ElementTable.forEach((element) => element.remove());

          let dataInicio = document.getElementById("dataInicio").value;
          let dataFinal = document.getElementById("dataFinal").value;
          let cliente = document.getElementById("cliente").value.toLowerCase();

          let pedidos = new PedididosFinanceiro(dataInicio, dataFinal, cliente);

          let result = pedidos.filtrarClienteData();

          result.forEach((p) => {
            let divFinance = document.getElementById("finance");
            let table = document.createElement("table", "ps-0");

            table.classList.add("table", "mt-4");

            let tHead = document.createElement("thead");
            tHead.classList.add(
              "fw-bold",
              "bg-dark",
              "text-white",
              "text-center"
            );
            let rowHead = tHead.insertRow();
            rowHead.classList.add("grid2");
            rowHead.insertCell(0).innerHTML = "Pedido:";
            rowHead.insertCell(1).innerHTML = "Cliente:";
            rowHead.insertCell(2).innerHTML = "Data:";
            rowHead.insertCell(3).innerHTML = "Valor:";
            rowHead.insertCell(4).innerHTML = "Status:";

            divFinance.appendChild(table);
            table.appendChild(tHead);

            let tBody = document.createElement("tbody");
            tBody.classList.add("bg-tableF");
            let rowBody = tBody.insertRow();
            rowBody.classList.add("grid2", "text-center");
            rowBody.insertCell(0).innerHTML = p.pedido;
            rowBody.insertCell(1).innerHTML = p.cliente;
            rowBody.insertCell(2).innerHTML = p.data;
            rowBody.insertCell(3).innerHTML = parseFloat(
              p.totalPedido
            ).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            });
            rowBody.insertCell(4).innerHTML = "aberto";

            table.appendChild(tBody);
          });

          let total = pedidos.somaTotalPedidos();

          contentValor.innerHTML = "";

          contentValor.classList.add("grid_finance");
          let divValorTotal = document.createElement("div");
          divValorTotal.innerHTML = "Valor total:";
          divValorTotal.classList.add(
            "p-5",
            "text-center",
            "bg-finance",
            "fw-bold",
            "h4",
            "text-white",
            "d-flex",
            "flex-column",
            "justify-content-center"
          );
          let spanInfoTotal = document.createElement("span");
          spanInfoTotal.classList.add("mt-3");
          spanInfoTotal.innerHTML = total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          let divAreceber = document.createElement("div");
          divAreceber.classList.add(
            "p-5",
            "text-center",
            "bg-finance",
            "fw-bold",
            "h4",
            "text-white",
            "d-flex",
            "flex-column",
            "justify-content-center"
          );
          divAreceber.innerHTML = "Valor pago:";
          let spanInfoAreceber = document.createElement("span");
          spanInfoAreceber.classList.add("mt-3");
          spanInfoAreceber.innerHTML = "R$21,00";
          let divPagar = document.createElement("div");
          divPagar.classList.add(
            "p-5",
            "text-center",
            "bg-finance",
            "fw-bold",
            "h4",
            "text-white",
            "d-flex",
            "flex-column",
            "justify-content-center"
          );
          let spanPagar = document.createElement("span");
          let input = document.createElement("input");
          input.classList.add("form-control", "mt-3");
          input.id = "pagar";
          spanPagar.innerHTML = "Pagar:";
          let divEmAberto = document.createElement("div");
          divEmAberto.classList.add(
            "p-5",
            "text-center",
            "bg-finance",
            "fw-bold",
            "h4",
            "text-white",
            "d-flex",
            "flex-column",
            "justify-content-center"
          );
          divEmAberto.innerHTML = "Em aberto:";
          let spanEmAberto = document.createElement("span");
          spanEmAberto.classList.add("mt-3");
          spanEmAberto.innerHTML = "R$:10,90";

          divFinance.appendChild(contentValor);
          contentValor.appendChild(divValorTotal);
          divValorTotal.appendChild(spanInfoTotal);

          contentValor.appendChild(divAreceber);
          divAreceber.appendChild(spanInfoAreceber);

          contentValor.appendChild(divPagar);
          divPagar.appendChild(spanPagar);
          divPagar.appendChild(input);

          contentValor.appendChild(divEmAberto);
          divEmAberto.appendChild(spanEmAberto);
        });

        form.appendChild(divBtn);
        divBtn.appendChild(btn);

        break;

      case "todos":
        divFinance.innerHTML = "";
        infoSelect.innerHTML = "";
        let contain2 = document.getElementById("containerFinance");
        let form2 = document.createElement("form");
        form2.classList.add("row", "pt-3", "align-items-end");
        let divdataFinalT = document.createElement("div");
        divdataFinalT.classList.add("col-md-3", "text-center");
        let labelDataFinalT = document.createElement("label");
        labelDataFinalT.classList.add("form-label");
        labelDataFinalT.innerHTML = "Data Inicio:";
        let inputDataFinalT = document.createElement("input");
        inputDataFinalT.classList.add("form-control");
        inputDataFinalT.setAttribute("type", "date");

        contain2.appendChild(form2);
        form2.appendChild(divdataFinalT);
        divdataFinalT.appendChild(labelDataFinalT);
        divdataFinalT.appendChild(inputDataFinalT);

        let divdataFinalT2 = document.createElement("div");
        divdataFinalT2.classList.add("col-md-3", "text-center");
        let labelDataFinalT2 = document.createElement("label");
        labelDataFinalT2.classList.add("form-label");
        labelDataFinalT2.innerHTML = "Data final:";
        let inputDataFinalT2 = document.createElement("input");
        inputDataFinalT2.classList.add("form-control");
        inputDataFinalT2.setAttribute("type", "date");

        form2.appendChild(divdataFinalT2);
        divdataFinalT2.appendChild(labelDataFinalT2);
        divdataFinalT2.appendChild(inputDataFinalT2);

        let divBtn2 = document.createElement("div");
        divBtn2.classList.add("col-md-2");
        let btn2 = document.createElement("button");
        btn2.classList.add("btn", "btn-primary");
        btn2.innerHTML = "Pesquisar";

        divFinance.appendChild(form2);
        form2.appendChild(divBtn2);
        divBtn2.appendChild(btn2);
        break;
    }
  });
}

function criacaoRelatorio() {}
