import React from "react";
import styles from "./NavBar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import lupa from '../img/lupa.svg'
import pokebola from '../img/pokebola.png'
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
      <div>
        <Link to={'/home'}><img className={`${styles.pokebola}`} src={pokebola} alt='img not found'/></Link>
      </div>
      <div className={`${styles.inputSpace}`}>
        <form>
          <input className={`${styles.inputSeach}`} type="text" name="busqueda" id="busqueda" placeholder="Buscar" onChange={handleChange}/>
        </form>
          <img type="button" className={lupa} src={lupa} alt='img not found' onClick={handleSubmit}/>
      </div>
    </div>
  )

}