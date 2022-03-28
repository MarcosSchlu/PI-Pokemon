import React from "react";

export default function Card ({name, tipo, imagen}) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{tipo}</h5>
      <img src={imagen} alt="no se enconto la imagen" width="200px" height="250px" />
    </div>
  )
}