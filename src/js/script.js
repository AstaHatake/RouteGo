//https://github.com/AstaHatake/RouteGo.git/* VARIABLES */

let editAllButton = document.querySelectorAll(".fa-pencil");

let containerForm = document.querySelector(".container-principal");

let containerGastos = document.querySelector(".container-secundario");

let buttonAdd = document.getElementById("button");

let arrows = document.querySelectorAll(".arrow");

let gastos = [];

let wd = window.innerWidth;

alert(wd)

function showEditButtons (deleteButton, secondEditButton) {
    if (deleteButton.style.top === "-43px") {
        deleteButton.style.top = "-10px";
        secondEditButton.style = "top: -10px; right: -10px;";

    }
    else {

        deleteButton.style.top = "-43px";
        secondEditButton.style = "top: -43px; right: 24px;";
    
    }

}

function width (){
    console.log("Ancho actual de la página: " + wd + "px");
    
    if (wd >= 1301) {
        return "60%";

    }

    if (wd <= 868) {
        return "97%";

    }

    if (wd <= 550) {
        return "100%";

    }

    else {
        return "50%";
    }    
}

function changeContainer(arrow){

    if (arrow.id === "arrowRight" || arrow.id === "arrowUp" ) {
        containerGastos.style.width = width();
        containerGastos.style.left = "0";

        if (wd <= 900) {
            containerGastos.style.width = width();
            containerGastos.style.bottom = "0";
        }

        console.log(arrow.id)

    }
    else {
        if (wd <= 900) {
            containerGastos.style.width = "0px";
            containerGastos.style.bottom = "-500px";
        }
        containerGastos.style.width = "0px";
        containerGastos.style.left = "-500px";

        console.log(arrow.id)
    }
}

arrows[0].addEventListener("click",()=>{
    changeContainer(arrows[0]);
})

arrows[1].addEventListener("click",()=>{
    changeContainer(arrows[1]);
})


arrows[2].addEventListener("click",()=>{
    changeContainer(arrows[2]);
})

arrows[3].addEventListener("click",()=>{
    changeContainer(arrows[3]);
})


editAllButton.forEach(editButton => {
    let deleteButton = editButton.parentElement.querySelector(".fa-xmark");
    let secondEditButton = editButton.parentElement.querySelector(".second-pencil");

    editButton.addEventListener("click", ()=>{
        showEditButtons(deleteButton,secondEditButton);
    })

    deleteButton.addEventListener("click", ()=>{
        deleteButton.style.top = "-10px";
        secondEditButton.style = "top: -10px; right: -10px;";    
    })
})

buttonAdd.addEventListener("click",(e)=>{
    e.preventDefault(); 
    let nameGasto =  buttonAdd.parentElement.querySelector("#nombre").value;
    let valorGasto =  buttonAdd.parentElement.querySelector("#valor").value;
    let categoriaGasto =  buttonAdd.parentElement.querySelector("#categoria").value;
    let descripcionGasto = buttonAdd.parentElement.querySelector("#descripcion").value;
    let fechaGasto = buttonAdd.parentElement.querySelector("#fecha").value;

    /* Ahora procedemos a mostrar en consola los elementos obtenidos del DOM*/

    console.log(nameGasto);

    console.log(valorGasto);
    console.log(categoriaGasto);
    console.log(descripcionGasto);
    console.log(fechaGasto);

    let nuevoGasto = {
        "nombre" : nombreGasto,
        "valor" : valorGasto,
        "categoria" : categoriaGasto,
        "descripcion" : descripcionGasto,
        "fecha" : fechaGasto
    }

    gastos.push(nuevoGasto);

    gastos.forEach(gasto => {
        let gastoHtml = `
                <div class="gasto">
                    <h3 class="gasto-nombre">${gasto.nombre}</h3>
                    <h3 class="gasto-precio"><i class="fas fa-dollar-sign"></i><span> ${gasto.valor}</span></h3>
                    <h3 class="gasto-categoria">${gasto.categoria}</h3>
                    <h3 class="gasto-descripcion">${gasto.descripcion}</h3>

                    <div class="gasto-botones">
                        <i class="fa-solid fa-xmark"></i>
                        <i class="fa-solid fa-pencil"></i>
                    
                        <i class="fa-solid fa-pencil second-pencil"></i>
                    </div>         
                </div>
                `
    })

})