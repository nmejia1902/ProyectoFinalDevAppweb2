const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const Pago = sequelize.define("pagos",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 movimiento_id:{
  type:DataTypes.INTEGER
 },

 monto:{
  type:DataTypes.DECIMAL
 },

 metodo_pago:{
  type:DataTypes.STRING
 }

},{
 timestamps:false
})

module.exports = Pago