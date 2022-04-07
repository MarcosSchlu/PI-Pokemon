import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/pokemons");
    const data = await response.json();
    dispatch({
      type: "GETALLPOKEMONS",
      payload: data,
    });
  };
}

export function crearPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    return {
      type: "CREARPOKEMON",
      payload: response,
    };
  };
}

export function getTipos() {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/types");
    const data = await response.json();
    const ordenados = await data.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (b.name > a.name) {
        return -1;
      }
      return 0;
    });
    dispatch({
      type: "GETTIPOS",
      payload: ordenados,
    });
  };
}

export function Ordenar(payload) {
  return {
    type: "ORDENAR",
    payload: payload,
  };
}

export function borrarFiltros(payload) {
  return {
    type: "BORRARFILTRO",
    payload: payload,
  };
}

export function getPokemonsPorID(id) {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/pokemons/" + id);
    const data = await response.json();
    dispatch({
      type: "GETPOKEMONSID",
      payload: data,
    });
  };
}

export function borrarPokemon(orden) {
  return {
    type: "BORRARPOKEMON",
    payload: orden,
  };
}

/* //OPCION LENTA
export function getPokemonsPorName(name) {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/pokemons?name=" + name);
    const data = await response.json();
    dispatch({
      type: "GETPOKEMONSNAME",
      payload: data,
    });
  };
} */

//OPCION RAPIDA
export function getPokemonsPorName(name) {
  return async function (dispatch) {
    dispatch({
      type: "GETPOKEMONSNAME",
      payload: name,
    });
  };
}

export function filtrar(filtros) {
  return {
    type: "ORDENARYFILTRAR",
    payload: filtros,
  };
}

export function getPokemonsBusqueda(name) {
  return async function (dispatch) {
    dispatch({
      type: "GETPOKEMONSBUSQUEDA",
      payload: name,
    });
  };
}

export function borrarbusqueda(filtros) {
  return {
    type: "BORRARBUSQUEDA",
  };
}

export function eliminarPokemonDB(id) {
  return async function (dispatch) {
    fetch("http://localhost:3001/clear/" + id, {
      method: 'DELETE',
    })
    dispatch({
      type: "ELIMARPOKE"
    });
  };
}