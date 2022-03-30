import React , { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearPokemon, getTipos } from "../actions";
import { Link, useNavigate } from "react-router-dom";
import "./Crear.css";

/* function validacion(input) {} */

const CrearPokemon = () => {

  const [input, setInput] = useState({
    name: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const tipo = useSelector((state) => state.tipos);

  useEffect(() => {
    dispatch(getTipos());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  function handleCheck(e) {
    e.preventDefault();
    if (e.target.checked) {
      setInput({ ...input, tipo: [...input.tipo, e.target.value] });
      console.log(input)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(crearPokemon(input));
    alert("Pokemon creado")
    setInput({
    name: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [],
    })
    navigate('/home')
  }

  return (
    <div>
        <div>
        <Link to={'/home'}><button>Volver</button></Link>
      </div>
    <div className="section">
      <div className="article">
        <h1 className="titulo">CREA TU POKEMON</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">Nombre: </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={input.name}
              autoCapitalize="none"
            />
          </div>

          <div className="form-control">
            {/*VER COMO HACE PARA SELECCIONAR ENTRE TIPOS EXISTENTES Y VARIOS*/}
            <label className="label">Tipo: </label>
            {tipo.map((tipo) => {
              return (
                <div key={tipo.id} className="checks">
                  <label className="tipo">
                    {tipo.name}
                  </label>
                  <input
                    key={tipo.id}
                    className="checks"
                    type="checkbox"
                    name="tipo"
                    value={tipo.name}
                    selected={input.tipo.includes(tipo)}
                    onChange={handleCheck}
                  />
                </div>
              );
            })}
          </div>

          <div className="form-control">
            <label className="label">Imagen: </label>
            <input
              type="text"
              name="img"
              onChange={handleChange}
              value={input.img}
            />
          </div>

          <div className="form-control">
            <label className="label">Vida: </label>
            <input
              type="number"
              name="vida"
              onChange={handleChange}
              value={input.vida}
            />
          </div>
          <div className="form-control">
            <label className="label">Fuerza: </label>
            <input
              type="number"
              name="fuerza"
              onChange={handleChange}
              value={input.fuerza}
            />
          </div>
          <div className="form-control">
            <label className="label">Defensa: </label>
            <input
              type="number"
              name="defensa"
              onChange={handleChange}
              value={input.defensa}
            />
          </div>
          <div className="form-control">
            <label className="label">Velocidad: </label>
            <input
              type="number"
              name="velocidad"
              onChange={handleChange}
              value={input.velocidad}
            />
          </div>
          <div className="form-control">
            <label className="label">Altura: </label>
            <input
              type="number"
              name="altura"
              onChange={handleChange}
              value={input.altura}
            />
          </div>
          <div className="form-control">
            <label className="label">Peso: </label>
            <input
              type="number"
              name="peso"
              onChange={handleChange}
              value={input.peso}
            />
          </div>

          <button type="submit" className="btn">
            CREAR
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CrearPokemon;
