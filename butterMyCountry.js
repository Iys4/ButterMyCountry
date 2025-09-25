    let area = 17125200;
    let densidad = 0.911;
    let covertura = 0.1;
    let pais = "russia";

    let gramosPorMetroDeSuelo = densidad * 1000;
    let gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
    let produccionDeManteca = 200000;

    let kilogramosPorArea = (gramosPorKilometro/1000) * area;
    let toneladasTotales = kilogramosPorArea / 1000;
    let porcentajeDeProduccion = parseInt(toneladasTotales/produccionDeManteca);

    const inputArea = document.querySelector("#inputArea");
    const inputDensidad = document.querySelector("#inputDensidad");
    const razonamiento = document.querySelector("#razonamiento");
    

    //////////////////////FUNCIONES//////////////////////


    //CARGAR DATA

    cargarData();

    function cargarData(){
    gramosPorMetroDeSuelo = densidad * 1000;
    gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
    produccionDeManteca = 200000;
    kilogramosPorArea = (gramosPorKilometro/1000) * area;
    toneladasTotales = kilogramosPorArea / 1000;
    porcentajeDeProduccion = parseFloat(toneladasTotales/produccionDeManteca);
    inputArea.innerHTML = `${area} km cuadrados`
    inputDensidad.innerHTML = `${densidad} cm cubicos de densidad`
    razonamiento.innerHTML = `La manteca requiere ${gramosPorMetroDeSuelo} gramos por metro cuadrado de suelo. Esto significa que precisamos ${gramosPorKilometro} gramos de manteca por kilometro cuadrado. Como nuestra area es ${area} km2 tendriamos que usar ${kilogramosPorArea} kilogramos de manteca para embadurnar el area. Esto en toneladas serian ${toneladasTotales} Toneladas de manteca. Esto significa que se requiere ${porcentajeDeProduccion} veces la produccion de manteca del Reino Unido para llenar a ${pais} de manteca`
    }
    const paisSelect = document.querySelector("#paisSelect");
   
    
    //OBTENER PAISES
    
    obtenerPaises();
   
    async function obtenerPaises(){

        try {
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,area,flag")
        const data = await response.json();
        listaPaises = data;
        let nombrePaises = data.map(element => (element.name.common))
        nombrePaises.sort();
        nombrePaises.forEach(element => {
            paisSelect.innerHTML += `<option nombre="${element}">${element}</option>`
        });
        } catch (error) {
            console.log("Error: No hemos podido acceder a los países." + error);
        }
    }

        let listaPaises = [];

    paisSelect.addEventListener("change", cambiarArea);
    console.log(listaPaises);


    //CAMBIAR AREA
  
    function cambiarArea(){
        let contenido = paisSelect.value;
        listaPaises.forEach(element => {
            if(element.name.common === contenido){
                area = element.area;
            }
        });

        inputArea.innerHTML = area;
        cargarData();
    }