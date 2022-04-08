import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import * as data from "./db.json";
import App from "../App";
import Crear from '../components/Crear'
import Detalle from '../components/Detalle';
import Home from '../components/Home';

configure({ adapter: new Adapter() });

describe("<App />", () => {
  let store;
  const routes = ["/", "/home", "/pokemons/crear", "/pokemons/:id"];
  const mockStore = configureStore([thunk]);
  beforeEach(() => {
    store = mockStore(state);
  });

  const state = {
    pokemons: data.pokemons,
    pokemon: data.pokemons[0],
  };

  const componentToUse = (route) => {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  it('El componente "HOME" se debería renderizar solamente en la ruta "/"', () => {
    const app = mount(componentToUse(routes[0]));
    expect(app.find(Home)).toHaveLength(1);
    expect(app.find(Detalle)).toHaveLength(0);
  });

  it('El componente "DETALLES" se debería renderizar solamente en la ruta "/pokemons/:id"', () => {
    const app = mount(componentToUse(routes[4]));
    expect(app.find(Detalle)).toHaveLength(1);
    expect(app.find(Crear)).toHaveLength(0);
  });

  it('El componente "CREAR" se debería renderizar solamente en la ruta "/pokemons/crear"', () => {
    const app = mount(componentToUse(routes[3]));
    expect(app.find(Crear)).toHaveLength(1);
    expect(app.find(Detalle)).toHaveLength(0);
    expect(app.find(Home)).toHaveLength(0);
  });
});
