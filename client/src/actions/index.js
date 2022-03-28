export function getPokemons(){
  return async function(dispatch){
    const response = await fetch('http://localhost:3001/characters')
    const data = await response.json()
    dispatch({
      type: 'GETPOKEMONS',
      payload: data
    })
  }
}

export function crearPokemon(){
  return async function(){

  }
}

export function obtenerTipos(){
  return async function(){

  }
}

