import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import NavBar from "./components/NavBar"
import Crear from "./components/Crear"
import Detalle from "./components/Detalle"
import Footer from "./components/Footer"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/" element={<NavBar/>} />
          <Route path="/home" element={<Home/>} />
          <Route exact path="/pokemons/crear" element={<Crear/>} />
          <Route exact path="/pokemons/:name" element={<Detalle/>} />
          <Route path="/" element={<Footer/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
