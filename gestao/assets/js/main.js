

/*----------Menu----------*/

document.querySelector('.menu').addEventListener('click', ()=>{
    const sidebar = document.querySelector('.sidebar')
    const logo = document.querySelector('.logo')
    const h6 = document.querySelector('h6')
    const nav = document.querySelectorAll('.desable')
    nav.forEach(list =>{
        let navList = list
        navList.classList.toggle('activeNav')
        
    })

    sidebar.classList.toggle('activeSidebar')
    logo.classList.toggle('activeLogo')
    h6.classList.toggle('activeH6')

} )


  /*----- Desativar menu ao clicar no main -----*/ 

  document.addEventListener('click', (event) => {
    const menu = document.querySelector('.menu');
    const sidebar = document.querySelector('.sidebar');
    const logo = document.querySelector('.logo');
    const h6 = document.querySelector('h6');
    const nav = document.querySelectorAll('.desable');

    if (!menu.contains(event.target) && !sidebar.contains(event.target)) {
        nav.forEach(list => {
            let navList = list;
            navList.classList.remove('activeNav');
        });
        sidebar.classList.remove('activeSidebar');
        logo.classList.remove('activeLogo');
        h6.classList.remove('activeH6');
    }
});



/*-------Garantir que a sidebar mantenha o estilo inicial-------*/

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.sidebar').style.width = '44px'
    document.querySelector('.logo').style.display = 'none'
    document.querySelector('h6').style.display = 'none'
    let desable = document.querySelectorAll('.desable')
desable.forEach( list => {
    list.style.display = 'none'
  
});
})

