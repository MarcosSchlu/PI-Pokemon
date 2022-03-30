import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsPorID } from "../actions";
import { Link , useParams } from "react-router-dom";
import { borrarPokemon } from "../actions";
import "./Detalle.css";

let prevId = 1;

export default function Detalle() {
  const dispatch = useDispatch();
  const Pokemon = useSelector((state) => state.pokemon);

  const {id} = useParams()

  useEffect(() => {
    console.log("Buscando pokemon....");
    dispatch(getPokemonsPorID(id));
  }, [dispatch]);

  function handleSubmit() {
    dispatch(borrarPokemon());
  }


  return (
    <div>
      <div>
        <Link to={"/home"}>
          <button onClick={handleSubmit}>Volver</button>
        </Link>
      </div>
      {Pokemon.length > 0 ? (
        <div className="cardWrapper" key={Pokemon[0].id}>
          <h3 className="card-title">{Pokemon[0].name}</h3>
          <img
            src={Pokemon[0].img}
            alt="no se enconto la imagen"
            width="150px"
            height="150px"
          />
          <div className="tipos">
            {Pokemon[0].tipo?.map((pokemon) => {
              return (
                <div key={prevId++}>
                  <h5 className="cardtype">{pokemon}</h5>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <h1>Estamos atrapando el pokemon.... </h1>
        </div>
      )}
    </div>
  );
}
