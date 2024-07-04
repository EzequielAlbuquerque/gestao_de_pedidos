class GerarPedido {
  static recuperarCliente() {
    let cliente = localStorage.getItem("cliente");
    return JSON.parse(cliente);
  }

  static converterDados() {
    let dados = []
    dados = this.recuperarCliente()
    console.log(dados);
  }
}
let btnPEsquisar = document
  .getElementById("pesquisar-cliente")
  .addEventListener("click", (e) => {
    e.preventDefault()
    
    GerarPedido.converterDados();
  });
