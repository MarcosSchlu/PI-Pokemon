import React from "react";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import lupa from '../img/lupa.svg'
import { getPokemonsPorName } from "../actions";
import { useDispatch } from 'react-redux';


export default function NavBar() {
  const [name, setName] = useState("")
  const dispatch = useDispatch()

  function handleChange(e) {
    e.preventDefault()
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Buscando a " + name)
    dispatch(getPokemonsPorName(name));
  }

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.inputSpace}`}>
        <form>
          <input className={`${styles.inputSeach}`} autoComplete="off" type="text" name="busqueda" id="busqueda" placeholder="Buscar" onChange={handleChange}/>
        </form>
          <img type="button" className={`${styles.lupa}`} src={lupa} alt='img not found' onClick={handleSubmit}/>
      </div>
    </div>
  )

}

