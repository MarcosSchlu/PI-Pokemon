const { Router } = require('express');

// MARCOS
// IMPORTO DESDE BASE DE DATOS
const {Pokemon, Tipo} = require('../db.js')

const router = Router();
// VER DE PASAR LIMIT POR VARIABLE Y QUE ID DE LOS QUE CREE SEA DESDE EL LIMIT+1 INCREMENTANDOSE

// MARCOS
// FUNCION ASYNCONA QUE TRAE TODA LA INFORMACION DE LA API y DE LA BASE DE DATOS (ICLUYENDO LOS TIPOS POR EL ATRIBUTO NOMBRE)
const getInfo = async () => {
  const api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
  const infoApi = await api.json()
  const infoDB = await Pokemon.findAll({ include: Tipo })

  // CONCATENO LA INFO DE LA API CON LA INFO DE LA BASE DE DATOS
  const infoTotal = infoApi.concat(infoDB)

  // MAPEO TODA LA INFO Y LA PUSHEO CON LA INFO QUE NECESITO
  const pokemonInfo = []
  for( i = 0 ; i < infoTotal.lenght ; i++ ){
    if (!infoTotal[i]) return pokemonInfo
    if(infoTotal[i].url) {
      const pokemon = await fetch(infoTotal[i].url)
      const infoPokemon = await pokemon.json()

      pokemonInfo.push({
        id: infoPokemon.id,
        name: infoPokemon.name,
        tipo: infoPokemon.types.map((tipo) => tipo.type.name),
        img: infoPokemon.sprites.other.dream_world.front_default,
        // VER SI ESTO ES FUERZA???
        fuerza: infoPokemon.stats[1].base_stat,
      })
    } else {
      pokemonInfo.push({
        id: infoTotal[i].id,
        idPokemon: infoTotal[i].idPokemon,
        name: infoTotal[i].name,
        tipo: infoTotal[i].tipo.map((tipo) => tipo.name),
        // VER QUE PONGO ACA
        // img: ,
        fuerza: infoTotal[i].fuerza,
      })
    }
  }
  return pokemonInfo
}




module.exports = router;
