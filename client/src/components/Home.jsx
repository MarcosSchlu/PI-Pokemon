import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons , filtrarPorTipo , filtrarPorCreado, borrarFiltros/* , getTipos */ } from "../actions";
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
    console.log('Atrapando pokemons....')
    dispatch(getPokemons());
  }, [dispatch]);

  function borrarFiltro() {
    console.log('Borrando filtros....')
    dispatch(borrarFiltros())
  }

  function handleFiltroTipo (e){
    dispatch(filtrarPorTipo(e.target.value))
  }

  function handleFiltroCreado (e){
    dispatch(filtrarPorCreado(e.target.value))
  }

  return (
    <div>
      <Link to="/pokemons/crear">
        <button>Crear pokemon</button>
      </Link>

      <h1>POKEMON</h1>
      <button onClick={borrarFiltro}>BORRA FILTROS</button>
      <div>
        <select name="creado" onChange={e => handleFiltroCreado(e)}>
          <option value="todos">Todos</option>
          <option value="api">Existente</option>
          <option value="creado">Creado</option>
        </select>
        <select name="orden" /* className={} onChange={} */>
          <option value="asce">A - Z</option>
          <option value="dese">Z - A</option>
          <option value="masfuerte">Mayor fuerza</option>
          <option value="menosfuerte">Menor fuerza</option>
        </select>
        <select name="prueba"  onChange={e => handleFiltroTipo(e)}>
          <option value="Todos">Todos</option>
          <option value="flying">flying</option>
          <option value="grass">grass</option>
          <option value="ground">ground</option>
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
