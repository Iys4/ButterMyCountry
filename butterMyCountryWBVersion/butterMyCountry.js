    
    //////////////////////VARIABLES//////////////////////
let area = 0;
let densidad = 0.911;
let covertura = 0.1;
let pais = "";
let paisComparado = "";
let gramosPorMetroDeSuelo = densidad * 1000;
let gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
let kilogramosPorArea = (gramosPorKilometro / 1000) * area;
let toneladasTotales = kilogramosPorArea / 1000;


    //Selects
    const selectPaisJ1 = document.querySelector("#selectPaisJ1");
    const selectPaisJ2 = document.querySelector("#selectPaisJ2");
    const selectPaisJ2_2 = document.querySelector("#selectPaisJ2_2");
    const selectPaisJ3 = document.querySelector("#selectPaisJ3");
    const selectPaisJ4 = document.querySelector("#selectPaisJ4");
    const selectPaisJ4_2 = document.querySelector("#selectPaisJ4_2");
    const selectPaisJ5 = document.querySelector("#selectPaisJ5");
    const selectPaisJ5_2 = document.querySelector("#selectPaisJ5_2");
    
        //BOTONES
    const botonJ1 = document.querySelector("#J1");
    const botonJ2 = document.querySelector("#J2");
    const botonJ3 = document.querySelector("#J3");
    const botonJ4 = document.querySelector("#J4");
    const botonJ5 = document.querySelector("#J5");
    const articleJ1 = document.querySelector("#articleJ1");
    const articleJ2 = document.querySelector("#articleJ2");
    const articleJ3 = document.querySelector("#articleJ3");
    const articleJ4 = document.querySelector("#articleJ4");
    const articleJ5 = document.querySelector("#articleJ5");
    botonJ1.addEventListener("click", cargarJ1);
    botonJ2.addEventListener("click", cargarJ2);
    botonJ3.addEventListener("click", cargarJ3);
    botonJ4.addEventListener("click", cargarJ4);
    botonJ5.addEventListener("click", cargarJ5);

    //FUNCIONES BOTONES
    function cargarJ2(){
        esconderArticulos();
        cargarPaisesEnSelect(selectPaisJ2);
        cargarPaisesEnSelect(selectPaisJ2_2);
        articleJ2.style = "display: block";
    }
    function cargarJ1(){
        esconderArticulos();
        cargarPaisesEnSelect(selectPaisJ1);
        articleJ1.style = "display: block";
    }
    function cargarJ3(){
        esconderArticulos();
        cargarPaisesEnSelect(selectPaisJ3);
        articleJ3.style = "display: block";
    }
    function cargarJ4(){
        esconderArticulos();
        cargarPaisesEnSelect(selectPaisJ4);
        cargarPaisesEnSelect(selectPaisJ4_2);
        articleJ4.style = "display: block";
    }
    function cargarJ5(){
        esconderArticulos();
        cargarPaisesEnSelect(selectPaisJ5);
        cargarPaisesEnSelect(selectPaisJ5_2);
        articleJ5.style = "display: block";
    }
    function esconderArticulos(){
        articleJ1.style = "display: none";
        articleJ2.style = "display: none";
        articleJ3.style = "display: none";
        articleJ4.style = "display: none";
        articleJ5.style = "display: none";
    }
    const infoContenidoJ1 = document.querySelector("#infoContenidoJ1");
    const infoContenidoJ2 = document.querySelector("#infoContenidoJ2");
    const infoContenidoJ3 = document.querySelector("#infoContenidoJ3");
    const infoContenidoJ4 = document.querySelector("#infoContenidoJ4");
    const infoContenidoJ5 = document.querySelector("#infoContenidoJ5");

    esconderArticulos();


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
            return {pais: nombrePais, indicador: nombreIndicador, valor: info};
    } catch (error) {
        return { error: `Error obteniendo el indicador: ${error}` };
    }
}

    // Función para cargar los países en el select al iniciar el código

    async function cargarPaisesEnSelect(select) {
        const listaPaises = await obtenerListaPaisesWorldBank();
        listaPaises.sort();
        listaPaises.forEach(element => {
            select.innerHTML += `<option id="${element.id}">${element.name}</option>`;
        });
    }
    const resultadoGrandeJ1 = document.querySelector("#resultadoGrandeJ1");

    //FUNCIONES NO GENERALES/////////////////////////////////////////////////////////////////////
    //CARGAR DATA

        function cargarDataButterMyCountryBase(){
        gramosPorMetroDeSuelo = densidad * 1000;
        gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
        kilogramosPorArea = (gramosPorKilometro/1000) * area;
        toneladasTotales = kilogramosPorArea / 1000;
        infoContenidoJ1.innerHTML = `<p>La manteca requiere ${gramosPorMetroDeSuelo} gramos por metro cuadrado de suelo. </p> 
        <p>Esto significa que precisamos ${gramosPorKilometro} gramos de manteca por kilometro cuadrado. </p> 
        <p>Como nuestra area es ${area} km2 tendriamos que usar ${kilogramosPorArea} kilogramos de manteca para embadurnar el area.  </p> 
        `
        resultadoGrandeJ1.innerHTML = `<h3>Esto en toneladas serian ${toneladasTotales} Toneladas de manteca. </h3>`
        }



    //OBTENER PAISES
     selectPaisJ1.addEventListener("change", cambiarArea);
    //CAMBIAR AREA

  async function conseguirId(select){
    let contenido = select.options[select.selectedIndex].getAttribute("id");
    return contenido;
  }
    async function cambiarArea(){
        let contenido = await conseguirId(selectPaisJ1);
        let pais = await recibirDatoDePais("AG.LND.TOTL.K2", contenido)
        area = pais.valor;
        pais = pais.pais;
        cargarDataButterMyCountryBase();
    }

    //COMPARADOR
    /* const selectComparador = document.querySelector("#comparador");
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
                cargarDataButterMyCountryBase();
        }
    });

    } */
