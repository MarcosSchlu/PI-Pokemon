const { Router } = require("express");
const fetch = require("node-fetch");

// MARCOS
// IMPORTO DESDE BASE DE DATOS
const { Pokemon, Tipo } = require("../db.js");

const router = Router();
// VER DE PASAR LIMIT POR VARIABLE Y QUE ID DE LOS QUE CREE SEA DESDE EL LIMIT+1 INCREMENTANDOSE

// MARCOS
// FUNCION ASYNCONA QUE TRAE TODA LA INFORMACION DE LA API y DE LA BASE DE DATOS (ICLUYENDO LOS TIPOS POR EL ATRIBUTO NOMBRE)
const getInfo = async () => {
  const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
  const infoApi = await api.json();
  const infoDB = await Pokemon.findAll({ include: Tipo });

  // CONCATENO LA INFO DE LA API CON LA INFO DE LA BASE DE DATOS
  let infoTotal = [...infoDB, ...infoApi.results];

  // OBTENGO TODA LA INFO Y LA PUSHEO CON LA INFO QUE NECESITO

  let pokemonInfo = [];

  /*   let a= infoApi.results.map((pokemon) => fetch(pokemon.url))
  Promise.all(a)
  .then(v => console.log(v)) */

  for (i = 0; i < infoTotal.length; i++) {
    if (!infoTotal[i]) return pokemonInfo;
    if (infoTotal[i].url) {
      const pokemon = await fetch(infoTotal[i].url);
      const infoPokemon = await pokemon.json();
      const newPokemon = {
        id: infoPokemon.id,
        name: infoPokemon.name.toLowerCase(),
        tipo: infoPokemon.types.map((tipo) => tipo.type.name),
        img: infoPokemon.sprites.other.dream_world.front_default,
        fuerza: infoPokemon.stats[1].base_stat,
        vida: infoPokemon.stats[0].base_stat,
        defensa: infoPokemon.stats[2].base_stat,
        velocidad: infoPokemon.stats[5].base_stat,
        altura: infoPokemon.height,
        peso: infoPokemon.weight,
      };
      if (pokemonInfo.indexOf(newPokemon) === -1) {
        pokemonInfo.push(newPokemon);
      } else {
        return pokemonInfo;
      }
    } else {
      const newPokemon = {
        id: infoTotal[i].id,
        idPokemon: infoTotal[i].idPokemon,
        name: infoTotal[i].name.toLowerCase(),
        tipo: infoTotal[i].tipos.map((tipo) => tipo.name),
        img: infoTotal[i].img,
        fuerza: infoTotal[i].fuerza,
        vida: infoTotal[i].vida,
        defensa: infoTotal[i].defensa,
        velocidad: infoTotal[i].velocidad,
        altura: infoTotal[i].altura,
        peso: infoTotal[i].peso,
        db: infoTotal[i].db,
      };
      if (pokemonInfo.indexOf(newPokemon) === -1) {
        pokemonInfo.push(newPokemon);
      } else {
        return pokemonInfo;
      }
    } 
  }
  return pokemonInfo;
};

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  let pokemonsTotales = await getInfo();
  if (name) {
    let pokemonBuscado = pokemonsTotales.filter((pokemons) =>
      pokemons.name.toLowerCase().includes(name.toLowerCase())
    );
    if (pokemonBuscado.length) {
      res.status(200).send(pokemonBuscado);
    } else {
      res.status(400).send("No existe el Pokemon");
    }
  } else {
    res.status(200).send(pokemonsTotales);
  }
});

router.get("/types", async (req, res) => {
  const api = await fetch("https://pokeapi.co/api/v2/type");
  const tipos = await api.json();
  for (tipo of tipos.results) {
    Tipo.findOrCreate({
      where: { name: tipo.name.replace(/\b\w/g, (l) => l.toUpperCase()) },
    });
  }
  const todosLosTipo = await Tipo.findAll();
  res.send(todosLosTipo);
});

router.post("/pokemons", async (req, res) => {
  let { name, vida, fuerza, defensa, velocidad, altura, peso, tipo, img } =
    req.body;
  let pokemonCreado = await Pokemon.create({
    name: name,
    vida: vida,
    fuerza: fuerza,
    defensa: defensa,
    velocidad: velocidad,
    altura: altura,
    peso: peso,
    img: img,
  });

  // VER COMO HACER PARA VALIDAR QUE NO ESTE VACIO, SI ESTA VACIO LLENAR LA DB
  let tipoDB = await Tipo.findAll({
    where: { name: tipo },
  });
  pokemonCreado.addTipo(tipoDB);
  res.send("Pokemon creado con exito");
});

router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  const pokemonsTotales = await getInfo(id);
  if (id) {
    let pokemonBuscado = await pokemonsTotales.filter(
      (pokemons) => pokemons.id == id
    );
    if (pokemonBuscado.length) {
      res.status(200).send(pokemonBuscado);
    } else {
      res.status(404).send("No se encontro el Pokemon");
    }
  } else {
    res.status(200).send(pokemonsTotales);
  }
});

/* const getInfoApi = async () => {
  const api = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
  const infoApi = await api.json();
  let infoTotal = [...infoApi.results];
  let pokemonInfo = [];
  for (i = 0; i < infoTotal.length; i++) {
    if (infoTotal[i].url) {
      const pokemon = await fetch(infoTotal[i].url);
      const infoPokemon = await pokemon.json();
      pokemonInfo.push({
        id: infoPokemon.id,
        name: infoPokemon.name.toLowerCase(),
        tipo: infoPokemon.types.map((tipo) => tipo.type.name),
        img: infoPokemon.sprites.other.dream_world.front_default,
        fuerza: infoPokemon.stats[1].base_stat,
        vida: infoPokemon.stats[0].base_stat,
        defensa: infoPokemon.stats[2].base_stat,
        velocidad: infoPokemon.stats[5].base_stat,
        altura: infoPokemon.height,
        peso: infoPokemon.weight,
      });
    }
  }
  return pokemonInfo;
};

router.get("/pokemonesapi", async (req, res) => {
  let pokemonsTotales = await getInfoApi();
  res.status(200).send(pokemonsTotales);
}); */

const getInfoDB = async () => {
  const infoDB = await Pokemon.findAll({ include: Tipo });
  let infoTotal = [...infoDB];
  let pokemonInfo = [];
  for (i = 0; i < infoTotal.length; i++) {
    pokemonInfo.push({
      id: infoTotal[i].id,
      idPokemon: infoTotal[i].idPokemon,
      name: infoTotal[i].name.toLowerCase(),
      tipo: infoTotal[i].tipos.map((tipo) => tipo.name),
      img: infoTotal[i].img,
      fuerza: infoTotal[i].fuerza,
      vida: infoTotal[i].vida,
      defensa: infoTotal[i].defensa,
      velocidad: infoTotal[i].velocidad,
      altura: infoTotal[i].altura,
      peso: infoTotal[i].peso,
      db: infoTotal[i].db,
    });
  }
  return pokemonInfo;
};

router.get("/pokemonesdb", async (req, res) => {
  let pokemonsTotales = await getInfoDB();
  res.status(200).send(pokemonsTotales);
});



module.exports = router;
