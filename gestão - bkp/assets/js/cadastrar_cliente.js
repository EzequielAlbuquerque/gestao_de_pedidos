class CadastroCliente {
  constructor(cliente, fone, endereco, numero, complemento, cep) {
    this.cliente = cliente;
    this.fone = fone;
    this.endereco = endereco;
    this.numero = numero;
    this.complemento = complemento;
    this.cep = cep;
  }

  recuperarDados() {
    let listaCliente = localStorage.getItem("cliente");
    return JSON.parse(listaCliente) || [];
  }

  converterDados() {
    let clientes = this.recuperarDados();

    let dados = {
      cliente: this.cliente,
      fone: this.fone,
      endereco: this.fone,
      numero: this.numero,
      complemento: this.complemento,
      cep: this.cep,
    };

    clientes.push(dados);
    return clientes;
  }
  salvarDados() {
    let dadosConvertidos = this.converterDados();
    localStorage.setItem("cliente", JSON.stringify(dadosConvertidos));
  }
}
document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();

  let cliente = document.getElementById("cliente");
  let fone = document.getElementById("fone");
  let endereco = document.getElementById("endereco");
  let numero = document.getElementById("numero");
  let complemento = document.getElementById("complemento");
  let cep = document.getElementById("cep");

  let cadastroCliente = new CadastroCliente(
    cliente.value,
    fone.value,
    endereco.value,
    numero.value,
    complemento.value,
    cep.value
  );

  if (
    cliente.value === "" ||
    fone.value === "" ||
    endereco.value === "" ||
    numero.value === "" ||
    complemento.value === "" ||
    cep.value === "" ||
    !/[0-9]/.test(cep.value)
  ) {
    setTimeout(()=>{
        document.getElementById("msgError").style.opacity = "10";
    })
    setTimeout(()=>{
        document.getElementById("msgError").style.opacity = "0";
    },4000)
   
  }

  else {
    cadastroCliente.salvarDados();
    if ((document.getElementById("msgError").style.opacity = "10")) {
      document.getElementById("msgError").style.opacity = "0";
      setTimeout(()=>{
        document.getElementById("msgSuccsess").style.opacity = "10";
    })
    setTimeout(()=>{
        document.getElementById("msgSuccsess").style.opacity = "0";
    },4000)
 
      document.querySelector('.textCep').innerHTML =''

      cliente.value = "";
      fone.value = "";
      endereco.value = "";
      numero.value = "";
      complemento.value = "";
      cep.value = "";
    }
  }
 
  
});
