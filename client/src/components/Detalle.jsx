/* import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonsPorID } from "../actions";
import './Detalle.css';

export default function Detalle(props) {

  const dispatch = useDispatch();
  const Pokemon = useSelector((state) => state.pokemon);



  useEffect(() => {
    console.log("Buscando pokemon....");
    dispatch(getPokemonsPorID(id));
  }, [dispatch, id]);

  return (
    <div >

    </div>
  );
}
 */