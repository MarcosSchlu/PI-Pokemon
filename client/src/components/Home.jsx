import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filtrarPorTipo,
  filtrarPorCreado,
  borrarFiltros,
  Ordenar,
} from "../actions";
import "./Home.css";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const tipo = useSelector((state) => state.tipos);
  const [ orden, setOrden] = useState("");

  // PAGINADO
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina, setPokemonsPorPagina] = useState(6);

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
    console.log("Atrapando pokemons....");
    dispatch(getPokemons());
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
    <div>
      <Link to="/pokemons/crear">
        <button>Crear pokemon</button>
      </Link>

      <h1>POKEMON</h1>
      <button onClick={borrarFiltro}>BORRA FILTROS</button>
      <div>
        <label>FILTRO POR: </label>
        <label>ORIGEN</label>
        <select name="creado" onChange={(e) => handleFiltroCreado(e)}>
          <option value="todos">Todos</option>
          <option value="api">Existente</option>
          <option value="creado">Creado</option>
        </select>

        <label>TIPO</label>
        <select
          defaultValue={"todos"}
          name="Tipo"
          onChange={(e) => handleFiltroTipo(e)}
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

        <label>ORDENAR POR: </label>
        <label>NOMBRE</label>
        <select
          defaultValue={"az"}
          name="filtro"
          onChange={(e) => handleOrden(e)}
        >
          <option disabled>Nombre</option>
          <option value="az">
            A - Z
          </option>
          <option value="za">
            Z - A
          </option>
          <option disabled>
            Fuerza
          </option>
          <option value="masfuerte">
            Mayor fuerza
          </option>
          <option value="menosfuerte">
            Menor fuerza
          </option>
        </select>

        <label>VER: </label>
        <select name="CANTIDAD" onChange={(e) => handleCantidad(e)}>
          <option value="6">
            6
          </option>
          <option  value="12">
            12
          </option>
          <option value="24">
            24
          </option>
        </select>

        <Paginado
          pokemonsPorPagina={pokemonsPorPagina}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />

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

        <Paginado
          pokemonsPorPagina={pokemonsPorPagina}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
