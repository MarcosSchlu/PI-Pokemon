import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Crear from "./components/Crear";
import Detalle from "./components/Detalle";
import PaginaInexistente from "./components/PaginaInexistente";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/pokemons/crear" element={<Crear />} />
          <Route exact path="/pokemons/:id" element={<Detalle />} />
          <Route path="*" element={<PaginaInexistente />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
