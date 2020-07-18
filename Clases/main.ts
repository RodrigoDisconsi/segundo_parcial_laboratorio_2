namespace segundoParcial{

    var listaVehiculos:Array<Vehiculo> = new Array<Vehiculo>();

    window.addEventListener("load", function(){
        document.getElementById("btnAlta").addEventListener("click", alta);
        document.getElementById("btnCerrar").addEventListener("click", cerrar);
        document.getElementById("idCheck").addEventListener("change", camposMostrados);
        document.getElementById("modeloCheck").addEventListener("change", camposMostrados);
        document.getElementById("marcaCheck").addEventListener("change", camposMostrados);
        document.getElementById("precioCheck").addEventListener("change", camposMostrados);
        document.getElementById("btnAgregar").addEventListener("click", agregar);
        document.getElementById("tipo").addEventListener("change", tipoVehiculo);
        document.getElementById("filter").addEventListener('keyup', filtrar);
        document.getElementById("btnPromedio").addEventListener('click', promedio);
    });

    export function alta(){
        document.getElementById("contenedorAlta").hidden = false;
    }

    export function cerrar(){
        document.getElementById("contenedorAlta").hidden = true;
    }

    export function camposMostrados(){
        var id = <HTMLInputElement>document.getElementById("idCheck");
        var modelo = <HTMLInputElement>document.getElementById("modeloCheck");
        var marca = <HTMLInputElement>document.getElementById("marcaCheck");
        var precio = <HTMLInputElement>document.getElementById("precioCheck");

        if(id.checked){
            var tablasids = document.getElementsByName("idTabla");
            tablasids.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaIds = document.getElementsByName("idTabla");
            tablaIds.forEach(x=> {
                x.hidden = true;
            });
        }
        if(marca.checked){
            var tablaMarca = document.getElementsByName("marcaTabla");
            tablaMarca.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaMarca = document.getElementsByName("marcaTabla");
            tablaMarca.forEach(x=> {
                x.hidden = true;
            });
        }
        if(precio.checked){
            var tablaPrecio = document.getElementsByName("precioTabla");
            tablaPrecio.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaPrecio = document.getElementsByName("precioTabla");
            tablaPrecio.forEach(x=> {
                x.hidden = true;
            });
        }
        if(modelo.checked){
            var tablaModelo = document.getElementsByName("modeloTabla");
            tablaModelo.forEach(x=> {
                x.hidden = false;
            });
        }
        else{
            var tablaModelo = document.getElementsByName("modeloTabla");
            tablaModelo.forEach(x=> {
                x.hidden = true;
            });
        }
    }

    export function promedio(){
        var listaPrecios:Array<number> = listaVehiculos.map(x => x.precio);
        // console.log("------------------------");
        var promedio = listaPrecios.reduce(function(total, num){
            total += num;
            return total / (listaPrecios.length);
        });
        alert(promedio);
    }

    export function tipoVehiculo(){
        var tipo = <HTMLInputElement>document.getElementById("tipo");
        if(tipo.value == "Auto"){
            document.getElementById("auto").hidden = false;
            document.getElementById("camioneta").hidden = true;
        }
        else{
            document.getElementById("auto").hidden = true;
            document.getElementById("camioneta").hidden = false;
        }
    }

    export function filtrar(){
        var searchInput = <HTMLInputElement>document.getElementById("filter");
        var filtro:string = searchInput.value;
        var filterVehiculo:Array<Vehiculo> = listaVehiculos.filter(x => x.modelo.toLowerCase().indexOf(filtro) > -1);
        console.log(filterVehiculo);
        borrarTabla();
        rearmarTabla(filterVehiculo);
    }  



    function rearmarTabla(filterVehiculo:Array<Vehiculo>){
        filterVehiculo.forEach(x => {
            agregarItemTabla(x.id.toString(), x.marca, x.modelo, x.precio.toString());
        });
    }

    function borrarTabla(){
        let tCuerpo = document.getElementById("tCuerpo");
        tCuerpo.innerHTML = "";
    }

    export function agregar(){
        if(checkInputs()){
            var vehiculo:Vehiculo;
            var tipo = <HTMLInputElement>document.getElementById("tipo");
            var marca = <HTMLInputElement>document.getElementById("marca");
            var modelo = <HTMLInputElement>document.getElementById("modelo");
            var precio = <HTMLInputElement>document.getElementById("precio");
            var listIds:Array<number> = listaVehiculos.map(x => x.id);
            // No entiendo porque en el ternario de abajo aunque listids tenga un lenght de 1 no entra.
            console.log(listIds.length); //Acá se lo dejo para que lo vea.
            var id:number = listIds.length > 0 ? listIds.reduce(function(previous, current){
                return current + 1;
            }) : 1;
            // var id:number = listIds.length === 0 ? 1 : listIds.reduce(function(previous, current){
            //     return current + 1;
            // }) ;
            if(tipo.value === "Auto"){
                var catntidadPuertas = <HTMLInputElement>document.getElementById("cantidadPuertas");
                var auto:Auto = new Auto(id, marca.value, modelo.value, +precio.value, +catntidadPuertas.value);
                listaVehiculos.push(auto);
                vehiculo = auto;
            }
            else{
                var cuatroXcuatro = <HTMLInputElement>document.getElementById("cuatroXcuatro");
                var camioneta:Camioneta = new Camioneta(id, marca.value, modelo.value, +precio.value, cuatroXcuatro.checked);
                listaVehiculos.push(auto);
                vehiculo = camioneta;
            }
            agregarItemTabla(vehiculo.id.toString(), vehiculo.marca, vehiculo.modelo, vehiculo.precio.toString());

        }
    }

    function agregarItemTabla(id:string, marca:string, modelo:string, precio:string){
        var tCuerpo = document.getElementById("tCuerpo");

        var tr = document.createElement("tr");

        
        var td1 = document.createElement("td");
        td1.setAttribute("name", "idTabla");
        var tdText1 = document.createTextNode(id);
        td1.appendChild(tdText1);
        tr.appendChild(td1);


        var td2 = document.createElement("td");
        td2.setAttribute("name", "marcaTabla");
        var tdText2 = document.createTextNode(marca);
        td2.appendChild(tdText2);
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.setAttribute("name", "modeloTabla");
        var tdText3 = document.createTextNode(modelo);
        td3.appendChild(tdText3);
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.setAttribute("name", "precioTabla");
        var tdText4 = document.createTextNode(precio);
        td4.appendChild(tdText4);
        tr.appendChild(td4);

        var td5 = document.createElement("td");
        var button = document.createElement("button");
        button.addEventListener("click", borrar);
        button.className = "cerrar"
        // button.title = "Borrar";
        button.textContent = "Borrar";
        var tdText5 = button;
        td5.appendChild(tdText5);
        tr.appendChild(td5);

        tCuerpo.appendChild(tr);
    }

    function borrar(e){
        var tr = e.target.parentNode.parentNode;
        console.log(listaVehiculos);
        var item = listaVehiculos.find(x => x.id == +tr.childNodes[0].textContent);
        var indice = listaVehiculos.indexOf(item);
        listaVehiculos.splice(indice, 1);
        console.log(listaVehiculos);
        tr.remove();
    }   

    function checkInputs() {
        var retorno = true;
        var marca = <HTMLInputElement>document.getElementById("marca");
        var modelo = <HTMLInputElement>document.getElementById("modelo");
        var precio = <HTMLInputElement>document.getElementById("precio");
    
        if (marca.value == "") {
            marca.className = "error";
            retorno = false;
        }
        else{
            marca.className = "sinError";
        }
        if (modelo.value == "" ) {
            modelo.className = "error";
            retorno = false;
        }
        else{
            modelo.className = "sinError";
        }
        if (precio.value === "" ) {
            precio.className = "error";
            retorno = false;
        }
        else{
            precio.className = "sinError";
        }
    
        return retorno;
    }
    
}