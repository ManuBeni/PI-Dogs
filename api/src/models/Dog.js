const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //genera un universally unique identifier automaticamente
      //allowNull: false,
      primaryKey:true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    weight:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },

    createdInDB:{
      type: DataTypes.BOOLEAN,
      //allowNull: false,
      defaultValue: true
    },
  });
};
