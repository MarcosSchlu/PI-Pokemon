// MARCOS CREO EL INITIAL STATE

const initialState = {
  pokemons: [],
  pokemon: [],
  tipos: []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'GETPOKEMONS':
      return { ...state, pokemons: action.payload }
    case 'GETTIPOS':
      return { ...state, tipos: action.payload }

    default:
      return state
  }
}

export default rootReducer;