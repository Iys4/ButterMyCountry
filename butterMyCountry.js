    
    let area = 0;
    let densidad = 0.911;
    let covertura = 0.1;
    let pais = "Afganistan";
    let paisComparado = "India"

    let gramosPorMetroDeSuelo = densidad * 1000;
    let gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
    let produccionDeManteca = 200000;
    let kilogramosPorArea = (gramosPorKilometro/1000) * area;
    let toneladasTotales = kilogramosPorArea / 1000;
    let porcentajeDeProduccion = parseInt(toneladasTotales/produccionDeManteca);

    
    const inputDensidad = document.querySelector("#inputDensidad");
    const razonamiento = document.querySelector("#razonamiento");
    const visualizador = document.querySelector("#visualizador");
    const imagenPais = document.querySelector("#imagenPais");
    

    //////////////////////FUNCIONES//////////////////////

        const BASE_URL = "https://restcountries.com/v3.1/all?fields=";


    //CARGAR DATA

        function cargarData(){
        gramosPorMetroDeSuelo = densidad * 1000;
        gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
        kilogramosPorArea = (gramosPorKilometro/1000) * area;
        toneladasTotales = kilogramosPorArea / 1000;
        porcentajeDeProduccion = parseFloat(toneladasTotales/produccionDeManteca);
        inputDensidad.innerHTML = `${densidad} cm cubicos de densidad`
        razonamiento.innerHTML = `<p>La manteca requiere ${gramosPorMetroDeSuelo} gramos por metro cuadrado de suelo. </p> 
        <p>Esto significa que precisamos ${gramosPorKilometro} gramos de manteca por kilometro cuadrado. </p> 
        <p>Como nuestra area es ${area} km2 tendriamos que usar ${kilogramosPorArea} kilogramos de manteca para embadurnar el area.  </p> 
        <p>Esto en toneladas serian ${toneladasTotales} Toneladas de manteca. </p> 
        <p>Esto significa que se requiere ${porcentajeDeProduccion} veces la produccion de manteca del ${paisComparado} para llenar a ${pais} de manteca </p>`
        visualizador.innerHTML = "";
        for (let i = 0; i < porcentajeDeProduccion; i++) {
            visualizador.innerHTML += `O`
        }
        }
        const paisSelect = document.querySelector("#paisSelect");


    //OBTENER BANDERAS

        obtenerBanderas();

        async function obtenerBanderas(){

        try {
        let response = await fetch(`${BASE_URL}name,flags`);
        let data = await response.json();
    
            data.forEach(pais => {
            console.log(pais.name.common, pais.flags.png);
            });
        } catch (error) {
            console.log("Error: No hemos podido acceder a las banderas." + error);
        }
    }


    //OBTENER PAISES
    
    obtenerPaises();
    async function obtenerPaises(){

        try {
        const response = await fetch(`${BASE_URL}name,area,flag`)
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
                pais = element.name.common
            }
        });
        cargarData();
    }
    const selectComparador = document.querySelector("#comparador");
    selectComparador.addEventListener("change", cambiarComparacion)
    cargarComparador();
    
    
    //CARGAR COMPARADOR
    
    function cargarComparador (){
        produccionDeMantecaPorPais.forEach(element => {
            selectComparador.innerHTML += `<option>${element.nombre}</option>`
            console.log(element)
        });
    }


    //CAMBIAR COMPARACION

    function cambiarComparacion(){
    let paisUsado = selectComparador.value;
    produccionDeMantecaPorPais.forEach(element => {
        if (element.nombre === paisUsado){
                paisComparado = element.nombre;
                produccionDeManteca = element.manteca;
                console.log(element.manteca);
                cargarData();
        }
    });

    }
