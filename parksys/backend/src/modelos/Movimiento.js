const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const Movimiento = sequelize.define("movimientos",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 vehiculo_id:{
  type:DataTypes.INTEGER
 },

 espacio_id:{
  type:DataTypes.INTEGER
 },

 hora_entrada:{
  type:DataTypes.DATE
 },

 hora_salida:{
  type:DataTypes.DATE
 },

 tiempo_total:{
  type:DataTypes.INTEGER
 },

 monto_total:{
  type:DataTypes.DECIMAL
 },

 estado:{
  type:DataTypes.STRING
 }

},{
 timestamps:false
})

module.exports = Movimiento