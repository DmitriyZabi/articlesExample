const config = require('config')
const Sequelize = require('sequelize')
const dbConfig = config.get('dataBase')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  },
})
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./User.js')(sequelize, Sequelize)
db.article = require('./Article.js')(sequelize, Sequelize)
db.comment = require('./Comment.js')(sequelize, Sequelize)

db.article.belongsTo(db.user, {
  as: 'user',
  foreignKey: 'userID',
})
//
db.comment.belongsTo(db.user, {
  as: 'user',
  foreignKey: 'userID',
})
//
db.comment.belongsTo(db.article, {
  as: 'article',
  foreignKey: 'articleID',
})

module.exports = db
