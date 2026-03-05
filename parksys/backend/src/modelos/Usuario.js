const { DataTypes } = require("sequelize")
const sequelize = require("../db/conexion")

const Usuario = sequelize.define("usuarios",{

 id:{
  type:DataTypes.INTEGER,
  primaryKey:true,
  autoIncrement:true
 },

 nombre:{
  type:DataTypes.STRING
 },

 email:{
  type:DataTypes.STRING
 },

 password:{
  type:DataTypes.STRING
 },

 rol:{
  type:DataTypes.STRING
 }

},{
 timestamps:false,
 freezeTableName:true
})

module.exports = Usuario