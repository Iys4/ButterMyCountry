BASE_URL0 = 'https://api.worldbank.org/v2/';
const BASE_URL_PAISES = `${BASE_URL0}country?format=json&per_page=300`;

async function obtenerPaises() {
    try {
        let response = await fetch(BASE_URL_PAISES);
        let data = await response.json();
        let listaPaises = [];
        let countries = data[1];
        //Este socotroco es para filtrar las regiones de los paises que por alguna razon los incluyen en el API de paises
        countries.filter(country => country.region.id !== 'NA').forEach(country => {
                console.log(country);
                listaPaises.push(country.id);
            });
            return listaPaises;
    } catch (error) {
        console.log("Error: No hemos podido acceder a los países. " + error);
    }
}

getIndicator("AG.LND.TOTL.K2");
async function getIndicator(indicador) {
    let countryList = await obtenerPaises();
    let indicator = indicador;
    for (let country of countryList) {
        const url = `${BASE_URL0}country/${country}/indicator/${indicator}?format=json&date=2022`;
        try {
            let response = await fetch(url);
            let data = await response.json();
            // The area value is in data[1][0].value if available
            let nombrePais = data[1][0].country.value;
            let info = data[1][0].value;
            let nombreIndicador = data[1][0].indicator.value;
            console.log(`El valor del indicador ${nombreIndicador} para ${nombrePais} en 2022 es: ${info}`);
        } catch (error) {
            console.log(`Error getting area for ${country}: ${error}`);
        }
    }
}

async function getIndicatorForCountry(indicador, pais) {
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

//Buscador de topicos
//Esto es para encontrar la id de lo que estemos buscando

//Las tematicas son
//ID: 1, Temática: Agriculture & Rural Development
//ID: 2, Temática: Aid Effectiveness
//ID: 3, Temática: Economy & Growth
//ID: 4, Temática: Education
//ID: 5, Temática: Energy & Mining
//ID: 6, Temática: Environment
//ID: 7, Temática: Financial Sector
//ID: 8, Temática: Health
//ID: 9, Temática: Infrastructure
//ID: 10, Temática: Social Protection & Labor
//ID: 11, Temática: Poverty
//ID: 12, Temática: Private Sector
//ID: 13, Temática: Public Sector
//ID: 14, Temática: Science & Technology
//ID: 15, Temática: Social Development
//ID: 16, Temática: Urban Development
//ID: 17, Temática: Gender
//ID: 18, Temática: Millenium development goals
//ID: 19, Temática: Climate Change
//ID: 20, Temática: External Debt
//ID: 21, Temática: Trade

//const TOPICS_URL = `${BASE_URL0}topic?format=json&per_page=100`;
//
//async function obtenerTopicos() {
//    try {
//        let response = await fetch(TOPICS_URL);
//        let data = await response.json();
//        let topicos = data[1]; // The second element contains the topics
//        if (topicos) {
//            topicos.forEach(topico => {
//                console.log(`ID: ${topico.id}, Temática: ${topico.value}`);
//            });
//        } else {
//            console.log("No se encontraron tópicos.");
//        }
//    } catch (error) {
//        console.log("Error al obtener los tópicos: " + error);
//    }
//}

// Llama a la función para listar todos los tópicos
//obtenerTopicos();

//Usando este codigo y cambiando la const "Tematica" podemos encontrar las id de todas las tematicas que querramos
//let tematicaId = 3;
//    const INDICATOR_URL = `${BASE_URL0}topic/${tematicaId}/indicator?format=json&per_page=300`;
//async function obtenerIndicesPorTopico() {
//    try {
//        let response = await fetch(INDICATOR_URL);
//        let data = await response.json();
//        let indices = data[1]; // The second element contains the indicators
//        if (indices) {
//            indices.forEach(indicador => {
//                console.log(indicador.name);
//                console.log(indicador.id);
//            });
//        } else {
//            console.log("No se encontraron indicadores para el tópico especificado.");
//        }
//    } catch (error) {
//        console.log("Error al obtener los índices: " + error);
//    }
//}
//
//// Llama a la función para el tópico 6
//obtenerIndicesPorTopico(6);