import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NavBar from "./components/NavBar"
import Crear from "./components/Crear"
import Detalle from "./components/Detalle"
import Footer from "./components/Footer"
import { getTipos } from './actions/index';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTipos());
  });

  return (
    <BrowserRouter>
      <div className="App">
          <NavBar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} /> 
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/pokemons/crear" element={<Crear />} />
          <Route exact path ="/pokemons/:id" element={<Detalle />} />
        </Routes>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
