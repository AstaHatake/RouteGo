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

function showEditButtons (deleteButton) {
    if (deleteButton.style.top === "-43px") {
        deleteButton.style.top = "-10px";

    }
    else {

        deleteButton.style.top = "-43px";
    
    }

}

function width (){
    console.log("Ancho actual de la página: " + wd + "px");
    
    if (wd >= 1301) {
        return "50%";

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

function verifyInputs(name, price, category, description, date) {
    // Validar nombre del gasto
    if (!name || name.trim() === '') {
        return { isValid: false, message: 'El nombre del gasto es requerido' };
    }

    // Validar precio del gasto
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
        return { isValid: false, message: 'El precio del gasto debe ser un número mayor que cero' };
    }

    // Validar categoría del gasto
    if (!category || category.trim() === '') {
        return { isValid: false, message: 'La categoría del gasto es requerida' };
    }

    // Validar descripción del gasto
    if (!description || description.trim() === '') {
        return { isValid: false, message: 'La descripción del gasto es requerida' };
    } 
    
    // Validar fecha del gasto
    if (!date || !isValidDate(date)) {
        return { isValid: false, message: 'La fecha del gasto es requerida y debe ser válida' };
    }

    return { isValid: true, message: '' };
}

  // Función auxiliar para validar fechas
function isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date.getTime());
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
                </div>         
            </div>
            `
        document.querySelector(".container-gastos").innerHTML += gastoHtml;
        
        total = total + parseInt(gasto.price);


    })

    editAllButton = document.querySelectorAll(".fa-pencil");

    editAllButton.forEach(editButton => {
        let deleteButton = editButton.parentElement.querySelector(".fa-xmark"); 

        editButton.addEventListener("click", ()=>{
            showEditButtons(deleteButton);

        })
    
        deleteButton.addEventListener("click", ()=>{
            console.log(deleteButton);
            deleteButton.style.top = "-10px";
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

    let existeGastos = gastos.some(gastoItem => gastoItem.name == nameGasto);

    if (existeGastos) {
        alert("El gasto ya existe");
    } 

    else{
        if (verifyInputs(nameGasto, priceGasto, categoryGasto, descriptionGasto, dateGasto).isValid){
            let newGasto = {
                "name" : nameGasto,
                "price" : priceGasto,
                "category" : categoryGasto,
                "description" : descriptionGasto,
                "date" : dateGasto
            }
            createGasto(newGasto);
            containerGastos.style.width = width();
            containerGastos.style.left = "0";
        } else {
            alert(verifyInputs(nameGasto, priceGasto, categoryGasto, descriptionGasto, dateGasto).message)
        }


    }

})
