const { API_LIMIT } = process.env;
const { DataTypes } = require("sequelize");

let primerID = API_LIMIT + 1

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida: {
      type: DataTypes.INTEGER,
    },
    fuerza: {
      type: DataTypes.INTEGER,
    },
    defensa: {
      type: DataTypes.INTEGER,
    },
    velocidad: {
      type: DataTypes.INTEGER,
    },
    altura: {
      type: DataTypes.INTEGER,
    },
    peso: {
      type: DataTypes.INTEGER,
    },
    img: {
      type: DataTypes.STRING,
    },
    db: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
};
