const initialState = {
  pokemons: [],
  pokemon: [],
  tipos: [],
  filtrostipo: [],
  filtroscreado: [],
  allPokemonsapi: [],
  listaPokemonsdb: [],
  vacio: [],
  allBusqueda: [],
  tiposUsados: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GETALLPOKEMONS":
      if (!action.payload.length) return { ...state };
      let getPokes = action.payload;

      if (!getPokes?.length) return { ...state };
      console.log("Se atraparon " + getPokes.length + " Pokemons");

      let arregloOrdenado2 = getPokes?.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      });

      let tiposusados = [];
      getPokes?.map((pokemons) =>
        pokemons.tipo.map((tipo) => {
          return tiposusados.push(tipo.replace(/\b\w/g, (l) => l.toUpperCase()));
        })
      );

      let unicos = [];
      for (var i = 0; i < tiposusados?.length; i++) {
        const elemento = tiposusados[i];
        if (!unicos.includes(tiposusados[i])) {
          unicos.push(elemento);
        }
      }
      let unicosOrdenado2 = unicos.sort(function (a, b) {
        if (a > b)
          {return 1};
        if (b > a)
          {return -1};
        return 0;
      });

      return {
        ...state,
        allPokemonsapi: [...getPokes],
        pokemons: [...arregloOrdenado2],
        allPokemons: [...arregloOrdenado2],
        tiposUsados: unicosOrdenado2,
      };

    case "ELIMARPOKE":
      return { ...state};
      
    case "GETTIPOS":
      return { ...state, tipos: action.payload };
    case "GETPOKEMONSID":
      return { ...state, pokemon: action.payload };
    case "BORRARPOKEMON":
      return { ...state, pokemon: [] };
    case "BORRARBUSQUEDA":
      return { ...state, allBusqueda: [] };
    case "GETPOKEMONSNAME":
      //OPCION RAPIDA
      const todosPokemons3 = state.allPokemons;
      let pokemonBuscado = todosPokemons3?.filter(
        (pokemons) =>
          pokemons.name.toLowerCase() === action.payload.toLowerCase()
      );
      return {
        ...state,
        pokemons: action.payload === "" ? state.vacio : pokemonBuscado,
      };

    /*       //OPCION LENTA
      return { ...state, pokemons: action.payload }; */

    case "ORDENAR":
      if (!state.allPokemons?.length) return { ...state };
      if (action.payload === "masfuerte") {
        let arregloOrdenado = state.pokemons?.sort(function (a, b) {
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
        let arregloOrdenado = state.pokemons?.sort(function (a, b) {
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
        let arregloOrdenado = state.pokemons?.sort(function (a, b) {
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
        let arregloOrdenado = state.pokemons?.sort(function (a, b) {
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
      if (action.payload === "masfuerte") {
        let arregloOrdenado = state.allPokemons?.sort(function (a, b) {
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
        let arregloOrdenado = state.allPokemons?.sort(function (a, b) {
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
        let arregloOrdenado = state.allPokemons?.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      if (action.payload === "za") {
        let arregloOrdenado = state.allPokemons?.sort(function (a, b) {
          if (a.name > b.name) return -1;
          if (b.name > a.name) return 1;
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      break;
      
    case "CREARPOKEMON":
      return { ...state };

    case "GETPOKEMONSBUSQUEDA":
      if (action.payload.length > 1) {
        const todosPokemons9 = state.allPokemons;
        let pokemonBuscado9 = todosPokemons9?.filter((pokemons) =>
          pokemons.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        return {
          ...state,
          allBusqueda: action.payload === "" ? state.vacio : pokemonBuscado9,
        };
      } 
      return {
        ...state,
        allBusqueda: state.vacio,
      };

    case "ORDENARYFILTRAR":
      if (
        action.payload.creado === "" &&
        action.payload.Tipo === "" &&
        action.payload.orden === ""
      ) {
        return { ...state, pokemons: state.allPokemons };
      } else if (state.allPokemons?.length < 1) {
        return { ...state };
      } else {
        const allPokemons = state.allPokemons;
        var tipofiltro =
          action.payload.Tipo === ""
            ? state.allPokemons
            : allPokemons?.filter((pokemon) =>
                pokemon.tipo?.some(
                  (tipo) =>
                    tipo.toLowerCase() === action.payload.Tipo.toLowerCase()
                )
              );
      }

      let filtroCreado = []
      if (action.payload.creado === "") {
        filtroCreado = tipofiltro;
      } else {
        filtroCreado =
          action.payload.creado === "creado"
            ? tipofiltro?.filter((pokemon) => pokemon.db)
            : tipofiltro?.filter((pokemon) => !pokemon.db);
      }

      let arregloOrdenado = []
      if (action.payload.orden === "masfuerte") {
        arregloOrdenado = filtroCreado?.sort(function (a, b) {
          if (a.fuerza > b.fuerza) return -1;
          if (b.fuerza > a.fuerza) return 1;
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      if (action.payload.orden === "menosfuerte") {
        arregloOrdenado = filtroCreado?.sort(function (a, b) {
          if (a.fuerza > b.fuerza) return 1;
          if (b.fuerza > a.fuerza) return -1;
          return 0;
        });
        return { ...state, pokemons: arregloOrdenado };
      }
      if (action.payload.orden === "") {
        arregloOrdenado = filtroCreado?.sort(function (a, b) {
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
      if (action.payload.orden === "za") {
        arregloOrdenado = filtroCreado?.sort(function (a, b) {
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


      case "GETTIPOSUSADOS":
        const allPokemons = state.pokemons;
        let tiposusados3 = [];
        allPokemons?.map((pokemons) =>
          pokemons.tipo.map((tipo) => {
            return tiposusados3.push(tipo.replace(/\b\w/g, (l) => l.toUpperCase()));
          })
        );
  
        let unicos3 = [];
        for (var i = 0; i < tiposusados3?.length; i++) {
          const elemento = tiposusados3[i];
          if (!unicos3.includes(tiposusados3[i])) {
            unicos3.push(elemento);
          }
        }
        let unicosOrdenado3 = unicos3.sort(function (a, b) {
          if (a > b)
            {return 1};
          if (b > a)
            {return -1};
          return 0;
        });

        return {
          ...state,
          tiposUsados: unicosOrdenado3,
        };



/*       case "GETALLPOKEMONSDB":
        const Pokemonsdb = action.payload;
        const listaPokemonsapi = state.allPokemonsapi;
        const todosdb = Pokemonsdb.concat(listaPokemonsapi);
  
        if (!todosdb?.length) return { ...state };
        console.log("Se atraparon " + todosdb.length + " Pokemons");
  
        let arregloOrdenado3 = todosdb?.sort(function (a, b) {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
  
        return {
          ...state,
          pokemons: [...arregloOrdenado3],
          listaPokemonsdb: [...Pokemonsdb],
          allPokemons: [...arregloOrdenado3],
        }; */


    default:
      return state;
  }
}

export default rootReducer;
