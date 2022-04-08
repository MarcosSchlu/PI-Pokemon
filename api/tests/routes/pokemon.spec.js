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
    it("DEBE DEVOLVER STATUS 200", (done) => {
      agent.get("/pokemons").then(() => done());
    });
  });
  describe("GET /pokemons/:id", () => {
    it("SE ESPERA UN STATUS 200 SI SE PASA UN ID", (done) => {
      agent.get("/pokemons/4").then(() => done());
    });
  });
  describe("GET /pokemons?name=", () => {
    it("SE ESPERA UN STATUS 200 SI SE PASA UN NOMBRE DE POKEMONS EXISTENTE", (done) => {
      agent.get("/pokemons?name=Pikachu").then(() => done());
    });
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
    it("DEBE DEVOLVER STATUS 200", (done) => {
      agent.get("/types").then(() => done());
    });
  });
});
