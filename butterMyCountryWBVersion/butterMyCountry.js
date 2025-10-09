    
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



let Usuario = "";

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

    const imagenModuloPaisJ1 = document.querySelector("#imagenModuloPaisJ1");
    const imagenModuloPaisJ2 = document.querySelector("#imagenModuloPaisJ2");
    const imagenModuloPaisJ2_2 = document.querySelector("#imagenModuloPaisJ2_2");
    const imagenModuloPaisJ3 = document.querySelector("#imagenModuloPaisJ3");
    const imagenModuloPaisJ4 = document.querySelector("#imagenModuloPaisJ4");
    const imagenModuloPaisJ4_2 = document.querySelector("#imagenModuloPaisJ4_2");
    const imagenModuloPaisJ5 = document.querySelector("#imagenModuloPaisJ5");
    const imagenModuloPaisJ5_2 = document.querySelector("#imagenModuloPaisJ5_2");
    const juegosContainer = document.querySelectorAll(".container");
    const popUpUsuario = document.querySelector("#popUpUsuario");
    const iniciarSesion = document.querySelector("#iniciarSesion");

    const modoCompetitivoButton = document.querySelector("#modoCompetitivoButton");
    modoCompetitivoButton.addEventListener("click", cargarModoCompetitivo);
    const modoCompetitivo = document.querySelector("#modoCompetitivo");

    async function cargarModoCompetitivo(){
        esconderArticulos();
        if (Usuario === ""){ 
        await popUpConfirm();
        iniciarButterRoyale.style = "display: block";
        butterRoyaleJuego.style = "display: none";
        popUpUsuario.style = "display: block";
        } else {
        modoCompetitivo.style = "display: block";
        }
    }

    //FUNCIONES BOTONES
    function cargarJ2(){
        esconderArticulos();
        articleJ2.style = "display: block";
    }
    function cargarJ1(){
        esconderArticulos();
        articleJ1.style = "display: block";
    }
    function cargarJ3(){
        esconderArticulos();
        articleJ3.style = "display: block";
    }
    function cargarJ4(){
        esconderArticulos();
        articleJ4.style = "display: block";
    }
    function cargarJ5(){
        esconderArticulos();
        articleJ5.style = "display: block";
    }


    function esconderArticulos(){
        articleJ1.style = "display: none";
        articleJ2.style = "display: none";
        articleJ3.style = "display: none";
        articleJ4.style = "display: none";
        articleJ5.style = "display: none";
        modoCompetitivo.style = "display: none";
        popUpUsuario.style = "display: none";
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

    async function recibirBanderaDePais(pais) {
        let response = await fetch(`https://restcountries.com/v3.1/alpha/${pais}`);
        let data = await response.json();
        console.log(data[0].flags.png);
        return data[0].flags.png;
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
    const resultadoGrandeJ2 = document.querySelector("#resultadoGrandeJ2");
    const resultadoGrandeJ3 = document.querySelector("#resultadoGrandeJ3");
    const resultadoGrandeJ4 = document.querySelector("#resultadoGrandeJ4");

    //FUNCIONES NO GENERALES/////////////////////////////////////////////////////////////////////
    //CARGAR DATA

        function cargarDataButterMyCountryBase(areaData, paisData){
        gramosPorMetroDeSuelo = densidad * 1000;
        gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
        kilogramosPorArea = (gramosPorKilometro/1000) * areaData;
        toneladasTotales = kilogramosPorArea / 1000;
        infoContenidoJ1.innerHTML = `<p>La manteca requiere <span>${gramosPorMetroDeSuelo} gramos por metro cuadrado</span> de suelo. </p> 
        <p>Esto significa que precisamos <span>${gramosPorKilometro} gramos de manteca</span> por kilometro cuadrado. </p> 
        <p>Como el area de ${paisData} es <span>${areaData} km2</span> tendriamos que usar <span>${kilogramosPorArea} kilogramos de manteca</span> para embadurnar el area.  </p> 
        `
        resultadoGrandeJ1.innerHTML = `<h3>Esto en toneladas serian ${toneladasTotales} Toneladas de manteca para enmantecar todo ${paisData}</h3>`

        return toneladasTotales;
        }


    ///////////////////PAY FOR MY BUTTER///////////////////////////////////////////////////////////////


    function toneladasTotalesCalc(area){
        gramosPorMetroDeSuelo = densidad * 1000;
        gramosPorKilometro = gramosPorMetroDeSuelo * 1000;
        kilogramosPorArea = (gramosPorKilometro/1000) * area;
        toneladasTotales = kilogramosPorArea / 1000;
        return toneladasTotales;
    }




    






    //OBTENER PAISES
    selectPaisJ1.addEventListener("change", async () => {
        let {areaData, paisData} = await cambiarArea(selectPaisJ1);
        conseguirBandera(selectPaisJ1, imagenModuloPaisJ1);
        cargarDataButterMyCountryBase(areaData, paisData);
    });

    selectPaisJ2.addEventListener("change", async() => {
        conseguirBandera(selectPaisJ2, imagenModuloPaisJ2);
        cargarInfoProcudeMyButter();
    });
    selectPaisJ2_2.addEventListener("change", async () => {
        conseguirBandera(selectPaisJ2_2, imagenModuloPaisJ2_2);
        console.log("cambio");
        cargarInfoProcudeMyButter();
    });

    async function cargarInfoProcudeMyButter () {
        let {areaData, paisData} = await cambiarArea(selectPaisJ2);
        let objetoManteca = await cambiarProduccion(selectPaisJ2_2);
        let cantidadManteca2 = objetoManteca.cantidadManteca;
        let pais2 = objetoManteca.pais;
        console.log(cantidadManteca2, pais2);
        cargarDataProduceMyButter(areaData, paisData, cantidadManteca2, pais2);
    }

    function cargarDataProduceMyButter(areaData, paisData, cantidadManteca2, pais2){
        console.log(areaData, paisData, cantidadManteca2, pais2);
        let toneladasTotales = toneladasTotalesCalc(areaData);
        let proporcion = toneladasTotales / cantidadManteca2;
        infoContenidoJ2.innerHTML = `<p>Para embadurnar ${paisData} se necesitan ${toneladasTotales} toneladas de manteca. </p>
        <p>${pais2} produce ${cantidadManteca2} toneladas de manteca al año. </p>
        <p>Esto quiere decir que para embadurnar ${paisData} se necesita la produccion de manteca de ${pais2} durante ${proporcion} años. </p>`
        resultadoGrandeJ2.innerHTML = `<h3>Se necesitan ${proporcion} años de produccion de manteca de ${pais2} para embadurnar todo ${paisData}</h3>`
        }
        

    selectPaisJ3.addEventListener("change", async () => {
        conseguirBandera(selectPaisJ3, imagenModuloPaisJ3);
        await cargarButterToTheMoon();
    });
    async function cargarButterToTheMoon (){
        let {areaData, paisData} = await cambiarArea(selectPaisJ3);
        let toneladasTotales = toneladasTotalesCalc(areaData);
        const alturaBarraMantecaMetros = 0.115;
        //Una barra de manteca pesa 200gramos
        const alturaKiloManteca = alturaBarraMantecaMetros * 5;
        const alturaToneladaManteca = alturaKiloManteca * 1000;
        const distanciaTierraALuna = 384400000;
        let alturaTotal = toneladasTotales * alturaToneladaManteca;
        let vecesALaLuna = alturaTotal / distanciaTierraALuna;
        infoContenidoJ3.innerHTML = `<p>Para embadurnar ${paisData} se necesitan ${toneladasTotales} toneladas de manteca. </p>
        <p>Con ${toneladasTotales} toneladas de manteca se puede construir una torre de manteca de ${alturaTotal} metros de altura. </p>`
        if (vecesALaLuna < 1){
            resultadoGrandeJ3.innerHTML = `<h3>Con la manteca para embadurnar todo ${paisData} llegariamos a solo ${vecesALaLuna}% de la distancia a la luna</h3>`
        } else if (vecesALaLuna < 2){
            resultadoGrandeJ3.innerHTML = `<h3>Con la manteca para embadurnar todo ${paisData} se puede llegar a la luna pero no se podria volver ${vecesALaLuna} veces</h3>
            `}
            else {
                resultadoGrandeJ3.innerHTML = `<h3>Con la manteca para embadurnar todo ${paisData} se puede llegar a la luna y volver ${(vecesALaLuna/2)} veces</h3>
            `
            }
    }


    selectPaisJ4.addEventListener("change", async () => {
        conseguirBandera(selectPaisJ4, imagenModuloPaisJ4);
        await cargarInfoPayForMyButter();
    });

    async function cargarInfoPayForMyButter() {
        let {areaData, paisData} = await cambiarArea(selectPaisJ4);
        console.log(areaData, paisData);
        let infoGuita = await cambiarGuita(selectPaisJ4_2);
        let paisData2 = infoGuita.nombre;
        let guitaData = infoGuita.valor;
        console.log(infoGuita);
        cargarDataPayForMyButter(areaData, paisData, guitaData, paisData2)
    }

    function cargarDataPayForMyButter(areaData, paisData, guitaData, paisData2){
        let precioDeToneladaDeManteca = 9270;
        let toneladasTotales = toneladasTotalesCalc(areaData);
        let precioTotal = toneladasTotales * precioDeToneladaDeManteca;
        let toneladasComprables = guitaData / precioDeToneladaDeManteca;
        let proporcionPais = guitaData / precioTotal;
        let paisPobre = 1 / proporcionPais;
        console.log(proporcionPais)
        infoContenidoJ4.innerHTML = 
        `<p>Para embadurnar ${paisData} se necesitan ${toneladasTotales} toneladas de manteca. </p>
         <p>Con el GDP de ${paisData2} se podria comprar ${toneladasComprables} toneladas de manteca.
         </p>`
         if (proporcionPais > 1) {
         resultadoGrandeJ4.innerHTML = `<h3> Con su GDP de 2025, ${paisData2} puede embadurnar todo ${paisData} ${proporcionPais} veces</h3>
         `} else {
            resultadoGrandeJ4.innerHTML = `<h3> Se necesitan ${paisPobre} veces la economia de ${paisData2} para embadurnar todo ${paisData} de manteca</h3>
         `
         }
    }
    

    selectPaisJ4_2.addEventListener("change", async () => {
        conseguirBandera(selectPaisJ4_2, imagenModuloPaisJ4_2);
        cargarInfoPayForMyButter();
    });
    selectPaisJ5.addEventListener("change", async () => {
        conseguirBandera(selectPaisJ5, imagenModuloPaisJ5);
        eatMyButter();
    });
    selectPaisJ5_2.addEventListener("change", async () => {
        conseguirBandera(selectPaisJ5_2, imagenModuloPaisJ5_2);
        eatMyButter();
    });
    //CAMBIAR AREA

  async function conseguirId(select){
    let contenido = select.options[select.selectedIndex].getAttribute("id");
    return contenido;
  }


  async function conseguirBandera(selectAUsar, imagen){
    let contenido = await conseguirId(selectAUsar);
    let pais = await recibirBanderaDePais(contenido);
    imagen.innerHTML = `<img src="${pais}"></img>`;
  }
    async function cambiarArea(selectAUsar){
        let contenido = await conseguirId(selectAUsar);
        let pais = await recibirDatoDePais("AG.LND.TOTL.K2", contenido)
        areaData = pais.valor;
        paisData = pais.pais;
        return {areaData, paisData}
    }

        async function cambiarGuita(selectAUsar){
        let contenido = await conseguirId(selectAUsar);
        let pais = await recibirDatoDePais("NY.GDP.MKTP.CD", contenido)
        guitaData = pais.valor;
        paisData = pais.pais;
        let dataEnviar = {nombre: paisData, valor: guitaData}
        console.log(paisData)
        return dataEnviar
        }

    async function cambiarProduccion(selectAUsar) {
        console.log("cambio produccion");
        let contenido = await conseguirId(selectAUsar);
        let objetoManteca = recibirDatosDeManteca(contenido);
        return objetoManteca;
    }

function recibirDatosDeManteca(id) {
    const element = produccionDeMantecaPorPais.find(e => e.iso3 === id);
    if (element) {
        return {
            cantidadManteca: element.manteca,
            pais: element.nombre
        };
    }
    return { cantidadManteca: 0, pais: "Desconocido" }; // fallback
}

        cargarTodosLosSelect();
    function cargarTodosLosSelect(){
        cargarPaisesEnSelect(selectPaisJ1);
        cargarPaisesEnSelect(selectPaisJ2);
        cargarPaisesEnSelect(selectPaisJ2_2);
        cargarPaisesEnSelect(selectPaisJ3);
        cargarPaisesEnSelect(selectPaisJ4);
        cargarPaisesEnSelect(selectPaisJ4_2);
        cargarPaisesEnSelect(selectPaisJ5);
        cargarPaisesEnSelect(selectPaisJ5_2);
    }






    //////////////////////CREACION DE USUARIOS//////////////////////

    const BASE_URL_USUARIOS = ("https://api-usuarios-p2.up.railway.app/api/users")
    async function popUpConfirm() {
        await iniciarSesionUsuario();
        return false;
    }

    async function iniciarSesionUsuario(){
        const response = await fetch(`${BASE_URL_USUARIOS}`);
        const data = await response.json();
        console.log(data);
    }
const inputUsuario = document.querySelector("#inputUsuario");
iniciarSesion.addEventListener("click", iniciarSesionUsuario);
const inputEmail = document.querySelector("#inputEmail");
const registrarseSesion = document.querySelector("#registrarseSesion");
registrarseSesion.addEventListener("click", registrarUsuario)

async function iniciarSesionUsuario(){
    const response = await fetch(`${BASE_URL_USUARIOS}`);
    const data = await response.json();
    const {listaDeUsuarios, listaDeEmails} = await listaDeUsuariosYMails(data);
    if (listaDeUsuarios.includes(inputUsuario.value)){
        alert("Iniciaras sesion como" + inputUsuario.value);
            data.data.forEach(element => {
        if (element.username === inputUsuario.value){
            if (element.data.juego === "ButterMyCountry"){
            Usuario = element;
            mostrarUsuario();
            popUpUsuario.style = "display: none";
        }
        }
    });
    } else if (listaDeEmails.includes(inputEmail.value)) {
        alert("Ingresaras con el email " + inputEmail.value);
            data.data.forEach(element => {
        if (element.email === inputEmail.value){
            if (element.data.juego === "ButterMyCountry"){
            Usuario = element;
            mostrarUsuario();
            popUpUsuario.style = "display: none";
        }
        }
    });
    } else {
        alert("El usuario que ingresaste no existe, registrate o revisa tus datos");
        return false;
    }
}

async function registrarUsuario(){
    const response = await fetch(`${BASE_URL_USUARIOS}`);
    const data = await response.json();
    const {listaDeUsuarios, listaDeEmails} = await listaDeUsuariosYMails(data);
    if (listaDeUsuarios.includes(inputUsuario.value)){
        alert("El usuario ya existe, por favor elija otro nombre de usuario.");
        return false;
    } else if (inputUsuario.value === "" || inputEmail.value === ""){
        alert("Por favor complete todos los campos.");
        return false;
    } else if (!inputEmail.value.includes("@")){
        alert("Por favor ingrese un email válido.");
        return false;
    } else if (listaDeEmails.includes(inputEmail.value)){
        alert("El email ya está en uso, por favor ingrese otro email.");
        return false;
    } else {
        crearUsuario();
        alert("Usuario creado con éxito.");
        popUpUsuario.style = "display: none";
        return true;
    }
}

const nombreUsuarioMostrar = document.querySelector("#nombreUsuarioMostrar")

function mostrarUsuario(){
    nombreUsuarioMostrar.innerHTML = `<p>${Usuario.username} #${Usuario.data.id}</p>`;
}

async function listaDeUsuariosYMails(data){
    let usersDeButter = [];
    data.data.forEach(element => {
       if (element.data.juego === "ButterMyCountry"){
           usersDeButter.push(element);
       }
       listaDeUsuarios = [];
       listaDeEmails = [];
       usersDeButter.forEach(element => {
        listaDeUsuarios.push(element.username);
        listaDeEmails.push(element.email);
       });
    });
    return {listaDeUsuarios, listaDeEmails};
};

//Creador de usuarios
async function crearUsuario(){
    let idNueva = await crearId();
    const nuevoUsuario = {
        username: `${inputUsuario.value}`,
        email: `${inputEmail.value}`,
        data: {
            juego: "ButterMyCountry",
            scoreMaximo: 0,
            partidasJugadas: 0,
            id: idNueva
        }
    };
    const response = await fetch(`${BASE_URL_USUARIOS}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(nuevoUsuario)
});
mostrarUsuario();
}

async function crearId(){
    const response = await fetch(`${BASE_URL_USUARIOS}`);
    const data = await response.json();
    let usersDeButter = [];
    data.data.forEach(element => {
       if (element.data.juego === "ButterMyCountry"){
           usersDeButter.push(element);
           console.log(element);
       }
    });
    const idUnicas = [];
    usersDeButter.forEach(element => {
        idUnicas.push(element.data.id);
    });
    let idUnica = darIdUnica(idUnicas);
    return idUnica;
}

function darIdUnica(idUnicas){
    let randomId = Math.floor(Math.random() * 9999);
    while (idUnicas.includes(randomId)){
        randomId = Math.floor(Math.random() * 9999);
    }
    return randomId;}

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

const actualizarUsuario = document.querySelector("#actualizarUsuario");
const inputNuevoUsuario = document.querySelector("#nuevoUsuario");
const inputNuevoEmail = document.querySelector("#nuevoEmail");

actualizarUsuario.addEventListener("click", actualizarDatosUsuario);

async function actualizarDatosUsuario(){
    if (Usuario === ""){
        alert("Debes Iniciar Sesion para actualizar tus datos");
        return false;
    }

    const url = `${BASE_URL_USUARIOS}/${Usuario.data.id}`;
    
    const nuevosDatos = {
        username: inputNuevoUsuario.value || Usuario.username,
        email: inputNuevoEmail.value || Usuario.email,
        data: Usuario.data.id
    };
    console.log(nuevosDatos)

    try {
        const response = await fetch(`${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevosDatos)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Usuario actualizado con éxito.");
            Usuario = data;
            mostrarUsuario();
        } else {
            alert("Error al actualizar el usuario.");
        }
    } catch (error) {
        console.log("Error actualizando:", error);
        alert("Ocurrió un error al intentar actualizar el usuario.");
    }
}


////////Juego 5////////

const resultadoGrandeJ5 = document.querySelector("#resultadoGrandeJ5");

async function eatMyButter(){
    
    const paisConsumidor = await conseguirId(selectPaisJ5_2);
    const paisEnmantecado = await conseguirId(selectPaisJ5);

    const calorías = 2400;
    const diasAño = 365;
    const caloriasAño = calorías * diasAño;

    const caloriasMantecaGramo = 7.17;

    const gramosMantecaPersona = caloriasAño / caloriasMantecaGramo;
    const kilosMantecaPersona = gramosMantecaPersona / 1000;
    const toneladasMantecaPersona = kilosMantecaPersona / 1000;

    let {areaData, paisData} = await cambiarArea(selectPaisJ5);;
    const toneladasTotales = toneladasTotalesCalc(areaData);

    const personasAlimentadas = Math.floor(toneladasTotales / toneladasMantecaPersona);

    const infoPaisConsumidor = await recibirDatoDePais("SP.POP.TOTL", paisConsumidor);
    const poblacionTotal = infoPaisConsumidor.valor;
    const nombreConsumidor = infoPaisConsumidor.pais;

    const infoPaisEnmantecado = await recibirDatoDePais("SP.POP.TOTL", paisEnmantecado);
    const nombreProductor = infoPaisEnmantecado.pais;

    infoContenidoJ5.innerHTML = `
        <p>Si cubriéramos completamente el territorio de <strong>${nombreProductor}</strong> con una capa de manteca de 1 milímetro de altura, se necesitarían aproximadamente <strong>${Math.round(toneladasTotales)} toneladas</strong> de manteca.</p>
        <p>Una persona necesita alrededor de <strong>${toneladasMantecaPersona} toneladas</strong> de manteca por año para sobrevivir con una dieta de 2400 calorías diarias compuesta solo de manteca.</p>
        <p>Con esa cantidad total de manteca, se podría alimentar durante un año a unas <strong>${Math.floor(personasAlimentadas)} personas</strong>.</p>
        <p>La población de <strong>${nombreConsumidor}</strong> es de aproximadamente <strong>${Math.round(poblacionTotal)}</strong> personas.</p>
    `;

    if (personasAlimentadas >= poblacionTotal) {
        resultadoGrandeJ5.innerHTML = `<h3>¡La manteca que cubriría a ${nombreProductor} alcanza para alimentar a toda la población de ${nombreConsumidor} durante un año!</h3>`;
    } else {
        resultadoGrandeJ5.innerHTML = `<h3>No alcanza... solo se puede alimentar a <strong>${Math.floor(personasAlimentadas)}</strong> personas en ${nombreConsumidor} durante un año comiendo solo manteca.</h3>`;
    }

    
}


//BUTTERROYALE//

const iniciarButterRoyale = document.querySelector("#iniciarButterRoyale");
const butterRoyaleJuego = document.querySelector("#butterRoyaleJuego");
const preguntaButterRoyale = document.querySelector("#preguntaButterRoyale");
const opcion1ButterRoyale = document.querySelector("#opcion1ButterRoyale");
const apretarOpcion1ButterRoyale = document.querySelector("#apretarOpcion1ButterRoyale");
const opcion2ButterRoyale = document.querySelector("#opcion2ButterRoyale");
const apretarOpcion2ButterRoyale = document.querySelector("#apretarOpcion2ButterRoyale");
iniciarButterRoyale.addEventListener("click", iniciarButterRoyaleFuncion);

async function iniciarButterRoyaleFuncion(){
    //iniciarButterRoyale.style = "display: none";
    butterRoyaleJuego.style = "display: block";
    console.log("se carga boton");
    await cargarPartidaRoyale();
}
async function cargarPartidaRoyale(){
await cargarRondaRoyale();
}


async function cargarRondaRoyale() {
    const paises = await obtenerListaPaisesWorldBank();
    const paisAleatorio = paises[Math.floor(Math.random() * paises.length)];
    const paisAleatorio2 = paises[Math.floor(Math.random() * paises.length)];
        let electorDeJuego = Math.floor(Math.random() * 3);    
        console.log("elector " + electorDeJuego); 
    if (electorDeJuego === 0){
        await cargarDatosDePaisRandomCompetitivo(paisAleatorio, opcion1ButterRoyale);
        await juegoButterRoyaleButterMyCountry(paisAleatorio);
    } else if (electorDeJuego === 1){
        await cargarDatosDePaisRandomCompetitivo(paisAleatorio, opcion1ButterRoyale);
        await juegoButterRoyaleProduceMyButter(paisAleatorio);
    } else if (electorDeJuego === 2){
        await juegoButterRoyaleButterToTheMoon(paisAleatorio, paisAleatorio2);
} else if (electorDeJuego === 3){
            await cargarDatosDePaisRandomCompetitivo(paisAleatorio2, opcion2ButterRoyale);
        await juegoButterRoyalePayForMyButter(paisAleatorio, paisAleatorio2);
}else if (electorDeJuego === 4){
        await juegoButterRoyaleEatMyButter(paisAleatorio, paisAleatorio2);
}}

//Juegos Competitivos//

async function juegoButterRoyaleButterMyCountry(pais1, pais2) {
    preguntaButterRoyale.innerHTML = `<h2>Butter My Country</h2>`
    let electorDeJuego = Math.floor(Math.random() * 2);
    console.log(electorDeJuego);
    if (electorDeJuego === 0) {
        preguntaButterRoyale.innerHTML += `
        <h2>Cuantas toneladas de manteca necesitas para enmantecar ${pais1.name}?</h2>`
        let {areaData, paisData} = await cambiarAreaCompetitivo(pais1.id);
        console.log(areaData);
        let toneladasTotales1 = toneladasTotalesCalc(areaData);
        apretarOpcion1ButterRoyale.innerHTML = `<h3>${toneladasTotales1}</h3>`;
        apretarOpcion2ButterRoyale.innerHTML = `<h3>${toneladasTotales1 * (Math.floor(Math.random() * 1.5)+0.5)}</h3>`;
    } else {
               preguntaButterRoyale.innerHTML += `
        <h2>Cuantas toneladas de manteca necesitas para enmantecar ${pais1.name}?</h2>`
        let {areaData, paisData} = await cambiarAreaCompetitivo(pais1.id);
        console.log(areaData);
        let toneladasTotales1 = toneladasTotalesCalc(areaData);
        apretarOpcion2ButterRoyale.innerHTML = `<h3>${toneladasTotales1}</h3>`;
        apretarOpcion1ButterRoyale.innerHTML = `<h3>${toneladasTotales1 * (Math.floor(Math.random() * 1.5)+0.5)}</h3>`; 
    }
}
async function juegoButterRoyaleProduceMyButter(pais1, pais2) {
    preguntaButterRoyale.innerHTML = `<h2>Prdouce My Butter</h2>`
    let electorDeJuego = Math.floor(Math.random() * 2);
    console.log(electorDeJuego);
        preguntaButterRoyale.innerHTML += `
        <h2>Qué pais puede enmantecar completamente a ${pais1.name} con su producción de manteca?</h2>`
        let {areaData, paisData} = await cambiarAreaCompetitivo(pais1.id);
        console.log("area " + areaData);
        let toneladasTotales1 = toneladasTotalesCalc(areaData);
        console.log("toneladas " + toneladasTotales1);
        let recibirPaises = conseguirPaisConMantecaSimilar(areaData);
        let paisProductor = recibirPaises.Productor;
        let paisRandom = recibirPaises.Random;
        console.log(paisProductor);
        console.log(paisRandom);
        if (electorDeJuego === 0) {
        apretarOpcion1ButterRoyale.innerHTML = `<h3>${paisProductor}</h3>`;
        apretarOpcion2ButterRoyale.innerHTML = `<h3>${paisRandom}</h3>`;
        } else {
        apretarOpcion1ButterRoyale.innerHTML = `<h3>${paisRandom}</h3>`;
        apretarOpcion2ButterRoyale.innerHTML = `<h3>${paisProductor}</h3>`;  
        }
}


async function juegoButterRoyaleButterToTheMoon(pais1) {
        preguntaButterRoyale.innerHTML = `<h2>Butter My Country</h2>`
        let electorDeJuego = Math.floor(Math.random() * 2);
        preguntaButterRoyale.innerHTML += `
        <h2>Que tan cerca de la luna puede llegar la torre de manteca que embadurna ${pais1.name}?</h2>`
        let {areaData, paisData} = await cambiarAreaCompetitivo(pais1.id);
        let toneladasTotales1 = toneladasTotalesCalc(areaData);
        const alturaBarraMantecaMetros = 0.115;
        //Una barra de manteca pesa 200gramos
        const alturaKiloManteca = alturaBarraMantecaMetros * 5;
        const alturaToneladaManteca = alturaKiloManteca * 1000;
        const distanciaTierraALuna = 384400000;
        let alturaTotal = toneladasTotales * alturaToneladaManteca;
        let vecesALaLuna = alturaTotal / distanciaTierraALuna;
        if (electorDeJuego === 0) {
            apretarOpcion1ButterRoyale.innerHTML = `<h3>${vecesALaLuna}</h3>`;
            apretarOpcion2ButterRoyale.innerHTML = `<h3>${vecesALaLuna * (Math.floor(Math.random() * 1.5)+0.5)}</h3>`;
        } else {
            apretarOpcion2ButterRoyale.innerHTML = `<h3>${vecesALaLuna}</h3>`;
            apretarOpcion1ButterRoyale.innerHTML = `<h3>${vecesALaLuna * (Math.floor(Math.random() * 1.5)+0.5)}</h3>`;
        }
}
async function juegoButterRoyalePayForMyButter() {
}
async function juegoButterRoyaleEatMyButter() {
}


  async function cargarDatosDePaisRandomCompetitivo(contenido, imagen){
    let idContenido = contenido.id;
    let nombreContenido = contenido.name;
    let pais = await recibirBanderaDePais(idContenido);
    imagen.innerHTML = `<h3>${nombreContenido}</h3>`
    imagen.innerHTML += `<img src="${pais}"></img>`;
  }

      async function cambiarAreaCompetitivo(contenido){
        let pais = await recibirDatoDePais("AG.LND.TOTL.K2", contenido)
        areaData = pais.valor;
        paisData = pais.pais;
        return {areaData, paisData}
    }


function conseguirPaisConMantecaSimilar(toneladasTotales) {
    for (let index = produccionDeMantecaPorPais.length - 1; index >= 0; index--) {
        const element = produccionDeMantecaPorPais[index];
        if (element.manteca > toneladasTotales) {
            let paisProductor = element.nombre;
            let randomIndex = Math.floor(Math.random() * (index + 1));
            let paisRandom = produccionDeMantecaPorPais[randomIndex].nombre;
            let retorno = {Productor: paisProductor, Random: paisRandom};
            return retorno;
        }
    }
    let paisProductor = produccionDeMantecaPorPais[0].nombre;
    let randomIndex = Math.floor(Math.random() * produccionDeMantecaPorPais.length);
    let paisRandom = produccionDeMantecaPorPais[randomIndex].nombre;
    let retorno = {Productor: paisProductor, Random: paisRandom};
    return retorno;
}
