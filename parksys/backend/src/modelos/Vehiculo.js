const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const Vehiculo = sequelize.define("vehiculos",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 placa:{
  type:DataTypes.STRING
 },

 nombre_propietario:{
  type:DataTypes.STRING
 },

 telefono:{
  type:DataTypes.STRING
 }

},{
 timestamps:false
})

module.exports = Vehiculo