



export function eventFinanceiro(){
document.getElementById('btn').addEventListener('click', (e)=>{
    e.preventDefault()

    let select = document.getElementById('pesquisa').value
    
    switch (select) {
        case '': 
            break;
    
            case 'cliente': 
            let contain = document.getElementById('containerFinance')
            let form = document.createElement('form')
            form.classList.add('row', 'pt-3', 'align-items-end')
            let divInput = document.createElement('div')
            divInput.classList.add('col-md-4')
            let input = document.createElement('input')
            input.classList.add('form-control')
            input.setAttribute('type', 'text')
            input.setAttribute('placeholder', 'Nome do cliente')

            contain.appendChild(form)
            form.appendChild(divInput)
            divInput.appendChild(input)

            let divDataInicio = document.createElement('div')
            divDataInicio.classList.add('col-md-3', 'text-center')
            let labelDataInicio = document.createElement('label')
            labelDataInicio.classList.add('form-label')
            labelDataInicio.innerHTML = 'Data de inicio:'
            let inputDataInicio = document.createElement('input')
            inputDataInicio.classList.add('form-control')
            inputDataInicio.setAttribute('type', 'date')
            
            form.appendChild(divDataInicio)
            divDataInicio.appendChild(labelDataInicio)
            divDataInicio.appendChild(inputDataInicio)

            let divdataFinal = document.createElement('div')
            divdataFinal.classList.add('col-md-3', 'text-center')
            let labelDataFinal = document.createElement('label')
            labelDataFinal.classList.add('form-label')
            labelDataFinal.innerHTML = 'Data final:'
            let inputDataFinal = document.createElement('input')
            inputDataFinal.classList.add('form-control')
            inputDataFinal.setAttribute('type', 'date')
            
            form.appendChild(divdataFinal)
            divdataFinal.appendChild(labelDataFinal)
            divdataFinal.appendChild(inputDataFinal)
            
            let divBtn = document.createElement('div')
            divBtn.classList.add('col-md-2')
            let btn = document.createElement('button')
            btn.classList.add('btn', 'btn-primary')
            btn.innerHTML = 'Pesquisar'

            form.appendChild(divBtn)
            divBtn.appendChild(btn)

        
            break;
            

            case 'todos': 
            break;

        
    }

  



})
}