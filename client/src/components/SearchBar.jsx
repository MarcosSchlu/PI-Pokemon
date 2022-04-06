import React from "react";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import lupa from "../img/lupa.svg";
import cruz from "../img/cancel-svgrepo-com.svg";
import {
  getPokemonsPorName,
  getPokemonsBusqueda,
  borrarbusqueda,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const allBusqueda = useSelector((state) => state.allBusqueda);

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getPokemonsBusqueda(e.target.value));
  }

  function handleBorrar(e) {
    e.preventDefault();
    setName("");
    dispatch(borrarbusqueda());
    e.target.reset();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("No se ingreso ningun nombre a buscar");
    } else {
      console.log("Buscando a " + name);
      dispatch(getPokemonsPorName(name));
      dispatch(borrarbusqueda());
      setName("");
      e.target.reset();
    }
  }

  function handleSubmitOptions(e) {
    e.preventDefault();
    console.log("Buscando a " + e.target.value);
    dispatch(getPokemonsPorName(e.target.value));
    dispatch(borrarbusqueda());
    setName("");
  }

  return (
    <div className={`${styles.header}`}>
      <div className={`${styles.inputSpace}`}>
        <form onSubmit={handleSubmit}>
          <input
            className={`${styles.inputSeach}`}
            autoComplete="off"
            type="text"
            name="busqueda"
            id="busqueda"
            placeholder="Buscar"
            onChange={handleChange}
            value={name}
          />
        </form>
        <img
          type="button"
          className={`${styles.lupa}`}
          src={lupa}
          alt="img not found"
          onSubmit={handleSubmit}
        />
          <img
          type="button"
          className={`${styles.cruz}`}
          src={cruz}
          alt="img not found"
          onClick={handleBorrar}
        />
      </div>
      <div className={`${styles.resu}`}>
        {allBusqueda?.length > 0 ? (
          allBusqueda?.map((pokemon) => {
            return (
              <div key={pokemon.name} className={`${styles.inputSpace2}`}>
                <option
                  className={`${styles.inputSeach2}`}
                  onClick={handleSubmitOptions}
                  value={pokemon.name}
                >
                  {pokemon.name}
                </option>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
