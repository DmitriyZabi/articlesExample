const { DataTypes } = require('sequelize')

module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.STRING,
    },
    articleID: {
      type: DataTypes.INTEGER,
    },
    userID: {
      type: DataTypes.INTEGER,
    },
    dateTime: {
      type: DataTypes.DATE,
    },
  })

  return Comment
}
