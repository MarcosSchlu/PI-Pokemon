const { Router } = require('express');
const fetch = require('node-fetch');

// MARCOS
// IMPORTO DESDE BASE DE DATOS
const {Pokemon, Tipo} = require('../db.js')

const router = Router();
// VER DE PASAR LIMIT POR VARIABLE Y QUE ID DE LOS QUE CREE SEA DESDE EL LIMIT+1 INCREMENTANDOSE

// MARCOS
// FUNCION ASYNCONA QUE TRAE TODA LA INFORMACION DE LA API y DE LA BASE DE DATOS (ICLUYENDO LOS TIPOS POR EL ATRIBUTO NOMBRE)
const getInfo = async () => {
  const api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=2')
  const infoApi = await api.json()
  const infoDB = await Pokemon.findAll({ include: Tipo })

  // CONCATENO LA INFO DE LA API CON LA INFO DE LA BASE DE DATOS
  let infoTotal = [ ...infoDB, ...infoApi.results]

  // OBTENGO TODA LA INFO Y LA PUSHEO CON LA INFO QUE NECESITO

  let pokemonInfo = [];
  for (i = 0; i < infoTotal.length; i++) {
    if (!infoTotal[i]) return pokemonInfo;
    if (infoTotal[i].url) {
      const pokemon = await fetch(infoTotal[i].url);
      const infoPokemon = await pokemon.json();

      pokemonInfo.push({
        id: infoPokemon.id,
        name: infoPokemon.name,
        tipo: infoPokemon.types.map((tipo) => tipo.type.name),
        img: infoPokemon.sprites.other.dream_world.front_default,
        fuerza: infoPokemon.stats[1].base_stat,
      });
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


router.get('/pokemons', async ( req, res ) => {
  const name = req.query.name
  let pokemosTotales = await getInfo ();
  if (name) {
    let pokemonName = await pokemosTotales.includes( pokemons => pokemons.name.toLowerCase().includes(name))
    pokemonName.lenght ? res.status(200).send(pokemonName) : res.status(400).send('No existe el Pokemon')
  } else {
    res.status(200).send(pokemosTotales)
  }
})

module.exports = router;
