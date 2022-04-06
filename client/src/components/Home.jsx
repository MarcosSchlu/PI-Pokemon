import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { borrarFiltros, Ordenar, getPokemonsDB, filtrar } from "../actions";
import "./Home.css";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import pokemon from "../img/pokemon.png";
import apokemon from "../img/agregarPoke.png";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const tipo = useSelector((state) => state.tipos);
  const [filtros, setFiltros] = useState({
    creado: "",
    Tipo: "",
    orden: "",
  });

  // PAGINADO
  let [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina, setPokemonsPorPagina] = useState(12);

  const indiceUltimopersonaje = paginaActual * pokemonsPorPagina;
  const firstRecipePage = indiceUltimopersonaje - pokemonsPorPagina;
  const personajesPresentados = allPokemons?.slice(
    firstRecipePage,
    indiceUltimopersonaje
  );

  const paginado = function (numeroDePagina) {
    setPaginaActual(numeroDePagina);
  };

  useEffect(() => {
    console.log("Atrapando pokemons nuevos....");
    dispatch(getPokemonsDB());
  }, [dispatch]);

  function borrarFiltro(e) {
    e.preventDefault();
    console.log("Borrando filtros....");
    dispatch(borrarFiltros(filtros.orden));
    setFiltros((prevFiltros) => {
      const newFiltros = { ...prevFiltros, creado: "", Tipo: "" };
      setPaginaActual(1);
      return newFiltros;
    });
  }

  function handleCantidad(e) {
    e.preventDefault();
    setPokemonsPorPagina(e.target.value);
    setPaginaActual(1);
  }

  function handleFiltros(e) {
    e.preventDefault();
    setFiltros((prevFiltros) => {
      const newFiltros = { ...prevFiltros, [e.target.name]: e.target.value };
      dispatch(filtrar(newFiltros));
      setPaginaActual(1);
      return newFiltros;
    });
  }

  function handleOrden(e) {
    e.preventDefault();
    setFiltros({ ...filtros, orden: e.target.value });
    dispatch(Ordenar(e.target.value));
    setPaginaActual(1);
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
            { allPokemons?.length ? 
            <p>{allPokemons?.length} POKEMONS CAPTURADOS</p> :
            <p></p>
            }

            
          </div>
        </div>
        <div className="Paginado">
          <Paginado
            pokemonsPorPagina={pokemonsPorPagina}
            allPokemons={allPokemons?.length}
            paginado={paginado}
          />
        </div>

        <div className="filaorden1">
          <div className="labelver2"></div>
          <label className="idelabel">ORDENAR</label>
          <select
            name="orden"
            onChange={(e) => handleOrden(e)}
            className="select-css"
            value={filtros.orden}
          >
            <option disabled>Nombre</option>
            <option value="">A - Z</option>
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
            <option className="selectoption" value="12">
              12
            </option>
            <option className="selectoption" value="24">
              24
            </option>
            <option className="selectoption" value="48">
              48
            </option>
          </select>
        </div>
      </div>

      <div className="padre2">
        <div className="Filtros">
          <div className="padre3">
            <div className="Filtros1">
              <button
                className="buttonfiltros"
                onClick={(e) => borrarFiltro(e)}
              >
                BORRA FILTROS
              </button>
            </div>

            <div className="Filtrostit">
              <label className="idelabel">FILTRO POR: </label>
            </div>
            <div className="Filtros2">
              <div className="ordenlabels">
                <label className="idelabel">ORIGEN</label>
              </div>
              <select
                name="creado"
                className="select-css"
                onChange={(e) => handleFiltros(e)}
                value={filtros.creado}
              >
                <option value="">Todos</option>
                <option value="api">Existente</option>
                <option value="creado">Creado</option>
              </select>
            </div>

            <div className="Filtros3">
              <div className="ordenlabels">
                <label className="idelabel">TIPO</label>
              </div>
              <select
                name="Tipo"
                onChange={(e) => handleFiltros(e)}
                className="select-css"
                value={filtros.Tipo}
              >
                <option value="">Todos</option>
                {tipo?.map((tipo) => {
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
          {personajesPresentados?.length > 0 ? (
            personajesPresentados?.map((pokemon) => {
              return (
                <div key={pokemon.id}>
                  <Link
                    to={`/pokemons/${pokemon.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      key={pokemon.id}
                      name={pokemon.name}
                      tipo={pokemon.tipo}
                      imagen={pokemon.img}
                      fuerza={pokemon.fuerza}
                    />
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="buscando2">
              <h1 className="buscando2">No se encontraron pokemons</h1>
            </div>
          )}
        </div>

          {allPokemons?.length < 2 ? (
            allPokemons?.map((pokemon) => {
              return (
                <div className="cardContainer9">
                <div key={pokemon.id}>
                  <Link
                    to={`/pokemons/${pokemon.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      key={pokemon.id}
                      name={pokemon.name}
                      tipo={pokemon.tipo}
                      imagen={pokemon.img}
                      fuerza={pokemon.fuerza}
                    />
                  </Link>
                </div>
            </div>
              );
            })
          ) : (
            <div className="buscandop">
            </div>
          )}


      </div>
      <div className="Paginado2">
        <Paginado
          pokemonsPorPagina={pokemonsPorPagina}
          allPokemons={allPokemons?.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
