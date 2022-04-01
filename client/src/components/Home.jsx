import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  /* getPokemons ,*/
  filtrarPorTipo,
  filtrarPorCreado,
  borrarFiltros,
  Ordenar,
  getPokemonsDB,
} from "../actions";
import "./Home.css";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import pokemon from "../img/pokemon.png";
/* import apokemon from "../img/1727487.svg"; */
import apokemon from "../img/agregarPoke.png";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const tipo = useSelector((state) => state.tipos);
  const [orden, setOrden] = useState("");

  // PAGINADO
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina, setPokemonsPorPagina] = useState(12);

  const indiceUltimopersonaje = paginaActual * pokemonsPorPagina;
  const firstRecipePage = indiceUltimopersonaje - pokemonsPorPagina;
  const personajesPresentados = allPokemons.slice(
    firstRecipePage,
    indiceUltimopersonaje
  );

  const paginado = function (numeroDePagina) {
    setPaginaActual(numeroDePagina);
  };

  useEffect(() => {
    console.log("Atrapando nuevos pokemons....");
    dispatch(getPokemonsDB());
  }, [dispatch]);

  function borrarFiltro() {
    console.log("Borrando filtros....");
    dispatch(borrarFiltros());
  }

  function handleCantidad(e) {
    e.preventDefault();
    setPokemonsPorPagina(e.target.value);
    setPaginaActual(1);
  }

  function handleFiltroTipo(e) {
    e.preventDefault();
    dispatch(filtrarPorTipo(e.target.value));
    setPaginaActual(1);
  }

  function handleFiltroCreado(e) {
    e.preventDefault();
    dispatch(filtrarPorCreado(e.target.value));
    setPaginaActual(1);
  }

  function handleOrden(e) {
    e.preventDefault();
    dispatch(Ordenar(e.target.value));
    setPaginaActual(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="all5">
      <div className="imagen6">
        <img src={pokemon} width="250px" alt="img not found" />
      </div>

      <Link to="/pokemons/crear">
        <div className="crearPokemon">
          <img src={apokemon} className="iconosumar" alt="img not found" />
        </div>
      </Link>

      <SearchBar />

      <div className="padre">
        <div className="Filtrosva">
          <div className="CantidadPokemons">
            <p>{allPokemons.length} POKEMONS CAPTURADOS</p>
          </div>
        </div>
        <div className="Paginado">
          <Paginado
            pokemonsPorPagina={pokemonsPorPagina}
            allPokemons={allPokemons.length}
            paginado={paginado}
          />
        </div>

        <div className="filaorden1">
          <div className="labelver2"></div>
          <label className="idelabel">ORDENAR</label>
          <select
            defaultValue={"az"}
            name="filtro"
            onChange={(e) => handleOrden(e)}
            className="select-css"
          >
            <option disabled>Nombre</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
            <option disabled>Fuerza</option>
            <option value="masfuerte">Mayor fuerza</option>
            <option value="menosfuerte">Menor fuerza</option>
          </select>
        </div>

        <div className="filaorden2">
          <div className="labelver">
            <label className="idelabel">VER</label>
          </div>
          <select
            name="CANTIDAD"
            defaultValue={"12"}
            onChange={(e) => handleCantidad(e)}
            className="select-css"
          >
            <option className="selectoption" value="6">
              6
            </option>
            <option className="selectoption" value="12">
              12
            </option>
            <option className="selectoption" value="24">
              24
            </option>
            <option className="selectoption" value="41">
              41
            </option>
          </select>
        </div>
      </div>

      <div className="padre2">
        <div className="Filtros">
          <button className="buttonfiltros" onClick={borrarFiltro}>
            BORRA FILTROS
          </button>
          <div>
            <div className="Filtros2">
              <label className="idelabel">FILTRO POR: </label>
              <label className="idelabel">ORIGEN</label>
              <select
                name="creado"
                defaultValue={"todos"}
                className="select-css"
                onChange={(e) => handleFiltroCreado(e)}
              >
                <option value="todos">Todos</option>
                <option value="api">Existente</option>
                <option value="creado">Creado</option>
              </select>
            </div>

            <div className="Filtros2">
              <label className="idelabel">TIPO</label>
              <select
                defaultValue={"todos"}
                name="Tipo"
                onChange={(e) => handleFiltroTipo(e)}
                className="select-css"
              >
                <option value="todos">Todos</option>
                {tipo.map((tipo) => {
                  return (
                    <option value={tipo.name} key={tipo.id}>
                      {tipo.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="cardContainer">
          {personajesPresentados?.map((pokemon) => {
            return (
              <div key={pokemon.id}>
                <Link to={`/pokemons/${pokemon.id}`}>
                  <Card
                    key={pokemon.id}
                    name={pokemon.name}
                    tipo={pokemon.tipo}
                    imagen={pokemon.img}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Paginado2">
        <Paginado
          pokemonsPorPagina={pokemonsPorPagina}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
