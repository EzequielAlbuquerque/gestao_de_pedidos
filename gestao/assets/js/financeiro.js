class PedididosFinanceiro{
    static recuperarPedidos(){
        let pedidos = localStorage.getItem('pedidos')
        return JSON.parse(pedidos) || []

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
        inputDataFinal.setAttribute("type", "date");

        form.appendChild(divdataFinal);
        divdataFinal.appendChild(labelDataFinal);
        divdataFinal.appendChild(inputDataFinal);

        let divBtn = document.createElement("div");
        divBtn.classList.add("col-md-2");
        let btn = document.createElement("button");
        btn.classList.add("btn", "btn-primary");
        btn.innerHTML = "Pesquisar";
        btn.addEventListener('click', (e)=>{
            e.preventDefault()

            console.log(PedididosFinanceiro.recuperarPedidos())
        })

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
