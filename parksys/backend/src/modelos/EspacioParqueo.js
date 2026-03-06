const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const EspacioParqueo = sequelize.define("espacios_parqueo",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 numero:DataTypes.INTEGER,

 estado:DataTypes.STRING,

 habilitado:{
  type:DataTypes.BOOLEAN,
  defaultValue:true
 }

},{
 timestamps:false,
 freezeTableName:true
})

module.exports = EspacioParqueo