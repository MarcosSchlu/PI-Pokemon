export function getPokemons() {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/pokemons");
    const data = await response.json();
    dispatch({
      type: "GETPOKEMONS",
      payload: data,
    });
  };
}

export function crearPokemon() {
  return async function () {};
}

export function getTipos() {
  return async function () {
/*     const response = await fetch("http://localhost:3001/types");
    const data = await response.json();
    dispatch({
      type: "GETTIPOS",
      payload: data,
    }); */
  };
}
