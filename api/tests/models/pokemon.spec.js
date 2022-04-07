const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('POKEMONS MODELOS', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('MODELOS', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('POKEMONS', () => {
      it('DEBE REGRESAR ERROR SE NO SE PASA UN NOMBRE', (done) => {
        Pokemon.create({})
        .then(() => done(new Error('SE REQUIERE UN NOMBRE VALIDO')))
        .catch(() => done());
      });
      it('DEBE FUNCIONAR SI SE PASA UN NOMBRE VALIDO', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('DEBE DEVOLVER ERROR SI NO SE PASAN NUMEROS EN LAS DATATYPES.INTEGER', async () => {
        Pokemon.create({ name: 'Pika', fuerza:"musculoso"})
        .then(() => done(new Error("EL VALOR INGRESADO COMO FUERZA NO CORRESPONDE A UN NUMERO")))
        .catch(() => done());
        Pokemon.create({ name: 'Pika', velocidad:"muy rápido"})
        .then(() => done(new Error("EL VALOR INGRESADO COMO ALTURA NO CORRESPONDE A UN NUMERO")))
        .catch(() => done());
        Pokemon.create({ name: 'Pika', fuerza:100, velocidad: 30})
      });
      it('DEBE DEVOLVER ERROR SI SE PASAN NUMEROS EN LAS DATATYPES.STRING', async () => {
        Pokemon.create({ name: 'Pika', img:"fotosVarias"})
        Pokemon.create({ name: 'Pika', img:"unaImagen"})
        Pokemon.create({ name: 'Pika', img:1111, fuerza: 30})
        .then(() => done(new Error("EL VALOR INGRESADO COMO IMAGEN NO CORRESPONDE A UN STRING")))
        .catch(() => done());
      });
        it('NO FUNCIONA SI EL NOMBRE ES DUPLICADO', async () => {
          Pokemon.create({ name: 'Pika' })
          Pokemon.create({ name: 'Mecha'})
          Pokemon.create({ name: 'Pika'})
          .then(() => done(new Error("EL VALOR INGRESADO COMO NOMBRE PERTENECE A UN POKEMON DE LA BASE DE DATOS")))
          .catch(() => done());
      });
    });
  });
});
