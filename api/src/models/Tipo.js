const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("tipo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
