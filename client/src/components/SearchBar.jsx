import React from "react";
import styles from "./SearchBar.module.css";
import { useState } from "react";
import lupa from "../img/lupa.svg";
import { getPokemonsPorName, /* getPokemonsBusqueda */ } from "../actions";
import { useDispatch, useSelector } from "react-redux";

export default function NavBar() {
  const allBusqueda = useSelector((state) => state.busqueda);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
/*     dispatch(getPokemonsBusqueda(e.target.value)); */
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Buscando a " + name);
    dispatch(getPokemonsPorName(name));
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
        {allBusqueda?.map((busqueda) => {
          return (
            <div className={`${styles.header2}`} key={allBusqueda.id}>
              <div className={`${styles.inputSpace2}`}>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
