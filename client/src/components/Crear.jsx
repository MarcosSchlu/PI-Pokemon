import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearPokemon, obtenerTipos } from "../actions";

const CrearPokemon = () => {

  const [input, setInput] = useState({ name:"", vida:0, fuerza:0, defensa:0, velocidad:0, altura:0, peso:0, tipo:"" });

  const dispatch = useDispatch()

  const state = useSelector((state) => state);

  useEffect(() => {
    if (!state.tipos.length) {
      dispatch(obtenerTipos());
    }
  }, [state.tipos, dispatch]);


  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(crearPokemon(input));
  }

  return (
    <div>
      <h1>Crea tu Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre: </label>
        <input type="text" name="name" onChange={handleChange} value="input.name" />
        <label>Vida: </label>
        <input type="number" name="vida" onChange={handleChange} value="input.vida"/>
        <label>Fuerza: </label>
        <input type="number" name="fuerza" onChange={handleChange} value="input.fuerza"/>
        <label>Defensa: </label>
        <input type="number" name="defensa" onChange={handleChange} value="input.defensa"/>
        <label>Velocidad: </label>
        <input type="number" name="velocidad" onChange={handleChange} value="input.velocidad"/>
        <label>Altura: </label>
        <input type="number" name="altura" onChange={handleChange} value="input.altura"/>
        <label>Peso: </label>
        <input type="number" name="peso" onChange={handleChange} value="input.peso"/>

        // VER COMO HACE PARA SELECCIONAR ENTRE TIPOS EXISTENTES Y VARIOS
        <label>Tipo: </label>
        <input name="tipo" onChange={handleChange} value="input.tipo"/>


        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CrearPokemon