import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons /* , getTipos */ } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Tipo from "./Tipo";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTipos = useSelector((state) => state.tipos);

  // PAGINADO
  const [paginaActual, setPaginaActual] = useState(1);
  const [pokemonsPorPagina, setPokemonsPorPagina] = useState(5);

  const indiceUltimopersonaje = paginaActual * pokemonsPorPagina;
  const firstRecipePage = indiceUltimopersonaje - pokemonsPorPagina;
  const personajesPresentados = allPokemons.slice(firstRecipePage, indiceUltimopersonaje);
  
  const paginado = function(numeroDePagina) {
    setPaginaActual(numeroDePagina)
  };
  
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function borrarFiltros(e) {
    e.prevent.default();
    dispatch(getPokemons())
    setPaginaActual(1)
  }

  return (
    <div>
      <Link to="/pokemons/crear">
        <button>Crear pokemon</button>
      </Link>

      <h1>POKEMON</h1>
      <button onClick={borrarFiltros}>BORRA FILTROS</button>
      <div>
        <select name="creado" /* className={} onChange={} */>
          <option value="todos">Todos</option>
          <option value="api">Existente</option>
          <option value="db">Creado</option>
        </select>
        <select name="orden" /* className={} onChange={} */>
          <option value="asce">A - Z</option>
          <option value="dese">Z - A</option>
          <option value="masfuerte">Mayor fuerza</option>
          <option value="menosfuerte">Menor fuerza</option>
        </select>
        <select name="Tipo"  >
        {allTipos?.map((tipos) => {
            return (
              <Fragment key={tipos.id}>
                <Tipo
                  name={tipos.name}
                />
                ;
              </Fragment>
            );
          })}
        </select>

          <Paginado pokemonsPorPagina={pokemonsPorPagina} allPokemons={allPokemons.length} paginado={paginado}/>


        {personajesPresentados?.map((pokemon) => {
            return (
              <Fragment key={pokemon.id}>
                <Card
                  name={pokemon.name}
                  tipo={pokemon.tipo}
                  imagen={pokemon.img}
                />
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
