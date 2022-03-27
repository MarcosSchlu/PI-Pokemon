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
  const api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=5')
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
        tipo: infoTotal[i].tipos.map((tipo) => tipo.name),
        // VER QUE PONGO ACA
        // img: ,
        fuerza: infoTotal[i].fuerza,
      })
    }
  }
  return pokemonInfo
}


router.get('/pokemons', async ( req, res ) => {
  const {name} = req.query
  let pokemonsTotales = await getInfo ();
  if (name) {
    let pokemonBuscado = await pokemonsTotales.filter( pokemons => pokemons.name.toLowerCase().includes(name.toLowerCase()))
    if (pokemonBuscado.length){
      res.status(200).send(pokemonBuscado)
    } else {
      res.status(400).send('No existe el Pokemon')
    }
  } else {
    res.status(200).send(pokemonsTotales)
  }
})

router.get('/types', async (req, res) => {
  const api = await fetch('https://pokeapi.co/api/v2/type')
  const tipos = await api.json()
  for (tipo of tipos.results) {
    Tipo.findOrCreate({
      where: { name: tipo.name}
    })
  }
  const todosLosTipo = await Tipo.findAll()
  res.send(todosLosTipo)
})

router.post('/pokemons', async (req,res) => {
  let { name, vida, fuerza, defensa, velocidad, altura, peso, tipo} = req.body
  let pokemonCreado = await Pokemon.create ({
    name: name, vida: vida, fuerza: fuerza, defensa: defensa, velocidad: velocidad, altura:altura, peso:peso
  })

  // VER COMO HACER PARA VALIDAR QUE NO ESTE VACIO, SI ESTA VACIO LLENAR LA DB
  let tipoDB = await Tipo.findAll({
    where: {name: tipo}
  })
  pokemonCreado.addTipo(tipoDB)
  res.send('Pokemon creado con exito')
})

module.exports = router;
