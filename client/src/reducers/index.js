// MARCOS CREO EL INITIAL STATE

const initialState = {
  pokemons: [],
  allPokemons: [],
  pokemon: [],
  tipos: [],
  filtrosyOrden: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GETALLPOKEMONS":
      console.log("Se atraparon " + action.payload.length + " pokemons");
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GETTIPOS":
      return { ...state, tipos: action.payload };
    case "GETPOKEMONSID":
      return { ...state, pokemon: action.payload };
    case "BORRARPOKEMON":
      return { ...state, pokemon: [] };
    case "GETPOKEMONSNAME":
      return { ...state, pokemons: action.payload };
    case "FILTROPORTIPO":
      if (action.payload === "todos") {
        return { ...state, pokemons: state.allPokemons };
      } else {
        const allPokemons = state.allPokemons;
        const tipofiltro =
          action.payload === "Todos"
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
        pokemons: action.payload === "todos" ? state.allPokemons : filtroCreado,
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
      if (action.payload === "az") {
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
      const todosPokemones = state.allPokemons;
      const payload = action.payload
      if (!action.payload.length) {
        console.log("No hay nuevos pokemones cerca...");
        return { ...state };
      }
      console.log(payload);

      const existente = []
      // Recorres ambos arreglos y aplicas la condición que deseas
      payload.filter((d) => {
        todosPokemones.filter((s) => {
          if (d.id === s.id) {
            existente.push(d)
          }
        })
      })
      const nuevosPokemones = payload.filter(d => !existente.includes(d))
      
      console.log(nuevosPokemones);
      if (!nuevosPokemones.length) return { ...state };
      console.log(
        "Se atraparon " + nuevosPokemones.length + " nuevos Pokemons"
      );
      return {
        ...state,
        pokemons: [...state.allPokemons, ...nuevosPokemones],
        allPokemons: [...state.allPokemons, ...nuevosPokemones],
      };

    default:
      return state;
  }
}

export default rootReducer;
