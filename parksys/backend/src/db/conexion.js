const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(
  "parksys",
  "root",
  "manD7oka",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false
  }
)

module.exports = sequelize