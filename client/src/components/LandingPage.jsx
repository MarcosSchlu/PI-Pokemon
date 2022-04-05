import React from "react";
import { Link } from "react-router-dom";
import pokemon from "../img/pokemon.png";
import henry from "../img/logo-white.png";
import pokemones from "../img/71cdbfdb4f250bbf45a58000dc52eb82bf036be0r1-200-178_hq.gif";
import foto from "../img/foto.jpeg";
import github from "../img/25231.png";
import "./LandingPage.css";

export default function landingPage() {
  return (
    <div>
      <div className="all">
        <div className="header">
          <div className="headerposition">
            <a href="https://www.soyhenry.com/">
              <div className="Logo">
                <img src={henry} width="127px" alt="img not found" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="principal">
        <div className="principal2">
          <div className="principal3">
            <div className="proyecto">
              <div className="imagen">
                <img src={pokemon} width="250px" alt="img not found" />
              </div>
              <div className="tituloproyecto">
                <span className="titproyecto">
                  <span className="spaproyecto">Proyecto Individual</span>
                </span>
                <h1 className="titulopincipal">Objetivos del Proyecto</h1>
                <p className="titdescription">
                  Construir una App utlizando React, Redux, Node y Sequelize.
                </p>
                <p className="titdescription">
                  Afirmar y conectar los conceptos aprendidos en la carrera.
                </p>
                <p className="titdescription">Aprender mejores prácticas.</p>
                <p className="titdescription">
                  Aprender y practicar el workflow de GIT.
                </p>
                <p className="titdescription">Usar y practicar testing.</p>
                <div className="botonera">
                  <Link to="/home">
                    <button className="botonprincipal">
                      <span className="spanbotonprincipal">
                        <div className="divbotonprincipla">
                          <p className="Ingresar">INGRESAR</p>
                        </div>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="marcos">

              <div className="ubi">
                <div className="nombre">
                  <p className="nomnrenombrelanding">Marcos Schlusselblum</p>
                  <div className="nomnrenombre2"></div>
                </div>
                <div className="weee">
                  <img src={foto} className="imagenmarcos" alt='img not found'></img>
                  <img src={pokemones} alt="no se enconto la imagen" className="desc" />
                </div>
                <div className="redes">
                  <a href="https://github.com/MarcosSchlu">
                    <img src={github} className="Logo2" alt="img not found" />
                    <p className="Logo23">MarcosSchlu</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<div className="fondos"></div>
    </div>
  );
}
