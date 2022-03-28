// MARCOS CREO EL INITIAL STATE

const initialState = {
  pokemons: [],
  pokemon: []
}

function rootReducer (state = initialState, action) {
  switch (action.type) {
    case 'GETPOKEMONS':
      return { ...state, pokemons: action.payload }
    default:
      return state
  }
}

export default rootReducer;