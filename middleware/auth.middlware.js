const config = require('config')
const jwt = require('jsonwebtoken')
const db = require('../models')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: 'No authorization' })
    }
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    const email = decoded.email

    const user = await db.user.findOne({
      attributes: ['id'],
      where: {
        email: email,
      },
    })
    if (user === null) {
      return res.status(401).json({ message: 'No authorization' })
    }
    req.user = user
    next()
  } catch (e) {
    return res.status(401).json({ message: 'No authorization' })
  }
}
