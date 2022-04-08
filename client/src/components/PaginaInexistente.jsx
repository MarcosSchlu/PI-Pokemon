import React from "react";
import "./Detalle.css";
import pokemoncorriendo from "../img/5Q0v.gif";
import pokemon from "../img/pokemon.png";
import { Link } from "react-router-dom";

export default function Detalle() {

  return (
    <div className="all6">
        <div className="imagen7">
        <img src={pokemon} width="250px" alt="img not found" />
      </div>
      <div>
        <Link to={"/home"}>
          <div className="crearPokemon2">
            <button className="volver" >Volver</button>
          </div>
        </Link>
      </div>
        <div>
          <div className="buscando">
            <h1 className="buscando">LA PAGINA NO EXISTE</h1>
          </div>
          <div className="corriendo">
            <img src={pokemoncorriendo} alt="no se enconto la imagen" />
          </div>
        </div>
    </div>
  );
}
