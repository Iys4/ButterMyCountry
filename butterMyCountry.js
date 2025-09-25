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
    razonamiento.innerHTML = `La manteca
    requiere ${gramosPorMetroDeSuelo} gramos por metro cuadrado de suelo. <br>
    esto significa que precisamos ${gramosPorKilometro} gramos de manteca por kilometro cuadrado <br>
    Como nuestra area es ${area} km2 tendriamos que usar <br>
    ${kilogramosPorArea} kilogramos de manteca para embadurnar el area <br>
    esto en toneladas serian <br> ${toneladasTotales} Toneladas de manteca  <br> <br>
    Esto significa que se requiere ${porcentajeDeProduccion} veces la produccion de manteca del Reino Unido para llenar a ${pais} de manteca`
    }
    const paisSelect = document.querySelector("#paisSelect");
    obtenerPaises();
    async function obtenerPaises(){
        const response = await fetch("https://restcountries.com/v3.1/all?fields=name,area,flag")
        const data = await response.json();
        listaPaises = data;
        let nombrePaises = data.map(element => (element.name.common))
        nombrePaises.sort();
        nombrePaises.forEach(element => {
            paisSelect.innerHTML += `<option nombre="${element}">${element}</option>`
        });
    }

        let listaPaises = [];

    paisSelect.addEventListener("change", cambiarArea);
    console.log(listaPaises);
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





    //async function obtenerPokemon(){
    //    const respuesta = await fetch("https://pokeapi.co/api/v2/type/3")
    //    console.log(respuesta);
    //    const data = await respuesta.json()
    //    console.log(data);
//
    //    data.pokemon.forEach(pokemon => {
    //        console.log(pokemon.pokemon.name)
    //    })
    //}

    //obtenerPokemon();

    const contenedorDetalle = document.querySelector("#contenedorDetalle");
    const contenedorPokemon = document.querySelector("#contenedorPokemon");

    iniciarPokemon();
    async function iniciarPokemon(){
        const pokemons = await obtenerPokemones(nombre);
        pokemons.forEach((pokemon) =>{
            const btn = document.createElement("button")
            btn.textContent = `nombre: ${pokemon.name}`
            btn.addEventListener("click", async () => {
                const miPokemon = await obtenerPokemon(pokemon.name)
                contenedorDetalle.innerHTML = `<img src="${miPokemon.img}"> <h1>${miPokemon.nombre}</h1>`
            })
            contenedorPokemon.appendChild(btn);
        })
    }

    async function obtenerPokemones(nombre){
        const respuesta = await fetch(`https://pokeapi.co/api/v2/${nombre}`)
        const data = await respuesta.json();
        const nuestroPokemon = {
            nombre: data.name,
            id: data.id,
            img: data.sprites.front_default
        }
        return nuestroPokemon
    }