/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};

describe("POKEMON ROUTES", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("DEBE DEVOLVER STATUS 200", () => agent.get("/pokemons").expect(200));
  });
  describe("GET /pokemons/:id", () => {
    it("SE ESPERA UN STATUS 200 SI SE PASA UN ID", () =>
      agent.get("/pokemons/4").expect(200));
  });
  describe("GET /pokemons?name=", () => {
    it("SE ESPERA UN STATUS 200 SI SE PASA UN NOMBRE DE POKEMONS EXISTENTE", () =>
      agent.get("/pokemons?name=Pikachu").expect(200));
  });
});

describe("TYPES ROUTES", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /types", () => {
    it("DEBE DEVOLVER STATUS 200", () => agent.get("/types").expect(200));
  });
});
