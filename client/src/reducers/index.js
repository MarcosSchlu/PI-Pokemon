// MARCOS CREO EL INITIAL STATE

const initialState = {
  pokemons: [],
  allPokemons: [],
  pokemon: [],
  tipos: []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'GETPOKEMONS':
      return { ...state, pokemons: action.payload, allPokemons: action.payload }
    case 'GETTIPOS':
      return { ...state, tipos: action.payload }
      
    case 'FILTROPORTIPO':
        const allPokemons = state.allPokemons
        const tipofiltro = action.payload === 'Todos' ? state.allPokemons : allPokemons.filter(pokemon => pokemon.tipo?.some((tipo) => tipo.toLowerCase() === action.payload.toLowerCase()))
        return { ...state, pokemons: tipofiltro }

    case 'FILTROPORCREADO':
      const todosPokemons = state.allPokemons
      const filtroCreado = action.payload === 'creado' ? todosPokemons.filter(pokemon => pokemon.db) : todosPokemons.filter(pokemon => !pokemon.db)
      console.log(action.payload)
      console.log(filtroCreado)
      return { ...state, pokemons: action.payload === 'todos' ? state.allPokemons : filtroCreado }

      case 'BORRARFILTRO':
        return { ...state, pokemons: state.allPokemons }

    default:
      return state
  }
}

export default rootReducer;