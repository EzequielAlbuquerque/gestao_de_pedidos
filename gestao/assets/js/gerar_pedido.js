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
    this.qtd = parseFloat(qtd);
    this.valor = parseFloat(valor);
    this.total = total


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
  recuperarDados(){
    let dados = {
      cliente: this.cliente,
      data: this.data,
      pedido: this.pedido,
      cod: this.cod,
      descricao: this.descricao,
      qtd: this.qtd || 0,
      valor_und: this.valor ||0,
      total: this.total || 0

    }

    return dados
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
0
      RecuperarProdutos.recuperarProdutoCod(cod);
    });
   let n = 0
  document.getElementById("addProduto").addEventListener("click", (ep) => {
    ep.preventDefault();
    let cliente = document.getElementById("PeidoCliente").value;
    let data = document.getElementById("data").value;
    let pedido = document.getElementById("nPedido").value;
    let cod = document.getElementById("cod").value;
    let descricao = document.getElementById("descricao").value;
    let qtd = document.getElementById("qtd").value;
    let valor = document.getElementById("valor").value;
    let total = document.getElementById("total").value;
    

    let add = new AddProduto(cliente, data, pedido, cod, descricao, qtd, valor, total);
    add.subtrairQtdProduto(cod);
    

    add.recuperarDados()

    n++
    let btn = document.createElement('button')
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    btn.style.border = 'none'
    btn.classList.add('bg-info')
    document.getElementById('contentTable').style.display = 'block'
    document.getElementById('dataPedido').innerHTML = add.recuperarDados().data
    document.getElementById('numeroPedido').innerHTML = `Pedido: ${add.recuperarDados().pedido}`
    let table = document.getElementById('bTable')
    let linha = table.insertRow()
    linha.insertCell(0).innerHTML = n
    linha.insertCell(1).innerHTML = add.recuperarDados().cod
    linha.insertCell(2).innerHTML = add.recuperarDados().descricao.toLowerCase()
    linha.insertCell(3).innerHTML = add.recuperarDados().qtd
    linha.insertCell(4).innerHTML = parseFloat(add.recuperarDados().valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    }); 
    linha.insertCell(5).innerHTML = add.recuperarDados().total
    linha.insertCell(6).append(btn)

    
    
    

    

  });
  valor.addEventListener("blur", () => {
    let qtd = document.getElementById("qtd");
    let valor = document.getElementById("valor");
    let total = document.getElementById("total");
    let soma = qtd.value * parseFloat(valor.value.replace(',', '.'));
    if (valor.value) {
      total.value = parseFloat(soma).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  });

  document.getElementById("btnPedido").addEventListener("click", () => {
    document.querySelector(".modalContent").style.display = "block";
    document.querySelector(".Modal").style.opacity = "10";
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
  });

  document.getElementById("btnFechar").addEventListener("click", () => {
    document.querySelector(".Modal").style.opacity = "0";
    document.querySelector(".modalContent").style.display = "none";
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
