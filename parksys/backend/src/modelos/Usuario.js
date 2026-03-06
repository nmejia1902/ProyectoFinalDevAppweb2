const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const Usuario = sequelize.define("usuarios",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 nombre:DataTypes.STRING,

 email:DataTypes.STRING,

 password:DataTypes.STRING,

 rol:DataTypes.STRING,

 fecha_creacion:DataTypes.DATE

},{
 timestamps:false,
 freezeTableName:true
})

module.exports = Usuario