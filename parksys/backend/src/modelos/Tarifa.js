const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const Tarifa = sequelize.define("tarifas",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 precio_por_hora:{
  type:DataTypes.DECIMAL
 }

},{
 timestamps:false
})

module.exports = Tarifa