import styles from "./Paginado.module.css";
import React from "react";

export default function Paginado({ pokemonsPorPagina, allPokemons, paginado }) {
  const cantidadPaginas = [];

  for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPorPagina); i++) {
    cantidadPaginas.push(i+1);
  }
  
  return (
    <nav>
      <ul className={`${styles.pagination}`} >
        {cantidadPaginas?.map((numero) => {
          return (
            <li className={`${styles.pageitem}`} key={numero}>
              <button className="pageBtn" onClick={() => paginado(numero)} style={{width:"30px"}}>{numero}</button>
{/*               <a onClick={() => paginado(numero)} style={{width:"30px"}}>{numero}</a>; */}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
