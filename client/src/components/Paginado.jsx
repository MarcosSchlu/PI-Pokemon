import styles from "./Paginado.module.css";
import React from "react";

export default function Paginado({ pokemonsPorPagina, allPokemons, paginado }) {
  const cantidadPaginas = [];

  for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPorPagina)-1; i++) {
    cantidadPaginas.push(i);
  }
  
  return (
    <nav>
      <ul className={`${styles.pagination}`} >
        {cantidadPaginas?.map((numero) => {
          return (
            <li className={`${styles.pageitem}`} key={numero}>
              <button className="pageBtn" onClick={() => paginado(numero+1)} style={{width:"30px"}}>{numero+1}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
