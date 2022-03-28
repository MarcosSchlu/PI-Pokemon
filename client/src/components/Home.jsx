import React, { Fragment } from "react";
import { /* useState, */ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  /*   function handleClick(e) {
    e.prevent.default();
    dispatchEvent(getPokemons());
  } */

  function borrarFiltros(e) {
    e.prevent.default();
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
        <select name="Tipo" /* className={} onChange={} */>
          <option value="todos">Todos</option>
          <option value="dese">1</option>
          <option value="masfuerte">2</option>
          <option value="menosfuerte">3</option>
        </select>

        {allPokemons &&
          allPokemons.map((pokemon) => {
            return (
              <Fragment key={pokemon.id}>
                <Card
                  name={pokemon.name}
                  tipo={pokemon.tipo}
                  imagen={pokemon.img}
                />
                ;
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
