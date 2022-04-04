import React, { useState /* useEffect */ } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearPokemon /* getTipos */ } from "../actions";
import { Link, useNavigate } from "react-router-dom";
import "./Crear.css";
import pokemon from "../img/pokemon.png";

/* function validacion(input) {
let errores = {}
if (!input.name) {
  errores.name = "Se requiere un nombre"
}

return errores
} */

const CrearPokemon = () => {
  /*   const [errores, setErrores] = useState({}) */

  const [input, setInput] = useState({
    name: "",
    vida: 0,
    fuerza: 0,
    defensa: 0,
    velocidad: 0,
    altura: 0,
    peso: 0,
    tipo: [],
    img: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tipo = useSelector((state) => state.tipos);

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    /*     setErrores(validacion({
      ...input, [e.target.name]: e.target.value
    }))*/
  }

  function handleCheck(e) {
    if (input.tipo.includes(e.target.value)) {
      input.tipo = input.tipo.filter((tipo) => tipo !== e.target.value);
      setInput({ ...input, tipo: input.tipo });
    } else {
      setInput({ ...input, tipo: [...input.tipo, e.target.value] });
    }
  }

  console.log(input.tipo);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(crearPokemon(input));
    alert("Pokemon creado");
    setInput({
      name: "",
      vida: 0,
      fuerza: 0,
      defensa: 0,
      velocidad: 0,
      altura: 0,
      peso: 0,
      tipo: [],
    });
    navigate("/home");
  }

  return (
    <div className="all6">
      <div className="imagen6">
        <img src={pokemon} width="250px" alt="img not found" />
      </div>
      <div>
        <Link to={"/home"}>
          <div className="crearPokemon3">
            <button className="volver3">Volver</button>
          </div>
        </Link>
      </div>

      <h1 className="titulos">CREA TU POKEMON</h1>

      <div className="section">
        <div className="article">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="primercolumna">
              <div className="nombrenuevo">
                <label className="labelnombrenuevo5">Nombre</label>
                <div className="inputttt5">
                  <input
                    className="inputname5"
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={input.name}
                    autoCapitalize="none"
                  />
                </div>
              </div>
              {/*           {errores.name && (<p className="error">{errores.name}</p>)} */}

              <div className="nombrenuevo">
                <label className="labelnombrenuevo5">Imagen </label>
                <div className="inputttt5">
                  <input
                    className="inputname5"
                    type="text"
                    name="img"
                    onChange={(e) => handleChange(e)}
                    value={input.img}
                  />
                </div>
              </div>


              <div className="primcolumna">
              <div className="nombrenuevo">
                <label className="labelnombrenuevo">Vida</label>
                <div className="inputttt">
                  <input
                    className="inputname2"
                    type="number"
                    name="vida"
                    onChange={(e) => handleChange(e)}
                    value={input.vida}
                    min="1" 
                    max="100"
                  />
                </div>
              </div>
              <div className="nombrenuevo">
                <label className="labelnombrenuevo">Fuerza</label>
                <div className="inputttt">
                  <input
                    className="inputname2"
                    type="number"
                    name="fuerza"
                    onChange={(e) => handleChange(e)}
                    value={input.fuerza}
                    min="1" 
                    max="150"
                  />
                </div>
              </div>

              <div className="nombrenuevo">
                <label className="labelnombrenuevo">Defensa</label>
                <div className="inputttt">
                  <input
                    className="inputname2"
                    type="number"
                    name="defensa"
                    onChange={(e) => handleChange(e)}
                    value={input.defensa}
                    min="1" 
                    max="150"
                  />
                </div>
                </div>
                </div>

              <div className="segucolumna">
              <div className="nombrenuevo">
                <label className="labelnombrenuevo">Velocidad</label>
                <div className="inputttt">
                  <input
                    className="inputname2"
                    type="number"
                    name="velocidad"
                    onChange={(e) => handleChange(e)}
                    value={input.velocidad}
                    min="1" 
                    max="100"
                  />
                </div>
              </div>

              <div className="nombrenuevo">
                <label className="labelnombrenuevo">Altura</label>
                <div className="inputttt">
                  <input
                    className="inputname2"
                    type="number"
                    name="altura"
                    onChange={(e) => handleChange(e)}
                    value={input.altura}
                    min="1" 
                    max="100"
                  />
                </div>
              </div>

              <div className="nombrenuevo">
                <label className="labelnombrenuevo">Peso</label>
                <div className="inputttt">
                  <input
                    className="inputname2"
                    type="number"
                    name="peso"
                    onChange={(e) => handleChange(e)}
                    value={input.peso}
                    min="1" 
                    max="100"
                  />
                </div>
              </div>
            </div>
            </div>

            <div className="segundacolumna">
              <div className="nombrenuevo">
                {/*VER COMO HACE PARA SELECCIONAR ENTRE TIPOS EXISTENTES Y VARIOS*/}
                <label className="labelnombrenuevotipo">Tipo</label>
                <div className="inputtttcheck"> </div>
                <div className="nombrenuevotipos">
                <div className="nombrenuevotipos2">
                  {tipo.map((tipo) => {
                    return (
                      <div className="tiposss">
                        <div key={tipo.id} className="md-checkbox">
                          <input
                            key={tipo.id}
                            className="checkso"
                            type="checkbox"
                            name="tipo"
                            value={tipo.name}
                            selected={input.tipo.includes(tipo)}
                            onChange={(e) => handleCheck(e)}
                          />

                          <label className="checks"> {tipo.name}</label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              </div>
            </div>
            <button type="submit" className="botoncrear">
              CREAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearPokemon;
