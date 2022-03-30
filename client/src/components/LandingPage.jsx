import  React from 'react';
import {Link} from 'react-router-dom'
import pokemon from '../img/pokemon.png'

export default function landingPage () {
  return (
    <div>
      <img src={pokemon} width="300px"  alt='img not found'/>
      <Link to='/home'>
        <button>Ingresar</button>
      </Link>
    </div>
  )
}
