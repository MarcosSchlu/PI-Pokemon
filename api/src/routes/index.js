const { Router } = require("express");
const fetch = require("node-fetch");
const { Pokemon, Tipo } = require("../db.js");
const router = Router();

const getInfo = async () => {
  try {
    const pokemonInfo2 = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=40"
    )
      .then((infoApi) => infoApi.json())
      .then(async (infoApiJson) => {
        const pokemonInfo = await Promise.all(
          infoApiJson.results.map((infoTotal) =>
            fetch(infoTotal.url)
              .then((pokemon) => pokemon.json())
              .then(
                (pokemonJson) =>
                  (newPokemon = {
                    id: pokemonJson.id,
                    name: pokemonJson.name.toLowerCase(),
                    tipo: pokemonJson.types.map((tipo) => tipo.type.name),
                    img: pokemonJson.sprites.other.dream_world.front_default,
                    fuerza: pokemonJson.stats[1].base_stat,
                    vida: pokemonJson.stats[0].base_stat,
                    defensa: pokemonJson.stats[2].base_stat,
                    velocidad: pokemonJson.stats[5].base_stat,
                    altura: pokemonJson.height,
                    peso: pokemonJson.weight,
                  })
              )
              .then((newPokemon) => {
                return newPokemon;
              })
          )
        );
        return pokemonInfo;
      });
    return pokemonInfo2;
  } catch (error) {
    res.send(error);
  }
};

const getInfoDB = async () => {
  const infoDB = await Pokemon.findAll({ include: Tipo });
  let infoTotal = [...infoDB];
  let pokemonInfo = [];
  if (!infoTotal.length) return pokemonInfo;
  for (i = 0; i < infoTotal.length; i++) {
    pokemonInfo.push({
      id: infoTotal[i].id,
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

router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;
    let pokemonsAPI = await getInfo();
    let pokemonsDB = await getInfoDB();
    let pokemonsTotales = pokemonsAPI.concat(pokemonsDB);
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
  } catch (error) {
    res.send(error);
  }
});

router.get("/types", async (req, res) => {
  try {
    const api = await fetch("https://pokeapi.co/api/v2/type");
    const tipos = await api.json();
    for (tipo of tipos.results) {
      Tipo.findOrCreate({
        where: { name: tipo.name.replace(/\b\w/g, (l) => l.toUpperCase()) },
      });
    }
    const todosLosTipo = await Tipo.findAll();
    res.send(todosLosTipo);
  } catch (error) {
    res.send(error);
  }
});

router.post("/pokemons", async (req, res) => {
  let { name, vida, fuerza, defensa, velocidad, altura, peso, tipo, img } =
    req.body;

  if (!name) return res.json({ info: "El nombre es una campo obligatorio" });
  if (isNaN(vida))
    return res.json({ info: "La vida ingresada no es un numero" });
  if (isNaN(fuerza))
    return res.json({ info: "La fuerza ingresada no es un numero" });
  if (isNaN(defensa))
    return res.json({ info: "La defensa ingresada no es un numero" });
  if (isNaN(velocidad))
    return res.json({ info: "La velocidad ingresada no es un numero" });
  if (isNaN(altura))
    return res.json({ info: "La altura ingresada no es un numero" });
  if (isNaN(peso))
    return res.json({ info: "El peso ingresada no es un numero" });

  const existe = await Pokemon.findOne({ where: { name: name } });
  if (existe)
    return res.json({ info: "El nombre del Pokemon ingresado ya existe" });

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

  let tipoDB = await Tipo.findAll({
    where: { name: tipo },
  });
  pokemonCreado.addTipo(tipoDB);
  res.send("Pokemon creado con exito");
});

router.get("/pokemons/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pokemonsAPI = await getInfo(id);
    const pokemonsDB = await getInfoDB(id);
    const pokemonsTotales = pokemonsDB.concat(pokemonsAPI);
    if (id) {
      let pokemonBuscado = pokemonsTotales.filter(
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
  } catch (error) {
    res.send(error);
  }
});

router.delete('/clear/:id', async (req, res) => {
  const { id } = req.params;
  let poke = await Pokemon.findOne({where : {id : id}}).catch(e=> {console.log(e.message)})
  if (!poke) console.log("err") 
  poke.destroy()
  res.redirect('/home')
});



module.exports = router;
