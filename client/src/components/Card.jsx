import React from "react";
import "./Card.css";

let prevId = 1;

export default function Card({ name, tipo, imagen, fuerza }) {
    return (
          <div className="cardWrapper">
            <h3 className="card-title">{name}</h3>
            <img
              src={imagen}
              alt="no se enconto la imagen"
              width="150px"
              height="150px"
            />
            <div className="tipos">
              {tipo?.map((pokemon) => {
                return (
                  <div key={prevId++}>
                  <h5 className="cardtype" >
                    {pokemon}
                  </h5>
                  </div>
                );
              })}
{/*               <h5 className="cardtype">{fuerza}</h5> */}
            </div>
          </div>
    );

}
