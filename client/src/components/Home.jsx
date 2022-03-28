import  React from 'react';
import { /* useState, */ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';

export default function Home () {

  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)

  useEffect (() => {
    dispatch(getPokemons())
  }, [dispatch])

  function handleClick(e){
    e.prevent.default();
    dispatchEvent(getPokemons())
  }

  return (
    <div>
      <Link to='/pokemons'>Crear pokemon</Link>
      <h1>POKEMON</h1>
      <button onClick={handleClick}>BORRA FILTROS</button>
      <div>
        <select name='creado' /* className={} onChange={} */>
          <option value='todos'>Todos</option>
          <option value='api'>Existente</option>
          <option value='db'>Creado</option>
        </select>
        <select name='orden' /* className={} onChange={} */>
          <option value='asce'>A - Z</option>
          <option value='dese'>Z - A</option>
          <option value='masfuerte'>Mayor fuerza</option>
          <option value='menosfuerte'>Menor fuerz</option>
        </select>

    {
      allPokemons && allPokemons.map(pokemon => {
        <Card name={pokemon.name} tipo={pokemon.tipo} imagen={pokemon.imagen}/>
      })
    }

      </div>
    </div>
  )
}
