import { useState } from "react";
import { Link } from "react-router-dom";
import lupa from '../img/lupa.svg'
import pokebola from '../img/pokebola.png'

export default function NavBar() {
  const [input, setInput] = useState({ busqueda: ""})

  function handleChange(e) {
    setInput({ ...input, name: e.target.value });
  }

  return (
    <div>
      <div>
        <Link to={'/pokemons/'}><img className={pokebola} src={pokebola} alt='img not found'/></Link>
      </div>
      <div>
        <form>
          <input type="text" name="busqueda" id="busqueda" onChange={handleChange}/>
        </form>
          <Link to={'/pokemons/' + input.busqueda}><img className={lupa} src={lupa} alt='img not found'/></Link>
      </div>
    </div>
  )

}