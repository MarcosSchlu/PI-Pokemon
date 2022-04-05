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

export function filtrarPorTipo(payload) {
  console.log(payload)
  return {
    type: "FILTROPORTIPO",
    payload: payload,
  };
}

export function filtrarPorCreado(payload) {
  return {
    type: "FILTROPORCREADO",
    payload,
  };
}

export function Ordenar(payload) {
  return {
    type: "ORDENAR",
    payload,
  };
}

export function borrarFiltros() {
  return {
    type: "BORRARFILTRO",
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

export function borrarPokemon() {
  return {
    type: "BORRARPOKEMON",
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

/* export function getPokemonsBusqueda(name) {
  return async function (dispatch) {
    dispatch({
      type: "GETPOKEMONSNAMEBUSQUEDA",
      payload: name,
    });
  };
} */

export function getPokemonsDB() {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/pokemonesdb");
    const data = await response.json();
    dispatch({
      type: "GETALLPOKEMONSDB",
      payload: data,
    });
  };
}
