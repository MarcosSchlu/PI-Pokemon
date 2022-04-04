// MARCOS CREO EL INITIAL STATE

const initialState = {
  pokemons: [],
  allPokemonsapi: [],
  pokemon: [],
  tipos: [],
  filtrostipo: [],
  filtroscreado: [],
  vacio: [],
  listaPokemonsdb: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GETALLPOKEMONS":
      const nuevosapi = action.payload
      const listaPokemonsdb = state.listaPokemonsdb
      const todos = nuevosapi.concat(listaPokemonsdb)

      if (!todos.length) return { ...state };
      console.log(
        "Se atraparon " + todos.length + " Pokemons"
      );

      let arregloOrdenado2 = todos.sort(function (a, b) {
        if (a.name > b.name) return 1
        if (b.name > a.name) return -1
        return 0;
      });

      return {
        ...state,
        pokemons: [ ...arregloOrdenado2],
        allPokemonsapi: [...nuevosapi],
        allPokemons: [ ...arregloOrdenado2],
      };
      
    case "GETTIPOS":
      return { ...state, tipos: action.payload };
    case "GETPOKEMONSID":
      return { ...state, pokemon: action.payload };
    case "BORRARPOKEMON":
      return { ...state, pokemon: [] };
    case "GETPOKEMONSNAME":

    //OPCION RAPIDA
      const todosPokemons3 = state.allPokemons;
      let pokemonBuscado = todosPokemons3.filter((pokemons) =>
        pokemons.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        pokemons: action.payload === "" ? state.vacio : pokemonBuscado,
      };


/*       //OPCION LENTA
      return { ...state, pokemons: action.payload }; */


      
    case "FILTROPORTIPO":
      if (action.payload === "") {
        return { ...state, pokemons: state.allPokemons };
      } else {
        const allPokemons = state.allPokemons;
        const tipofiltro =
          action.payload === ""
            ? state.allPokemons
            : allPokemons.filter((pokemon) =>
                pokemon.tipo?.some(
                  (tipo) => tipo.toLowerCase() === action.payload.toLowerCase()
                )
              );
        return { ...state, pokemons: tipofiltro };
      }
    case "FILTROPORCREADO":
      const todosPokemons = state.allPokemons;
      const filtroCreado =
        action.payload === "creado"
          ? todosPokemons.filter((pokemon) => pokemon.db)
          : todosPokemons.filter((pokemon) => !pokemon.db);
      return {
        ...state,
        pokemons: action.payload === "" ? state.allPokemons : filtroCreado,
      };
    case "ORDENAR":
      if (action.payload === "masfuerte") {
        let arregloOrdenado = state.pokemons.sort(function (a, b) {
          if (a.fuerza > b.fuerza) {
            return -1;
          }
          if (b.fuerza > a.fuerza) {
            return 1;
          }
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      if (action.payload === "menosfuerte") {
        let arregloOrdenado = state.pokemons.sort(function (a, b) {
          if (a.fuerza > b.fuerza) {
            return 1;
          }
          if (b.fuerza > a.fuerza) {
            return -1;
          }
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      if (action.payload === "") {
        let arregloOrdenado = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      if (action.payload === "za") {
        let arregloOrdenado = state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      break;
    case "BORRARFILTRO":
      return { ...state, pokemons: state.allPokemons };
    case "CREARPOKEMON":
      return { ...state };

    case "GETALLPOKEMONSDB":
      const Pokemonsdb = action.payload
      const listaPokemonsapi = state.allPokemonsapi
      const todosdb = Pokemonsdb.concat(listaPokemonsapi)

      if (!todosdb.length) return { ...state };
      console.log(
        "Se atraparon " + todosdb.length + " Pokemons"
      );

      let arregloOrdenado3 = todosdb.sort(function (a, b) {
        if (a.name > b.name) return 1
        if (b.name > a.name) return -1
        return 0;
      });

      return {
        ...state,
        pokemons: [ ...arregloOrdenado3],
        listaPokemonsdb: [...Pokemonsdb],
        allPokemons: [ ...arregloOrdenado3],
      };

    default:
      return state;
  }
}

export default rootReducer;
