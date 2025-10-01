    
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

    BASE_URL0 = 'https://api.worldbank.org/v2/';
    const BASE_URL_PAISES = `${BASE_URL0}country?format=json&per_page=300`;
    // Función general para obtener la lista de países desde World Bank API
    async function obtenerListaPaisesWorldBank() {
        try {
            let response = await fetch(BASE_URL_PAISES);
            let data = await response.json();
            let listaPaises = [];
            let countries = data[1];
            // Filtrar regiones que no son países
            countries.filter(country => country.region.id !== 'NA').forEach(country => {
                listaPaises.push(country); // Usar el nombre del país
            });
            return listaPaises;
        } catch (error) {
            console.log("Error: No hemos podido acceder a los países. " + error);
            return [];
        }
    }

    async function recibirDatoDePais(indicador, pais) {
    const url = `${BASE_URL0}country/${pais}/indicator/${indicador}?format=json&date=2022`;
    try {
        let response = await fetch(url);
        let data = await response.json();
            let nombrePais = data[1][0].country.value;
            let info = data[1][0].value;
            let nombreIndicador = data[1][0].indicator.value;
            return { pais: nombrePais, indicador: nombreIndicador, valor: info };
    } catch (error) {
        return { error: `Error obteniendo el indicador: ${error}` };
    }
}

    // Función para cargar los países en el select al iniciar el código
    cargarPaisesEnSelect();
    async function cargarPaisesEnSelect() {
        const listaPaises = await obtenerListaPaisesWorldBank();
        listaPaises.sort();
        listaPaises.forEach(element => {
            paisSelect.innerHTML += `<option nombre="${element.id}">${element.name}</option>`;
        });
    }

    //CARGAR DATA

        function cargarData(){
        imagenPais.innerHTML = 
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

    imagenPais.innerHTML = `<img src="" alt="">`

    //OBTENER PAISES
     paisSelect.addEventListener("change", cambiarArea);


    //CAMBIAR AREA
  
    async function cambiarArea(){
        let contenido = paisSelect.options[paisSelect.selectedIndex].getAttribute("nombre");
        console.log(contenido);
        let pais = await recibirDatoDePais("AG.LND.TOTL.K2", contenido)
        area = pais.valor;
        pais = pais.pais;
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
