const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    provider: {
      type: Sequelize.STRING,
    },
    hash: {
      type: Sequelize.STRING,
    },
  })

  return User
}
