import React , { useState, /* useEffect */ } from "react";
import { useSelector, useDispatch } from "react-redux";
import { crearPokemon, /* getTipos */ } from "../actions";
import { Link, useNavigate } from "react-router-dom";
import "./Crear.css";

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
    img:"",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const tipo = useSelector((state) => state.tipos);

/*   useEffect(() => {
    dispatch(getTipos());
  }, [dispatch]); */

  function handleChange(e) {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
/*     setErrores(validacion({
      ...input, [e.target.name]: e.target.value
    }))*/
  }


  function handleCheck(e) {
    e.preventDefault();
    if (input.tipo.includes(e.target.value)) {
        input.tipo = input.tipo.filter(tipo => tipo !== e.target.value)
        setInput({ ...input, tipo: input.tipo });
    } else {
      setInput({ ...input, tipo: [...input.tipo, e.target.value] });
    }
  }
  console.log(input.tipo)

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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-control">
            <label className="label">Nombre: </label>
            <input
              type="text"
              name="name"
              onChange={(e) => handleChange(e)}
              value={input.name}
              autoCapitalize="none"
            />
          </div>
{/*           {errores.name && (<p className="error">{errores.name}</p>)} */}

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
                    onChange={(e) => handleCheck(e)}
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
              onChange={(e) => handleChange(e)}
              value={input.img}
            />
          </div>

          <div className="form-control">
            <label className="label">Vida: </label>
            <input
              type="number"
              name="vida"
              onChange={(e) => handleChange(e)}
              value={input.vida}
            />
          </div>
          <div className="form-control">
            <label className="label">Fuerza: </label>
            <input
              type="number"
              name="fuerza"
              onChange={(e) => handleChange(e)}
              value={input.fuerza}
            />
          </div>
          <div className="form-control">
            <label className="label">Defensa: </label>
            <input
              type="number"
              name="defensa"
              onChange={(e) => handleChange(e)}
              value={input.defensa}
            />
          </div>
          <div className="form-control">
            <label className="label">Velocidad: </label>
            <input
              type="number"
              name="velocidad"
              onChange={(e) => handleChange(e)}
              value={input.velocidad}
            />
          </div>
          <div className="form-control">
            <label className="label">Altura: </label>
            <input
              type="number"
              name="altura"
              onChange={(e) => handleChange(e)}
              value={input.altura}
            />
          </div>
          <div className="form-control">
            <label className="label">Peso: </label>
            <input
              type="number"
              name="peso"
              onChange={(e) => handleChange(e)}
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
