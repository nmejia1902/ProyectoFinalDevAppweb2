const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const EspacioParqueo = sequelize.define("espacios_parqueo",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 numero:{
  type:DataTypes.INTEGER
 },

 estado:{
  type:DataTypes.STRING
 }

},{
 timestamps:false
})

module.exports = EspacioParqueo