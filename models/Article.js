const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const Article = sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    body: {
      type: Sequelize.STRING,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
  })

  return Article
}
