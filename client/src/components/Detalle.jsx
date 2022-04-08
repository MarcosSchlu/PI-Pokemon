import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsPorID, eliminarPokemonDB, getPokemons, getTiposUsados } from "../actions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { borrarPokemon } from "../actions";
import "./Detalle.css";
import pokemon from "../img/pokemon.png";
import pokemoncorriendo from "../img/5Q0v.gif";
import fuerza from "../img/strenght.svg";
import corazon from "../img/fight-svgrepo-com.svg";
import escudo from "../img/defense-shield-svgrepo-com.svg";
import velocidad from "../img/running-speed-svgrepo-com.svg";
import altura from "../img/height-svgrepo-com.svg";
import peso from "../img/weight-svgrepo-com.svg";

let prevId = 1;

export default function Detalle() {
  const dispatch = useDispatch();
  const Pokemon = useSelector((state) => state.pokemon);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    console.log("Invocando pokemon....");
    dispatch(getPokemonsPorID(id));
  }, [dispatch, id]);

  function handleSubmit() {
    dispatch(borrarPokemon());
  }

  function handleEliminar(e, id) {
    e.preventDefault();
    dispatch(eliminarPokemonDB(id));
    dispatch(getPokemons());
    dispatch(getTiposUsados());
    alert("Pokemon elimado de la base de datos");
    navigate("/home");
  }

  return (
    <div className="all6">
      <div className="imagen7">
        <img src={pokemon} width="250px" alt="img not found" />
      </div>
      <div>
        <Link to={"/home"}>
          <div className="crearPokemon2">
            <button className="volver" onClick={handleSubmit}>
              Volver
            </button>
          </div>
        </Link>
      </div>
      {Pokemon.length > 0 ? (
        <div className="cardpoke" key={Pokemon[0].id}>
          <div className="imagenpoke">
            <div className="circulopoke"></div>
            <img
              className="imagenpokemon"
              src={Pokemon[0].img}
              alt="no se enconto la imagen"
              width="300px"
              height="300px"
            />
          </div>

          <div className="infopoke">
            <div className="titulo2">
              <h3 className="nombre2">{Pokemon[0].name}</h3>
              <div className="subrayao2"></div>
            </div>

            <div className="Propiedades">
              <div className="Propiedades1">
                <div className="Propiedad">
                  <h3 className="propiedadtitle">TIPO</h3>
                  <div className="tipos22">
                    {Pokemon[0].tipo?.map((pokemon) => {
                      return (
                        <div className="perri" key={prevId++}>
                          <h4 className="propiedaddesc">{pokemon}</h4>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="Propiedad">
                  <h3 className="propiedadtitle">FUERZA</h3>
                  <h4 className="propiedaddesc">{Pokemon[0].fuerza}</h4>
                  <img
                    className="icon"
                    src={fuerza}
                    width="20px"
                    alt="img not found"
                  />
                </div>

                <div className="Propiedad">
                  <h3 className="propiedadtitle">VIDA</h3>
                  <h4 className="propiedaddesc">{Pokemon[0].vida}</h4>
                  <img
                    className="icon"
                    src={corazon}
                    width="20px"
                    alt="img not found"
                  />
                </div>
              </div>

              <div className="Propiedades2">
                <div className="Propiedad">
                  <h3 className="propiedadtitle">DEFENSA</h3>
                  <h4 className="propiedaddesc">{Pokemon[0].defensa}</h4>
                  <img
                    className="icon"
                    src={escudo}
                    width="20px"
                    alt="img not found"
                  />
                </div>

                <div className="Propiedad">
                  <h3 className="propiedadtitle">VELOCIDAD</h3>
                  <h4 className="propiedaddesc">{Pokemon[0].velocidad}</h4>
                  <img
                    className="icon"
                    src={velocidad}
                    width="20px"
                    alt="img not found"
                  />
                </div>

                <div className="Propiedad">
                  <h3 className="propiedadtitle">ALTURA</h3>
                  <h4 className="propiedaddesc">{Pokemon[0].altura}</h4>
                  <img
                    className="icon"
                    src={altura}
                    width="20px"
                    alt="img not found"
                  />
                </div>

                <div className="Propiedad">
                  <h3 className="propiedadtitle">PESO</h3>
                  <h4 className="propiedaddesc">{Pokemon[0].peso}</h4>
                  <img
                    className="icon"
                    src={peso}
                    width="20px"
                    alt="img not found"
                  />
                </div>

                {Pokemon.map((Pokemon) => {
                    return (
                      <div key={Pokemon}>
                        { Pokemon.db === true ? 
                        (<button type="submit" className="botonbotoneliminar" onClick={(e) => handleEliminar(e , Pokemon.id)}>
                          ELIMINAR
                        </button>)
                        :(<div></div>)}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="buscando">
            <h1 className="buscando">Estamos invocando el pokemon.... </h1>
          </div>
          <div className="corriendo">
            <img src={pokemoncorriendo} alt="no se enconto la imagen" />
          </div>
        </div>
      )}
    </div>
  );
}
