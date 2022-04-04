import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Crear from "./components/Crear"
import Detalle from "./components/Detalle"
import { getTipos, getPokemons } from './actions/index';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTipos());
    console.log("Atrapando pokemons....");
    dispatch(getPokemons());
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} /> 
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/pokemons/crear" element={<Crear />} />
          <Route exact path ="/pokemons/:id" element={<Detalle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
