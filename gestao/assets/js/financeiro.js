class PedididosFinanceiro {
  static recuperarPedidos() {
    let pedidos = localStorage.getItem("pedidos");
    return JSON.parse(pedidos) || [];
  }
}

export function eventFinanceiro() {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault();

    let select = document.getElementById("pesquisa").value;
    let divFinance = document.getElementById("finance");
    let infoSelect = document.getElementById("infoSelect");

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

          let pedidos = PedididosFinanceiro.recuperarPedidos();
          let dataInicio = document.getElementById("dataInicio").value;
          let dataFinal = document.getElementById("dataFinal").value;
          let cliente = document.getElementById("cliente").value.toLowerCase();
          dataInicio = dataInicio.split("-");
          dataFinal = dataFinal.split("-");
          let dataInicioConv = `${dataInicio[2]}/${dataInicio[1]}/${dataInicio[0]}`;
          let dataFinalConv = `${dataFinal[2]}/${dataFinal[1]}/${dataFinal[0]}`;

          let pedido = pedidos.filter((pv) => pv.cliente === cliente);

          let result = pedido.filter(
            (d) => d.data >= dataInicioConv && d.data <= dataFinalConv
          );

          result.forEach((p) => {
            let divFinance = document.getElementById("finance");
            let table = document.createElement("table", 'ps-0');

            table.classList.add("table", "m-4");

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

          let contentValor = document.createElement('div')
          contentValor.classList.add('d-flex', 'justify-content-around', 'ms-4')
          let divValorTotal = document.createElement('div')
          divValorTotal.classList.add('p-5', 'text-center', 'bg-finance', 'fw-bold')
          let spanInfoTotal = document.createElement('span')
          spanInfoTotal.innerHTML = 'Valor total:'
          let divAreceber = document.createElement('div')
          divAreceber.classList.add('p-5', 'text-center', 'bg-finance', 'fw-bold')
          let spanInfoAreceber = document.createElement('span')
          spanInfoAreceber.innerHTML = 'A receber:'
          let divPagar = document.createElement('div')
          divPagar.classList.add('p-5', 'text-center', 'bg-finance', 'fw-bold')
          let spanPagar = document.createElement('span')
          spanPagar.innerHTML = 'Pagar:'
          let divEmAberto = document.createElement('div')
          divEmAberto.classList.add('p-5', 'text-center', 'bg-finance', 'fw-bold')
          let spanEmAberto = document.createElement('span')
          spanEmAberto.innerHTML = 'Em aberto:'

          divFinance.appendChild(contentValor)
          contentValor.appendChild(divValorTotal)
          divValorTotal.appendChild(spanInfoTotal)

          contentValor.appendChild(divAreceber)
          divAreceber.appendChild(spanInfoAreceber)

          contentValor.appendChild(divPagar)
          divPagar.appendChild(spanPagar)

          contentValor.appendChild(divEmAberto)
          divEmAberto.appendChild(spanEmAberto)


        
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
