//https://github.com/AstaHatake/RouteGo.git/* VARIABLES */


let containerForm = document.querySelector(".container-principal");

let containerGastos = document.querySelector(".container-secundario");

let buttonAdd = document.getElementById("button");

let arrows = document.querySelectorAll(".arrow");

let totalHTML = document.getElementById("total")

let editAllButton;

let total = 0;

let gastos = [];

let wd = window.innerWidth;

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
        return "40%";

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

        console.log(arrow.id)

    }
    else {
        containerGastos.style.width = "0px";
        containerGastos.style.left = "-700px";

        console.log(arrow.id)
    }
}

function loadGastos(){
    document.querySelector(".container-gastos").innerHTML = " ";
    totalHTML.innerHTML = " ";
    total = 0;  
    gastos.forEach(gasto => {
        let gastoHtml = `
            <div class="gasto">
                <h3 class="gasto-name">${gasto.name}</h3>
                <h3 class="gasto-precio"><i class="fas fa-dollar-sign"></i><span id="gasto-price-span"> ${gasto.price}</span></h3>
                <h3 class="gasto-category">${gasto.category}</h3>
                <h3 class="gasto-description">${gasto.description}</h3>
                <h3 class="gasto-date">${gasto.date}</h3>
                <div class="gasto-botones">
                    <i class="fa-solid fa-xmark"></i>
                    <i class="fa-solid fa-pencil"></i>
                
                    <i class="fa-solid fa-pencil second-pencil"></i>
                </div>         
            </div>
            `
        document.querySelector(".container-gastos").innerHTML += gastoHtml;
        
        total = total + parseInt(gasto.price);

        editAllButton = document.querySelectorAll(".fa-pencil");
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
            deleteGasto(deleteButton.parentElement.parentElement);
        })
    })

    totalHTML.innerHTML = `Total: <i class="fas fa-dollar-sign"></i><b>${total}</b>`

}

function deleteGasto(parent){
    let name = parent.querySelector(".gasto-name").textContent;
    let price = parent.querySelector("#gasto-price-span").textContent;
    gastos = gastos.filter(gastoItem => gastoItem.name !== name);
    loadGastos();
}

function createGasto(newGasto){
    gastos.push(newGasto);
    loadGastos();   
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


buttonAdd.addEventListener("click",(e)=>{
    e.preventDefault(); 
    let nameGasto =  buttonAdd.parentElement.querySelector("#name").value;
    let priceGasto =  buttonAdd.parentElement.querySelector("#price").value;
    let categoryGasto =  buttonAdd.parentElement.querySelector("#category").value;
    let descriptionGasto = buttonAdd.parentElement.querySelector("#description").value;
    let dateGasto = buttonAdd.parentElement.querySelector("#date").value;

    /* Ahora procedemos a mostrar en consola los elementos obtenidos del DOM*/
    let newGasto = {
        "name" : nameGasto,
        "price" : priceGasto,
        "category" : categoryGasto,
        "description" : descriptionGasto,
        "date" : dateGasto
    }

    let existeGastos = gastos.some(gastoItem => gastoItem.name == nameGasto);

    if (existeGastos) {
        alert("El gasto ya existe");

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

    } 

    else{
        createGasto(newGasto)
    }
    containerGastos.style.width = width();
    containerGastos.style.left = "0";
})